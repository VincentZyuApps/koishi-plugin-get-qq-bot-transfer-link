import { Context, h } from 'koishi'
import { Config } from './config'
import { buildMarkdownMessage, sendQQMessage, trySendQQMessage } from './qq'

export const name = 'get-qq-bot-transfer-link'
export { Config }
export { usage } from './usage'

export function apply(ctx: Context, config: Config) {

  ctx.command('napcat-getuser [userId:string]', '请在napcat使用这个指令，userid传参就是官bot的qq号(其他的onebot实现不知道能不能用捏)')
    .action(async ({ session }, userId) => {
      if (session?.platform !== 'onebot') return `${h.quote(session?.messageId)}❌ 仅支持 onebot 平台使用此指令`;
      const user = await session?.bot.internal._request('get_stranger_info', { user_id: userId })
      await session?.send(`${h.quote(session?.messageId)}用户信息：${JSON.stringify(user)}`)
    })

  ctx.command('qqbot-url [groupCodeArg:string]', '传参是官bot的QQ号')
    .option('botuin', '-u <botuin:string> 官Bot的QQ号')
    .option('botuid', '-i <botuid:string> 官Bot的UID')
    .option('groupcode', '-g <groupcode:string> 群号')
    .action(async ({ session, options }, groupCodeArg) => {
      // ── 优先级: arg > option > config > 报错 ──
      const botUin = options.botuin || config.defaultBotUin
      const botUid = options.botuid || config.defaultBotUid
      let groupCode: string
      let groupCodeSource = 'unknown'
      const logGroupCodeSource = () => {
        if (config.verboseConsoleLog) {
          ctx.logger('get-qq-bot-transfer-link').info('qqbot-url groupCode群号参数的来源: %s, value: %s', groupCodeSource, groupCode || '<empty>')
        }
      }
      if (config.requireGroupCode) {
        if (groupCodeArg) {
          groupCode = groupCodeArg
          groupCodeSource = 'arg'
        } else if (options.groupcode) {
          groupCode = options.groupcode
          groupCodeSource = 'option.groupcode'
        }
        if (!groupCode) {
          groupCodeSource = 'missing'
          logGroupCodeSource()
          const isQQ = session?.platform === 'qq'
          if (isQQ) {
            if (config.missingGroupCodeSendMode === 'markdown_button') {
              const hasKeyboard = config.missingGroupCodeKeyboardJson?.trim()
              if (hasKeyboard) {
                try {
                  const keyboard = JSON.parse(config.missingGroupCodeKeyboardJson)
                  const sent = await trySendQQMessage(session, {
                    msg_type: 2,
                    markdown: { content: config.missingGroupCodeMarkdownContent },
                    keyboard: { content: keyboard },
                  }, config)
                  if (sent) return
                } catch (e) {
                  // JSON 解析失败，降级到纯文本
                }
              }
            } else if (config.missingGroupCodeSendMode === 'markdown') {
              const sent = await trySendQQMessage(session, {
                msg_type: 2,
                markdown: { content: config.missingGroupCodeMarkdownContent },
              }, config)
              if (sent) return
            }
          }
          return `${h.quote(session?.messageId)}${config.missingGroupCodeMessage}`
        }
      } else {
        if (groupCodeArg) {
          groupCode = groupCodeArg
          groupCodeSource = 'arg'
        } else if (options.groupcode) {
          groupCode = options.groupcode
          groupCodeSource = 'option.groupcode'
        } else if (config.defaultGroupCode) {
          groupCode = config.defaultGroupCode
          groupCodeSource = 'config.defaultGroupCode'
        } else if (session?.guildId) {
          groupCode = session.guildId
          groupCodeSource = 'session.guildId'
        }
      }

      logGroupCodeSource()

      if (!botUin) return '❌ 缺少 botUin（官BotQQ号），请通过 --botuin 传入或配置 defaultBotUin'
      if (!botUid) return '❌ 缺少 botUid（官Bot UID），请通过 --botuid 传入或配置 defaultBotUid'
      if (!groupCode) return '❌ 缺少 groupCode（群号），请通过 --groupcode 传入或配置 defaultGroupCode'

      const jsonObj = {
        page_name: 'ai_group_service_agreement_pop_page',
        groupCode: Number(groupCode),
        botUin: Number(botUin),
        botUid,
        screen: 1,
      }

      const url = `https://club.vip.qq.com/transfer?open_kuikly_info=${encodeURIComponent(JSON.stringify(jsonObj))}`

      const isQQ = session?.platform === 'qq'
      if (isQQ && (config.useMarkdown || config.addJumpButton)) {
        const sent = await trySendQQMessage(
          session,
          buildMarkdownMessage(url, config.addJumpButton, config.showBotInfo, config.showImage, config.imageUrl, config.imageWidth, config.imageHeight, botUin, botUid, groupCode, config.versionHint, config.qqMarkdownBotInfoStyle),
          config,
        )
        if (sent) return
      }

      const imageBlock = config.showImage ? `${h.image(config.imageUrl)}\n` : ''
      const infoBlock = config.showBotInfo
        ? `🆔 botUin：${botUin}\n🔑 botUid：${botUid}\n👥 groupCode：${groupCode}\n\n`
        : ''
      await session?.send(`${infoBlock}官Bot全量主动配置链接（${config.versionHint}）：\n${imageBlock}${url}`)
    })

}
