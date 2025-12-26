/**
 * Helper script to get your Telegram Chat ID
 * 
 * Usage:
 * 1. Create a bot with @BotFather on Telegram
 * 2. Get your bot token
 * 3. Start a conversation with your bot
 * 4. Run this script: node scripts/get-telegram-chat-id.js YOUR_BOT_TOKEN
 * 5. Send a message to your bot
 * 6. The script will show your chat ID
 */

const botToken = process.argv[2];

if (!botToken) {
  console.error("❌ Please provide your bot token as an argument");
  console.log("Usage: node scripts/get-telegram-chat-id.js YOUR_BOT_TOKEN");
  process.exit(1);
}

async function getUpdates() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Telegram API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Telegram API returned error: ${data.description}`);
    }

    if (data.result.length === 0) {
      console.log("📭 No messages found. Please send a message to your bot first.");
      console.log("Then run this script again.");
      return;
    }

    // Get the most recent message
    const lastUpdate = data.result[data.result.length - 1];
    const chatId = lastUpdate.message?.chat?.id;

    if (chatId) {
      console.log("\n✅ Your Telegram Chat ID:");
      console.log(`   ${chatId}\n`);
      console.log("💡 Add this to your environment variables as TELEGRAM_CHAT_ID");
    } else {
      console.log("❌ Could not find chat ID in the response");
      console.log("Full response:", JSON.stringify(lastUpdate, null, 2));
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

getUpdates();


