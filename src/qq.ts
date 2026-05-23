import { image } from '@satorijs/element/jsx-runtime'
import { Session } from 'koishi'

declare module 'koishi' {
  interface Session {
    qq?: {
      sendMessage(channelId: string, content: unknown): Promise<unknown>
      sendPrivateMessage(userId: string, content: unknown): Promise<unknown>
    }
  }
}

function buildInfoTable(botUin: string, botUid: string, groupCode: string): string {
  return [
    '| 字段 | 值 |',
    '|---|---|',
    `| 🆔 botUin | ${botUin} |`,
    `| 🔑 botUid | ${botUid} |`,
    `| 👥 groupCode | ${groupCode} |`,
  ].join('\n')
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
): Record<string, any> {
  const imageBlock = showImage ? `![ #${imageWidth} #${imageHeight}](${imageUrl})\n\n` : ''
  console.log(`imageeBlock = ${imageBlock}`);
  const infoBlock = showBotInfo ? `${buildInfoTable(botUin, botUid, groupCode)}\n\n` : ''

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
  if (session.qq) {
    await session.qq.sendMessage(session.channelId, message)
  }
}
