const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleYtmp3Command(message) {
  const fbId = message.body.split(" ")[1];

  if (!fbId) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.fbdown (Link Video)`");
    return;
  }

  const apiUrl = `https://api.betabotz.org/api/download/fbdown?url=${fbId}&apikey=bot-secx3`;

  try {
    message.reply("Sedang memproses video Facebook, mohon tunggu...");
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (response.status === 200 && data.id) {
      const downloadUrl = data.result["HD"];

      const filePath = `../path/to/VidFacebook.mp4`; // Replace with your desired file path

      const audioResponse = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
      });
      const audioBuffer = Buffer.from(audioResponse.data);

      fs.writeFileSync(filePath, audioBuffer);

      message.reply("Video Facebook telah selesai.");
      const media = MessageMedia.fromFilePath(filePath);
      const chat = await message.getChat();
      chat.sendMessage(media, { sendMediaAsDocument: true });

      fs.unlinkSync(filePath); // Remove the downloaded file
    } else {
      console.error(data);
      message.reply("Gagal memproses video facebook.");
    }
  } catch (error) {
    console.error(error);
    message.reply("Terjadi kesalahan saat memproses video facebook.");
  }
};
