import { h, Session } from 'koishi'
import type { Config } from './config'
import type { QQKeyboardContent } from './types'

const MSG_TIMEOUT = 5 * 60 * 1000 - 2000

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

// ============ 🔗 跳转按钮构建 ============
/** 构建「打开配置链接」跳转按钮的 keyboard 结构 */
export function buildJumpKeyboard(url: string): QQKeyboardContent {
  return {
    rows: [
      {
        buttons: [
          {
            id: 'jump',
            render_data: {
              label: '🌐 打开配置链接',
              style: 1,
            },
            action: {
              type: 0,
              permission: { type: 2 },
              data: url,
              unsupport_tips: '请更新QQ版本后使用',
            },
          },
        ],
      },
    ],
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
): Promise<void> {
  await session.send(buildRawMarkdownElement(markdownContent, keyboard))
}

// ============ 🔧 官方 Adapter 发送 ============
/** 通过官方 adapter 发送 QQ Markdown（走 internal API，含被动回复 msg_id/msg_seq 处理） */
async function sendViaOfficialAdapter(
  session: Session,
  markdownContent: string,
  keyboard?: QQKeyboardContent,
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
): Promise<void> {
  if (session.platform !== 'qq') return

  const logger = session.app.logger('get-qq-bot-transfer-link')
  const isCrack = !!(session.bot as any)?.config?.autoStreamText

  if (config?.verboseConsoleLog) {
    logger.info('sendQQRawMarkdown adapter=%s, content=%s', isCrack ? 'crack' : 'official', markdownContent.slice(0, 100))
  }

  if (isCrack) {
    await sendViaCrackAdapter(session, markdownContent, keyboard)
  } else {
    await sendViaOfficialAdapter(session, markdownContent, keyboard)
  }
}

// ============ 🛡️ Markdown 消息发送（带降级） ============
/** 尝试发送 QQ Markdown 消息，失败时降级为纯文本 */
export async function trySendQQRawMarkdown(
  session: Session,
  markdownContent: string,
  keyboard?: QQKeyboardContent,
  config?: Pick<Config, 'verboseConsoleLog'>,
): Promise<boolean> {
  try {
    await sendQQRawMarkdown(session, markdownContent, keyboard, config)
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
