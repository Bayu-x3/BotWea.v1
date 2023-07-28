const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleCutlyCommands(message) {
  const cutUrl = message.body.split(" ")[1];
    
  if (!cutUrl) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.cutly (Link yang ingin di short)`");
    return;
  }

  const apiUrl = `https://api.shinoa.xyz/api/linkshort/cuttly?link=${cutUrl}&apikey=c46b6f19`;

  try {
    await message.reply("Sedang memproses.....");

    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.status) {
      const short = get.result.shortLink;

      await message.reply("URL berhasil di-short");
      const chat = await message.getChat();
      chat.sendMessage(short);
    } else {
      await message.reply("Terjadi kesalahan: " + get.message);
    }
  } catch (error) {
    console.error(error);
    await message.reply("Terjadi kesalahan");
  }
};
