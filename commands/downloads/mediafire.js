const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleMediafireCommands(message) {
  const mediaUrl = message.body.split(" ")[1];

  if (!mediaUrl) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.mediafire (Link)`");
    return;
  }

  const apiUrl = `https://api.betabotz.org/api/download/mediafire?url=${mediaUrl}&apikey=bot-secx3`;

  try {
    message.reply("Sedang memproses file.....");
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.status && get.result && get.result.url) {
      const mediaLink = get.result.url;
      const name = get.result.filename;
      const ext = get.result.ext;

      const fileName = `${name}.${ext}`;
      const filePath = `../path/to/${fileName}`;

      const mediaResponse = await axios.get(mediaLink, {
        responseType: "arraybuffer",
      });
      const mediaBuffer = Buffer.from(mediaResponse.data);

      fs.writeFileSync(filePath, mediaBuffer);

      message.reply("File mediafire telah selesai.");
      const media = MessageMedia.fromFilePath(filePath);
      const chat = await message.getChat();
      chat.sendMessage(media, { sendMediaAsDocument: true });

      fs.unlinkSync(filePath); // Remove the downloaded file
    } else {
      message.reply(
        "File mediafire tidak dapat diunduh. Periksa kembali URL yang Anda berikan."
      );
    }
  } catch (error) {
    console.error(error);
    message.reply("Terjadi kesalahan saat memproses file mediafire.");
  }
};
