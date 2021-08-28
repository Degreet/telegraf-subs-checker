import { ChatMember } from 'telegraf/typings/telegram-types'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

export default async function checkSubscription<
  Context extends SceneContextMessageUpdate
>(ctx: Context, channels: number[]): Promise<boolean> {
  let isSuccess: boolean = true
  const userId = ctx.from?.id
  const roles: string[] = ['member', 'administrator', 'creator']
  if (!userId) return isSuccess

  for (const channelId of channels) {
    try {
      const check: ChatMember = await ctx.telegram.getChatMember(channelId, userId)

      if (!roles.includes(check.status)) {
        isSuccess = false
        break
      }
    } catch {
      isSuccess = false
      break
    }
  }

  return isSuccess
}
