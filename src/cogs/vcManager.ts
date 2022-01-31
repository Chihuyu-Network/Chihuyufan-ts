import { client } from '..'

const defaultName = 'vc1'
const voiceChannelId = '928983010081124393'

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('.vc')) return

  const name = message.content.split(' ').slice(1).join(' ')
  const joinedVC = message.member?.voice.channel?.id === voiceChannelId
  const noDiff = name === message.member?.voice.channel?.name
  let response: string | undefined

  if (!joinedVC) response = 'bois plz join channel first :)'
  if (name === '') response = 'bois plz give me a name :(('
  if (noDiff) response = 'bois plz give me a different name :(((((((('
  if (response === undefined) {
    await message.member?.voice.channel?.edit({ name })
    response = `vc name changed to ${name}\nyou have rate limited for 10m`
  }
  await message.channel.send(response)
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  const channel = newState.channel ? newState.channel : oldState.channel
  if (
    !channel ||
    channel.id !== voiceChannelId ||
    channel.members.size !== 0 ||
    channel.name === defaultName
  ) {
    return
  }
  await channel.edit({ name: defaultName })
})
