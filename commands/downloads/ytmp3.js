const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleYtmp3Command(message) {
  const youtubeId = message.body.split(" ")[1];
  
 if (!youtubeId) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.ytmp3 (Link Video YT)`");
  return;
}

  const apiUrl = `https://api.betabotz.org/api/download/ytmp3?url=${youtubeId}&apikey=bot-secx3`;

  try {
    message.reply("Sedang memproses lagu dari video YouTube, mohon tunggu...");
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (response.status === 200 && data.id) {
      const title = data.title;
      const downloadUrl = data.download;

      const filePath = `../path/to/${title}.mp3`; // Replace with your desired file path

      const audioResponse = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
      });
      const audioBuffer = Buffer.from(audioResponse.data);

      fs.writeFileSync(filePath, audioBuffer);

      message.reply("Lagu dari video YouTube telah selesai.");
      const media = MessageMedia.fromFilePath(filePath);
      const chat = await message.getChat();
      chat.sendMessage(media, { sendMediaAsDocument: true });

      fs.unlinkSync(filePath); // Remove the downloaded file
    } else {
      console.error(data);
      message.reply("Gagal memproses lagu dari video YouTube.");
    }
  } catch (error) {
    console.error(error);
    message.reply("Terjadi kesalahan saat memproses lagu dari video YouTube.");
  }
};
