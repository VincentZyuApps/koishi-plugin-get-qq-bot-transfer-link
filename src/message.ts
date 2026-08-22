import { h } from 'koishi'
import type { Config } from './config'
import type { BotIdentity, BotInfoStyle } from './types'

function buildInfoTable(botUin: string, botUid: string, groupCode: string, style: BotInfoStyle): string {
  switch (style) {
    case 'inline':
      return `🆔 ${botUin}  🔑 ${botUid}  👥 ${groupCode}`
    case 'text':
      return `🆔 botUin：${botUin}\n🔑 botUid：${botUid}\n👥 groupCode：${groupCode}`
    case 'table':
      return [
        '| key | value |',
        '|---|---|',
        `| 🆔 botUin | ${botUin} |`,
        `| 🔑 botUid | ${botUid} |`,
        `| 👥 groupCode | ${groupCode} |`,
      ].join('\n')
    default:
      return `**🆔 botUin**：${botUin}\n**🔑 botUid**：${botUid}\n**👥 groupCode**：${groupCode}`
  }
}

export function buildTransferMarkdown(
  identity: BotIdentity,
  url: string,
  config: Config,
  hasJumpButton = config.addJumpButton,
): string {
  const { botUin, botUid, groupCode } = identity
  const blocks = ['## 🔗 官Bot全量主动配置链接']

  if (config.showBotInfo) {
    blocks.push(buildInfoTable(botUin, botUid, groupCode, config.qqMarkdownBotInfoStyle))
  }

  if (config.qqTransferLinkGuideText) {
    blocks.push(`> ${config.qqTransferLinkGuideText}`)
  }

  if (config.qqTransferLinkGuideShowImage) {
    blocks.push(`![ #${config.qqTransferLinkGuideImageWidth} #${config.qqTransferLinkGuideImageHeight}](${config.qqTransferLinkGuideImageUrl})`)
  }

  if (hasJumpButton) {
    if (!blocks.length) blocks.push('点击下方按钮打开配置链接。')
    return blocks.join('\n\n')
  }

  blocks.push(`🔗 官Bot全量主动配置链接：\n${url}`)
  return blocks.join('\n\n')
}

export function buildTransferPlainText(
  identity: BotIdentity,
  url: string,
  config: Config,
): string {
  const { botUin, botUid, groupCode } = identity
  const blocks = []

  if (config.showBotInfo) {
    blocks.push(`🆔 botUin：${botUin}\n🔑 botUid：${botUid}\n👥 groupCode：${groupCode}`)
  }

  if (config.qqTransferLinkGuideText) {
    blocks.push(config.qqTransferLinkGuideText)
  }

  if (config.qqTransferLinkGuideShowImage) {
    blocks.push(`${h.image(config.qqTransferLinkGuideImageUrl)}`)
  }

  blocks.push(`官Bot全量主动配置链接：\n${url}`)
  return blocks.join('\n\n')
}

export function buildQQUiSettingsGuideMarkdown(
  identity: BotIdentity,
  config: Config,
): string {
  const blocks = ['## 📖 官Bot全量手动UI配置指南']

  if (config.showBotInfo) {
    blocks.push(buildInfoTable(identity.botUin, identity.botUid, identity.groupCode, config.qqMarkdownBotInfoStyle))
  }

  if (config.qqUiSettingsGuideText) {
    blocks.push(`> ${config.qqUiSettingsGuideText}`)
  }

  if (config.qqUiSettingsGuideShowImage) {
    blocks.push(`![ #${config.qqUiSettingsGuideImageWidth} #${config.qqUiSettingsGuideImageHeight}](${config.qqUiSettingsGuideImageUrl})`)
  }

  if (!blocks.length) blocks.push('手机 QQ 机器人手动配置指南')
  return blocks.join('\n\n')
}

export function buildQQUiSettingsGuideElements(
  messageId: string | undefined,
  identity: BotIdentity,
  config: Config,
) {
  const elements = []
  if (messageId) elements.push(h.quote(messageId))
  if (config.showBotInfo) {
    elements.push(`🆔 botUin：${identity.botUin}\n🔑 botUid：${identity.botUid}\n👥 groupCode：${identity.groupCode}\n\n`)
  }
  if (config.qqUiSettingsGuideText) elements.push(`${config.qqUiSettingsGuideText}\n\n`)
  if (config.qqUiSettingsGuideShowImage) elements.push(h.image(config.qqUiSettingsGuideImageUrl))
  return elements
}
