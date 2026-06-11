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
): string {
  const { botUin, botUid, groupCode } = identity
  const imageBlock = config.showImage
    ? `![ #${config.imageWidth} #${config.imageHeight}](${config.imageUrl})\n\n`
    : ''
  const infoBlock = config.showBotInfo
    ? `${buildInfoTable(botUin, botUid, groupCode, config.qqMarkdownBotInfoStyle)}\n\n`
    : ''

  if (config.addJumpButton) {
    return `## 🔗 官Bot全量主动配置链接\n\n${infoBlock}点击下方按钮打开配置页面。\n\n> ${config.versionHint}\n\n${imageBlock}`
  }

  return `${infoBlock}官Bot全量主动配置链接（${config.versionHint}）：\n${imageBlock}${url}`
}

export function buildTransferPlainText(
  identity: BotIdentity,
  url: string,
  config: Config,
): string {
  const { botUin, botUid, groupCode } = identity
  const imageBlock = config.showImage ? `${h.image(config.imageUrl)}\n` : ''
  const infoBlock = config.showBotInfo
    ? `🆔 botUin：${botUin}\n🔑 botUid：${botUid}\n👥 groupCode：${groupCode}\n\n`
    : ''

  return `${infoBlock}官Bot全量主动配置链接（${config.versionHint}）：\n${imageBlock}${url}`
}
