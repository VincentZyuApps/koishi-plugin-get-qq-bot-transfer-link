import { Session } from 'koishi'

function buildInfoTable(botUin: string, botUid: string, groupCode: string, style: string): string {
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

export function buildMarkdownMessage(
  url: string,
  addJumpButton: boolean,
  showBotInfo: boolean,
  showImage: boolean,
  imageUrl: string,
  imageWidth: string,
  imageHeight: string,
  botUin: string,
  botUid: string,
  groupCode: string,
  versionHint: string,
  botInfoStyle: string,
): Record<string, any> {
  const imageBlock = showImage ? `![ #${imageWidth} #${imageHeight}](${imageUrl})\n\n` : ''
  const infoBlock = showBotInfo ? `${buildInfoTable(botUin, botUid, groupCode, botInfoStyle)}\n\n` : ''

  const message: Record<string, any> = {
    msg_type: 2,
    markdown: {
      content: addJumpButton
        ? `## 🔗 官Bot全量主动配置链接\n\n${infoBlock}点击下方按钮打开配置页面。\n\n> ${versionHint}\n\n${imageBlock}`
        : `${infoBlock}官Bot全量主动配置链接（${versionHint}）：\n${imageBlock}${url}`,
    },
  }

  if (addJumpButton) {
    message.keyboard = {
      content: {
        rows: [{
          buttons: [{
            id: 'jump',
            render_data: { label: '🌐 打开配置链接', style: 1 },
            action: {
              type: 0,
              permission: { type: 2 },
              data: url,
              unsupport_tips: '请更新QQ版本后使用',
            },
          }],
        }],
      },
    }
  }

  return message
}

export async function sendQQMessage(session: Session, message: Record<string, any>): Promise<void> {
  if (session.platform !== 'qq') return

  await session.bot.internal.sendMessage(session.channelId, {
    msg_id: session.messageId,
    ...message,
  })
}

export async function trySendQQMessage(
  session: Session,
  message: Record<string, any>,
): Promise<boolean> {
  try {
    await sendQQMessage(session, message)
    return true
  } catch (error) {
    session.app.logger('get-qq-bot-transfer-link').warn('QQ rich message send failed, fallback to plain text: %s', (error as Error)?.message || error)
    return false
  }
}
