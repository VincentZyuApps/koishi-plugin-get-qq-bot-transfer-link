import { h } from 'koishi'
import type { Context } from 'koishi'
import type { Config } from '../config'
import { buildTransferMarkdown, buildTransferPlainText } from '../message'
import {
  buildConfiguredQQBotCommandKeyboard,
  parseKeyboardJson,
  sendQQRawMarkdown,
  trySendQQRawMarkdown,
} from '../qq'
import { buildTransferUrl, resolveBotIdentity } from '../transfer'
import type { QQBotUrlOptions, ResolveIdentityFailure } from '../types'

const PLUGIN_NAME = 'get-qq-bot-transfer-link'

function quoteMessage(messageId?: string): string {
  return messageId ? `${h.quote(messageId)}` : ''
}

function toStringOption(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function normalizeQQBotUrlOptions(options: unknown): QQBotUrlOptions {
  const raw = options as Record<string, unknown> | undefined

  return {
    botuin: toStringOption(raw?.botuin),
    botuid: toStringOption(raw?.botuid),
    groupcode: toStringOption(raw?.groupcode),
  }
}

async function sendMissingGroupCodeMessage(
  session: any,
  config: Config,
): Promise<boolean> {
  if (session?.platform !== 'qq') return false

  if (config.missingGroupCodeSendMode === 'text') return false

  if (config.missingGroupCodeSendMode === 'markdown_button') {
    if (!config.missingGroupCodeKeyboardJson?.trim()) return false

    try {
      const keyboard = parseKeyboardJson(config.missingGroupCodeKeyboardJson)
      await sendQQRawMarkdown(
        session,
        config.missingGroupCodeMarkdownContent,
        keyboard,
        config,
      )
      return true
    } catch (error) {
      session.app
        .logger(PLUGIN_NAME)
        .warn(
          'missingGroupCodeKeyboardJson parse/send failed, fallback to plain text: %s',
          (error as Error)?.message || error,
        )

      return false
    }
  }

  if (config.missingGroupCodeSendMode === 'markdown') {
    try {
      await sendQQRawMarkdown(
        session,
        config.missingGroupCodeMarkdownContent,
        undefined,
        config,
      )
      return true
    } catch (error) {
      session.app
        .logger(PLUGIN_NAME)
        .warn(
          'missingGroupCode markdown send failed, fallback to plain text: %s',
          (error as Error)?.message || error,
        )

      return false
    }
  }

  return false
}

export function registerQQBotUrlCommand(ctx: Context, config: Config) {
  ctx
    .command('qqbot-url [groupCodeArg:string]', '传参是官bot的QQ号')
    .alias('免艾特申请')
    .alias('一键跳转免艾特配置')
    .alias('一键跳转全量主动配置')
    .option('botuin', '-u <botuin:string> 官Bot的QQ号')
    .option('botuid', '-i <botuid:string> 官Bot的UID')
    .option('groupcode', '-g <groupcode:string> 群号')
    .action(async ({ session, options }, groupCodeArg) => {
      const result = resolveBotIdentity(
        session,
        config,
        normalizeQQBotUrlOptions(options),
        groupCodeArg,
        ctx,
      )

      if (result.ok) {
        const { identity } = result
        const url = buildTransferUrl(identity)
        const isQQ = session?.platform === 'qq'

        if (isQQ && (config.useQqMarkdown || config.addJumpButton)) {
          const keyboard = config.addJumpButton
            ? buildConfiguredQQBotCommandKeyboard(session, config, {
              url,
              jumpActionType: 0,
              jumpActionData: url,
              jumpEnter: false,
            })
            : undefined
          const markdownContent = buildTransferMarkdown(identity, url, config, !!keyboard)
          const sent = await trySendQQRawMarkdown(session, markdownContent, keyboard, config)

          if (sent) return
        }

        await session?.send(buildTransferPlainText(identity, url, config))
        return
      }

      const failure = result as ResolveIdentityFailure

      if (failure.reason === 'missing-group-code') {
        const sent = await sendMissingGroupCodeMessage(session, config)
        if (sent) return

        return `${quoteMessage(session?.messageId)}${config.missingGroupCodeMessage}`
      }

      return failure.message
    })
}
