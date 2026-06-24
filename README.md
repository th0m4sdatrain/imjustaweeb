# imjustaweeb

A tiny Discord bot with one command:

```
!message <channel id> <message>
```

It sends `<message>` to the channel with that ID.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a `.env` file** in this folder with your bot token:
   ```
   BOT_TOKEN=your-bot-token-here
   ```
   (Get the token from the [Discord Developer Portal](https://discord.com/developers/applications) → your app → **Bot** → **Reset Token**.)

3. **Turn on the Message Content Intent**
   In the Developer Portal → your app → **Bot** → enable **MESSAGE CONTENT INTENT**.

4. **Run it**
   ```bash
   npm start
   ```

## Adding the bot to a server

A bot can't join a server by itself — someone with **Manage Server** has to
add it through an invite link. To get that link, run:

```bash
npm run invite
```

It prints a URL. Open it in a browser, pick your server, and click **Authorize**.
(You must have the Manage Server permission on whatever server you choose.)

## Usage

In any channel the bot can see, type:

```
!message 123456789012345678 hello from the bot!
```

The bot will post `hello from the bot!` in the channel with that ID.

> **Getting a channel ID:** In Discord, enable **Settings → Advanced → Developer Mode**, then right-click a channel → **Copy Channel ID**.
