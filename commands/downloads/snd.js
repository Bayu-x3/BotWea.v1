const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleSoundCommands(message) {
  const sndGet = message.body.split(' ')[1];
  
 if (!sndGet) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.soundcld (Link)`");
  return;
}

  const apiUrl = `https://api-miftah.xyz/api/downloader/soundcloud?url=${sndGet}&keys=1fmFhB`;

  message.reply("Sedang memproses......");

  try {
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.code === 200) {
      const judul = get.data.title;
      const menit = get.data.duration;
      const quality = get.data.quality;
      const url = get.data.download;

      message.reply(`Judul Lagu: ${judul}\nDurasi: ${menit}\nQuality: ${quality}`);

      const filePath = `../path/to/${judul}.mp3`;
      const soundResponse = await axios.get(url, { responseType: "arraybuffer" });
      const soundBuffer = Buffer.from(soundResponse.data);

      fs.writeFileSync(filePath, soundBuffer);

      const media = MessageMedia.fromFilePath(filePath);
      const chat = await message.getChat();
      chat.sendMessage(media, { sendMediaAsDocument: true });

      fs.unlinkSync(filePath);
    } else {
      message.reply("Gagal, silahkan masukan url dengan benar")
    }
  } catch (error) {
    message.reply("ERROR");
    console.error(error);
  }
};
