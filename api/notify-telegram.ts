export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get Telegram bot token and chat ID from environment variables
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Missing Telegram credentials");
    return res.status(500).json({
      error: "Telegram bot configuration missing",
    });
  }

  try {
    const { pdfName, timestamp, userAgent } = req.body;

    // Create notification message
    const message =
      `📄 PDF Downloaded!\n\n` +
      `📋 PDF: ${pdfName || "Unknown"}\n` +
      `🕐 Time: ${new Date(timestamp || Date.now()).toLocaleString()}\n` +
      `🌐 User Agent: ${userAgent || "Unknown"}`;

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error("Telegram API error:", errorData);
      return res.status(500).json({
        error: "Failed to send Telegram notification",
        details: errorData,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
