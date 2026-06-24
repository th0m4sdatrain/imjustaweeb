require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  OAuth2Scopes,
  PermissionFlagsBits,
} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  const url = client.generateInvite({
    scopes: [OAuth2Scopes.Bot],
    permissions: [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
    ],
  });

  console.log(`\nLogged in as ${client.user.tag}`);
  console.log('\nInvite your bot to a server with this link:\n');
  console.log(url);
  console.log('\nOpen it in a browser, choose a server, and click Authorize.\n');

  client.destroy();
  process.exit(0);
});

client.login(process.env.BOT_TOKEN);
