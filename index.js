require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error(
    '\n❌ No BOT_TOKEN found.\n\n' +
      'Create a file named exactly ".env" in this folder containing:\n\n' +
      '  BOT_TOKEN=your-bot-token-here\n\n' +
      'Then run this again.\n'
  );
  process.exit(1);
}

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

client.login(token).catch(() => {
  console.error(
    '\n❌ Discord rejected that token.\n\n' +
      'Your .env file was found, but the token in it is not valid. Check that:\n' +
      '  • You copied the BOT TOKEN (Developer Portal → Bot → Reset Token),\n' +
      '    NOT the Application ID, Client Secret, or Public Key.\n' +
      '  • You did not reset the token after copying it (that invalidates the old one).\n' +
      '  • The whole token is on one line, with no spaces or line breaks.\n'
  );
  process.exit(1);
});
