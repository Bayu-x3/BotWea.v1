const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

function base64Encode(buffer) {
  return Buffer.from(buffer).toString("base64");
}

module.exports = async function handleEnglishCommands(message) {
 const usGet = message.body.substring(5);
 const encodedText = encodeURIComponent(usGet);

  if (!usGet) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.eng (Kata-kata)`");
    return;
  }

  const apiUrl = `https://mysiraj.ddns.net/api/soundoftext?text=${encodedText}&lang=en-US`;

  try {
    message.reply("Sedang memproses, mohon tunggu...");
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.status === true) {
      const downloadUrl = get.result;

      const audioResponse = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
      });
      const audioBuffer = audioResponse.data;
      const base64Audio = base64Encode(audioBuffer);

      const media = new MessageMedia("audio/mpeg", base64Audio);
      const chat = await message.getChat();
      chat.sendMessage(media, { sendMediaAsVoice: true });

      message.reply("Berhasil.");
    } else {
      console.error(get);
      message.reply("Gagal.");
    }
  } catch (error) {
    console.error(error);
    message.reply("Terjadi kesalahan.");
  }
};
