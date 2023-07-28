const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleSimiCommands(message) {
  const simiKata = message.body.substring(5);
  if (!simiKata) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.simi (Kata Kata)`");
    return;
  }

  const apiUrl = `https://biodegradablearidkernel--rikipurwanto.repl.co/simsimi?m=${encodeURIComponent(
    simiKata
  )}&l=id`;

  try {
    const response = await axios.get(apiUrl);
    const result = response.data;

    if (result.status == 200) {
      const hasil = result.message;
      const chat = await message.getChat();
      chat.sendMessage(hasil);
    } else {
      message.reply("Gagal, silahkan masukan kata kata dengan benar");
    }
  } catch (error) {
    message.reply("ERROR");
    console.error(error);
  }
};
