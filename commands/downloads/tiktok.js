const axios = require("axios");
const fs = require("fs");
const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleTikTokCommand(message) {
  const tiktokUrl = message.body.split(" ")[1];
  
 if (!tiktokUrl) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.tiktok (Link Video Tiktok)`");
  return;
}

  try {
    message.reply("Sedang memproses video TikTok...");
    const result = await TiktokDL(tiktokUrl);
    const videoUrl = result.result.video[0]; // Assuming you want the first video URL

    const fileName = `tiktok_video_${Date.now()}.mp4`; // Generate a unique file name
    const filePath = `../path/to/${fileName}`; // Specify the file path

    const videoResponse = await axios.get(videoUrl, {
      responseType: "arraybuffer",
    });
    const videoBuffer = Buffer.from(videoResponse.data);

    fs.writeFileSync(filePath, videoBuffer);

    message.reply("Video TikTok telah selesai.");
    const media = MessageMedia.fromFilePath(filePath);
    const chat = await message.getChat();
    chat.sendMessage(media, { sendMediaAsDocument: true });

    fs.unlinkSync(filePath); // Remove the downloaded file
  } catch (error) {
    console(error)
   message.reply("ERROR");
  }
};
