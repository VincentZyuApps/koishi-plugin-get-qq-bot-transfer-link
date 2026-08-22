import type { Context } from 'koishi'
import { handleNapcatGetUser } from '../onebot'

export function registerNapcatGetUserCommand(ctx: Context) {
  ctx
    .command(
      'napcat-getuser [userId:string]',
      '请在napcat使用这个指令获取官bot的uid，userid传参就是官bot的uin也就是qq号(其他的onebot实现不知道能不能用捏)',
    )
    .action(async ({ session }, userId) => {
      return handleNapcatGetUser(session, userId)
    })
}
