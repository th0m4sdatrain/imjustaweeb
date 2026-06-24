// Safe token inspector — it does NOT print your actual token, only its shape,
// so you can tell what went wrong. Run with: npm run check
require('dotenv').config();

const raw = process.env.BOT_TOKEN;

if (!raw) {
  console.error('\n❌ No BOT_TOKEN found in your .env file.\n');
  process.exit(1);
}

const token = raw.trim();
const len = raw.length;
const dots = (raw.match(/\./g) || []).length;
const hasSpace = /\s/.test(raw);
const quoted = /^['"]|['"]$/.test(raw);

console.log('\nInspecting your BOT_TOKEN (the secret itself is never printed):\n');
console.log(`• Length: ${len} characters (a real bot token is usually ~70)`);
console.log(`• Dots: ${dots} (a real bot token has exactly 2, splitting it into 3 parts)`);
console.log(`• Contains spaces or line breaks: ${hasSpace ? 'YES — this breaks it' : 'no'}`);
console.log(`• Wrapped in quotes: ${quoted ? 'YES — remove them' : 'no'}`);

if (/^\d{17,20}$/.test(token)) {
  console.log('\n⚠️  This looks like your APPLICATION ID (just digits), not the bot token.');
  console.log('    Get the token from Developer Portal → Bot → Reset Token.');
} else if (/^[0-9a-f]{64}$/i.test(token)) {
  console.log('\n⚠️  This looks like your PUBLIC KEY (64 hex chars), not the bot token.');
  console.log('    Get the token from Developer Portal → Bot → Reset Token.');
} else if (dots !== 2) {
  console.log('\n⚠️  A valid bot token has exactly 2 dots. Yours does not, so this is');
  console.log('    almost certainly the wrong secret (Client Secret, ID, or Public Key).');
} else {
  // Structure looks plausible — decode the (public) bot ID from the first segment.
  try {
    const id = Buffer.from(token.split('.')[0], 'base64').toString('utf8');
    if (/^\d{17,20}$/.test(id)) {
      console.log(`\n✅ The structure looks like a real token. It encodes bot ID: ${id}`);
      console.log('    Since Discord still rejects it, the token was almost certainly RESET');
      console.log('    after you copied it. Go to Developer Portal → Bot → Reset Token,');
      console.log('    copy the NEW token, and paste it into .env fresh.');
    } else {
      console.log('\n⚠️  The first segment does not decode to a valid ID — probably not a real token.');
    }
  } catch {
    console.log('\n⚠️  Could not decode the first segment — probably not a real token.');
  }
}

console.log('');
