export const sendTelegramMessage = async (message: string) => {
  const botToken = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA"; // Replace with your bot token
  const chatId = "1303640598"; // Replace with your chat ID or user ID

  if (!botToken || !chatId) {
    console.error("Bot token or chat ID is missing.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message); // Send the message as plain text

    // Send the message
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send message. Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData.ok) {
      console.log("Message sent successfully to Telegram.");
    } else {
      console.error("Telegram API returned an error:", responseData.description);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};
