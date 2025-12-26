import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log the incoming request for debugging
  console.log("[notify-telegram] Request received:", {
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  // Only allow POST requests
  if (req.method !== "POST") {
    console.log("[notify-telegram] Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get Telegram bot token and chat ID from environment variables
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log("[notify-telegram] Environment check:", {
    hasBotToken: !!botToken,
    hasChatId: !!chatId,
    chatIdLength: chatId?.length || 0,
  });

  if (!botToken || !chatId) {
    console.error("[notify-telegram] Missing Telegram credentials:", {
      hasBotToken: !!botToken,
      hasChatId: !!chatId,
    });
    return res.status(500).json({
      error: "Telegram bot configuration missing",
    });
  }

  try {
    const { pdfName, timestamp, userAgent } = req.body;

    console.log("[notify-telegram] Processing request:", {
      pdfName,
      timestamp,
      userAgent: userAgent?.substring(0, 50) + "...",
    });

    // Create notification message
    const message =
      `📄 PDF Downloaded!\n\n` +
      `📋 PDF: ${pdfName || "Unknown"}\n` +
      `🕐 Time: ${new Date(timestamp || Date.now()).toLocaleString()}\n` +
      `🌐 User Agent: ${userAgent || "Unknown"}`;

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    console.log("[notify-telegram] Sending to Telegram:", {
      url: telegramUrl.replace(botToken, "***"),
      chatId,
      messageLength: message.length,
    });

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const responseData = await telegramResponse.json();
    console.log("[notify-telegram] Telegram API response:", {
      status: telegramResponse.status,
      ok: telegramResponse.ok,
      data: responseData,
    });

    if (!telegramResponse.ok) {
      console.error("[notify-telegram] Telegram API error:", responseData);
      return res.status(500).json({
        error: "Failed to send Telegram notification",
        details: responseData,
      });
    }

    console.log("[notify-telegram] Success! Notification sent.");
    return res.status(200).json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    console.error("[notify-telegram] Error sending Telegram notification:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
