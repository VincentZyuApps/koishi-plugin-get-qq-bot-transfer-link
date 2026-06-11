import { h, Session } from 'koishi'
import type { Config } from './config'
import type { QQKeyboardContent, QQKeyboardRow } from './types'

function isKeyboardRows(value: unknown): value is QQKeyboardRow[] {
  return Array.isArray(value)
}

export function normalizeKeyboardContent(input: unknown): QQKeyboardContent | undefined {
  if (!input) return undefined

  if (isKeyboardRows(input)) {
    return { rows: input }
  }

  if (typeof input !== 'object') return undefined

  const value = input as Record<string, unknown>

  if (isKeyboardRows(value.rows)) {
    return { rows: value.rows }
  }

  const content = value.content
  if (content && typeof content === 'object') {
    const nested = content as Record<string, unknown>
    if (isKeyboardRows(nested.rows)) {
      return { rows: nested.rows }
    }
  }

  return undefined
}

export function parseKeyboardJson(json: string): QQKeyboardContent | undefined {
  const trimmed = json?.trim()
  if (!trimmed) return undefined

  return normalizeKeyboardContent(JSON.parse(trimmed))
}

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

export function buildRawMarkdownElement(
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

export async function sendQQRawMarkdown(
  session: Session,
  markdownContent: string,
  keyboard?: QQKeyboardContent,
  config?: Pick<Config, 'verboseConsoleLog'>,
): Promise<void> {
  if (session.platform !== 'qq') return

  const element = buildRawMarkdownElement(markdownContent, keyboard)

  if (config?.verboseConsoleLog) {
    session.app.logger('get-qq-bot-transfer-link').info('sendQQRawMarkdown element: %o', element)
  }

  await session.send(element)
}

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
