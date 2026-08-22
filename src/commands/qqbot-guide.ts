import type { Context } from 'koishi'
import type { Config } from '../config'
import {
  buildQQUiSettingsGuideElements,
  buildQQUiSettingsGuideMarkdown,
} from '../message'
import { buildConfiguredQQBotCommandKeyboard, trySendQQRawMarkdown } from '../qq'
import type { BotIdentity } from '../types'

function resolveGuideIdentity(session: any, config: Config): BotIdentity {
  return {
    botUin: config.defaultBotUin || '-',
    botUid: config.defaultBotUid || '-',
    groupCode: config.defaultGroupCode || session?.guildId || '-',
  }
}

export function registerQQBotGuideCommand(ctx: Context, config: Config) {
  ctx
    .command('qqbot-guide', '发送手机QQ机器人全量消息与主动发言设置指南')
    .alias('免艾特手动配置指南')
    .alias('全量主动手动配置指南')
    .action(async ({ session }) => {
      if (!session) return
      const identity = resolveGuideIdentity(session, config)

      if (session.platform === 'qq' && (config.useQqMarkdown || config.addJumpButton)) {
        const keyboard = config.addJumpButton
          ? buildConfiguredQQBotCommandKeyboard(session, config, {
            url: '',
            jumpActionType: 2,
            jumpActionData: '/一键跳转免艾特配置 【在这里填入群号】',
            jumpEnter: false,
          })
          : undefined
        const markdownContent = buildQQUiSettingsGuideMarkdown(identity, config)
        const sent = await trySendQQRawMarkdown(
          session,
          markdownContent,
          keyboard,
          config,
          session.messageId,
        )
        if (sent) return
      }

      await session.send(buildQQUiSettingsGuideElements(session.messageId, identity, config))
    })
}
