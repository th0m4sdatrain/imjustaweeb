require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  OAuth2Scopes,
  PermissionFlagsBits,
} = require('discord.js');

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
