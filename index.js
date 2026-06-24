require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const PREFIX = '!';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots (including ourselves)
  if (message.author.bot) return;

  // Only handle messages that start with our prefix
  if (!message.content.startsWith(PREFIX)) return;

  // Split "!message <channelId> <the message...>" into pieces
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'message') {
    const channelId = args.shift();
    const text = args.join(' ');

    if (!channelId || !text) {
      return message.reply('Usage: `!message <channel id> <message>`');
    }

    try {
      const channel = await client.channels.fetch(channelId);
      await channel.send(text);
      await message.reply(`✅ Sent your message to <#${channelId}>`);
    } catch (err) {
      console.error(err);
      await message.reply("❌ Couldn't send that — check the channel ID and my permissions.");
    }
  }
});

client.login(process.env.BOT_TOKEN);
