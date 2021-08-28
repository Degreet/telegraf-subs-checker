import config from 'config'
import { Telegraf } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import checkSubscription from './index'
type Context = SceneContextMessageUpdate

const token: string = config.get<string>('BOT_TOKEN')
const bot: Telegraf<Context> = new Telegraf<Context>(token)

bot.command('start', async (ctx: Context): Promise<void> => {
  const channels: number[] = config.get<number[]>('CHANNELS')
  const check: boolean = await checkSubscription(ctx, channels)
  let msg: string = 'subscribed'
  if (!check) msg = 'not ' + msg
  ctx.reply(msg)
})

bot.launch().then((): void => {
  console.log('Started')
})
