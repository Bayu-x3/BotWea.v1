const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleYtmp4Command(message) {
  const youtubeUrl = message.body.split(" ")[1];
  
 if (!youtubeUrl) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.ytmp4 (Link Video YT)`");
  return;
}

  const apiUrl = `https://api.betabotz.org/api/download/ytmp4?url=${youtubeUrl}&apikey=bot-secx3`;

  try {
    message.reply("Sedang memproses video YouTube...");
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (response.status === 200 && data.id) {
      const title = data.title;
      const downloadUrl = data.download;

      const filePath = `../path/to/${title}.mp4`; // Replace with your desired file path

      const videoResponse = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
      });
      const videoBuffer = Buffer.from(videoResponse.data);

      fs.writeFileSync(filePath, videoBuffer);

      message.reply("Video YouTube telah selesai.");
      const media = MessageMedia.fromFilePath(filePath);
      const chat = await message.getChat();
      chat.sendMessage(media, { sendMediaAsDocument: true });

      fs.unlinkSync(filePath); // Remove the downloaded file
    } else {
      console.error(data);
      message.reply("Gagal memproses video YouTube.");
    }
  } catch (error) {
    console.error(error);
    message.reply("Terjadi kesalahan saat memproses video YouTube.");
  }
};
