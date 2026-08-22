import { Context } from 'koishi'
import { Config } from './config'
import { registerNapcatGetUserCommand } from './commands/napcat-getuser'
import { registerQQBotGuideCommand } from './commands/qqbot-guide'
import { registerQQBotUrlCommand } from './commands/qqbot-url'

export const name = 'get-qq-bot-transfer-link'

export { Config }
export { usage } from './usage'

export function apply(ctx: Context, config: Config) {
  registerNapcatGetUserCommand(ctx)
  registerQQBotGuideCommand(ctx, config)
  registerQQBotUrlCommand(ctx, config)
}
