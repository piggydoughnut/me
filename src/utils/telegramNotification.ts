/**
 * Sends a Telegram notification when a PDF is downloaded
 */
export async function notifyTelegramDownload(pdfName: string): Promise<void> {
  try {
    console.log("📤 Sending Telegram notification for PDF:", pdfName);

    const response = await fetch("/api/notify-telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pdfName,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Failed to send Telegram notification:", errorText);
      throw new Error(`Notification failed: ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Telegram notification sent successfully:", result);
  } catch (error) {
    // Log error but don't interrupt the download
    console.error("❌ Error sending Telegram notification:", error);
    // In development, this might fail if API endpoint isn't available
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "⚠️ Running in development mode. API endpoint may not be available locally."
      );
      console.warn("⚠️ Notifications will work when deployed to Vercel.");
    }
  }
}
