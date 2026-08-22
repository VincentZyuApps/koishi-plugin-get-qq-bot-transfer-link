import { h, Session } from 'koishi'
import type { Config } from './config'
import type { QQKeyboardContent } from './types'

const MSG_TIMEOUT = 5 * 60 * 1000 - 2000

export const DEFAULT_QQ_BOT_COMMAND_KEYBOARD = {
  rows: [
    {
      buttons: [
        {
          id: 'jump',
          render_data: { label: '🌐🔗 打开配置链接', style: 1 },
          action: {
            type: '${jumpActionType}',
            permission: { type: 2 },
            data: '${jumpActionData}',
            enter: '${jumpEnter}',
            reply: false,
            unsupport_tips: '请更新QQ版本后使用',
          },
        },
      ],
    },
    {
      buttons: [
        {
          id: 'guide',
          render_data: { label: '📱📖 获取手动配置指南', style: 1 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: '/qqbot-guide',
            enter: true,
            reply: false,
            unsupport_tips: '请更新QQ版本后使用',
          },
        },
      ],
    },
  ],
}

export const DEFAULT_MISSING_GROUP_CODE_KEYBOARD = {
  rows: [
    {
      buttons: [
        {
          id: 'fill-group-code',
          render_data: { label: '一键跳转免艾特', style: 1 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: '/一键跳转免艾特配置 【在这里填入群号】',
            enter: false,
            reply: false,
            unsupport_tips: '请更新QQ版本后使用',
          },
        },
        {
          id: 'help-menu',
          render_data: { label: '玩玩其他的', style: 1 },
          action: {
            type: 2,
            permission: { type: 2 },
            data: '/帮助菜单',
            enter: true,
            reply: false,
            unsupport_tips: '请更新QQ版本后使用',
          },
        },
      ],
    },
  ],
}

export interface QQBotKeyboardTemplateValues {
  url: string
  jumpActionType: number
  jumpActionData: string
  jumpEnter: boolean
}

export function stringifyCompact(obj: { rows: Array<{ buttons: unknown[] }> }): string {
  let result = '{\n  "rows": [\n'

  for (let rowIndex = 0; rowIndex < obj.rows.length; rowIndex++) {
    const buttons = obj.rows[rowIndex].buttons.map((button) => `        ${JSON.stringify(button)}`)
    result += '    {\n      "buttons": [\n'
    result += buttons.join(',\n')
    result += '\n      ]\n'
    result += `    }${rowIndex < obj.rows.length - 1 ? ',' : ''}\n`
  }

  return `${result}  ]\n}`
}

// ============ 🎹 键盘 JSON 标准化 ============
/** 兼容三种键盘 JSON 写法：{"rows":[...]} / [...] / {"content":{"rows":[...]}} */
function normalizeKeyboardContent(input: unknown): QQKeyboardContent | undefined {
  if (!input) return undefined

  if (Array.isArray(input)) {
    return { rows: input }
  }

  if (typeof input !== 'object') return undefined

  const value = input as Record<string, unknown>

  if (Array.isArray(value.rows)) {
    return { rows: value.rows }
  }

  const content = value.content
  if (content && typeof content === 'object') {
    const nested = content as Record<string, unknown>
    if (Array.isArray(nested.rows)) {
      return { rows: nested.rows }
    }
  }

  return undefined
}

// ============ 🎹 键盘 JSON 解析 ============
/** 解析缺群号按钮 JSON 字符串为 QQKeyboardContent */
export function parseKeyboardJson(json: string): QQKeyboardContent | undefined {
  const trimmed = json?.trim()
  if (!trimmed) return undefined

  return normalizeKeyboardContent(JSON.parse(trimmed))
}

function renderTemplateValue(value: unknown, values: QQBotKeyboardTemplateValues): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => renderTemplateValue(item, values))
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, renderTemplateValue(item, values)]),
    )
  }

  if (typeof value !== 'string') return value

  const exactMatch = /^\$\{(url|jumpActionType|jumpActionData|jumpEnter)\}$/.exec(value)
  if (exactMatch) {
    return values[exactMatch[1] as keyof QQBotKeyboardTemplateValues]
  }

  return value.replace(/\$\{(url|jumpActionType|jumpActionData|jumpEnter)\}/g, (_, key: keyof QQBotKeyboardTemplateValues) => String(values[key]))
}

/** 解析并渲染两个 qqbot 指令共用的 keyboard JSON 模板。 */
export function buildQQBotCommandKeyboard(
  json: string,
  values: QQBotKeyboardTemplateValues,
): QQKeyboardContent | undefined {
  const trimmed = json?.trim()
  if (!trimmed) return undefined

  return normalizeKeyboardContent(renderTemplateValue(JSON.parse(trimmed), values))
}

/** 读取插件配置并构建 qqbot-url / qqbot-guide 共用的键盘。 */
export function buildConfiguredQQBotCommandKeyboard(
  session: Session,
  config: Pick<Config, 'qqBotCommandKeyboardJson'>,
  values: QQBotKeyboardTemplateValues,
): QQKeyboardContent | undefined {
  if (!config.qqBotCommandKeyboardJson?.trim()) return undefined

  try {
    return buildQQBotCommandKeyboard(config.qqBotCommandKeyboardJson, values)
  } catch (error) {
    session.app
      .logger('get-qq-bot-transfer-link')
      .warn(
        'qqBotCommandKeyboardJson parse failed, fallback to no keyboard: %s',
        (error as Error)?.message || error,
      )
    return undefined
  }
}

// ============ 📦 RawMarkdown 元素构建 ============
/** 构建 QQ rawmarkdown 消息元素（仅 crack adapter 支持） */
function buildRawMarkdownElement(
  markdownContent: string,
  keyboard?: QQKeyboardContent,
) {
  const payload: Record<string, unknown> = {
    markdown: {
      content: markdownContent,
    },
  }

  if (keyboard?.rows?.length) {
    payload.keyboard = {
      content: keyboard,
    }
  }

  return h('qq:rawmarkdown', payload)
}

// ============ 🚀 Crack Adapter 发送 ============
/** 通过 crack adapter 发送 QQ Markdown（走 h('qq:rawmarkdown') 元素层） */
async function sendViaCrackAdapter(
  session: Session,
  markdownContent: string,
  keyboard?: QQKeyboardContent,
  quoteMessageId?: string,
): Promise<void> {
  const markdown = buildRawMarkdownElement(markdownContent, keyboard)
  await session.send(quoteMessageId ? [h.quote(quoteMessageId), markdown] : markdown)
}

// ============ 🔧 官方 Adapter 发送 ============
/** 通过官方 adapter 发送 QQ Markdown（走 internal API，含被动回复 msg_id/msg_seq 处理） */
async function sendViaOfficialAdapter(
  session: Session,
  markdownContent: string,
  keyboard?: QQKeyboardContent,
  quoteMessageId?: string,
): Promise<void> {
  const payload: Record<string, unknown> = {
    msg_type: 2,
    markdown: {
      content: markdownContent,
    },
  }

  if (keyboard?.rows?.length) {
    payload.keyboard = {
      content: keyboard,
    }
  }

  if (quoteMessageId) {
    payload.message_reference = {
      message_id: quoteMessageId,
    }
  }

  const s = session as any
  if (s.messageId && s.timestamp && Date.now() - s.timestamp < MSG_TIMEOUT) {
    s.seq ||= 0
    payload.msg_id = s.messageId
    payload.msg_seq = ++s.seq
  }

  await (session.bot as any).internal.sendMessage(session.channelId, payload)
}

// ============ 📤 Markdown 消息发送 ============
/** 发送 QQ Markdown 消息，自动检测适配器类型选择发送路径 */
export async function sendQQRawMarkdown(
  session: Session,
  markdownContent: string,
  keyboard?: QQKeyboardContent,
  config?: Pick<Config, 'verboseConsoleLog'>,
  quoteMessageId?: string,
): Promise<void> {
  if (session.platform !== 'qq') return

  const logger = session.app.logger('get-qq-bot-transfer-link')
  const isCrack = !!(session.bot as any)?.config?.autoStreamText

  if (config?.verboseConsoleLog) {
    logger.info('sendQQRawMarkdown adapter=%s, content=%s', isCrack ? 'crack' : 'official', markdownContent.slice(0, 100))
  }

  if (isCrack) {
    await sendViaCrackAdapter(session, markdownContent, keyboard, quoteMessageId)
  } else {
    await sendViaOfficialAdapter(session, markdownContent, keyboard, quoteMessageId)
  }
}

// ============ 🛡️ Markdown 消息发送（带降级） ============
/** 尝试发送 QQ Markdown 消息，失败时降级为纯文本 */
export async function trySendQQRawMarkdown(
  session: Session,
  markdownContent: string,
  keyboard?: QQKeyboardContent,
  config?: Pick<Config, 'verboseConsoleLog'>,
  quoteMessageId?: string,
): Promise<boolean> {
  try {
    await sendQQRawMarkdown(session, markdownContent, keyboard, config, quoteMessageId)
    return true
  } catch (error) {
    session.app
      .logger('get-qq-bot-transfer-link')
      .warn(
        'QQ rawmarkdown send failed, fallback to plain text: %s',
        (error as Error)?.message || error,
      )

    return false
  }
}
