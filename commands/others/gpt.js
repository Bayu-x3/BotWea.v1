const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleGptCommands(message) {
  const gptAsk = message.body.substring(5);

  if (!gptAsk) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.gpt (Pertanyaan)`");
    return;
  }

  const apiUrl = `https://api.betabotz.org/api/search/openai-chat?text=${encodeURIComponent(
    gptAsk
  )}&apikey=bot-secx3`;

  try {
    message.reply("Sedang mengambil jawaban....");
    const response = await axios.get(apiUrl);
    const result = response.data;

    if (result.status > 0) {
      const answer = result.message;
      const chat = await message.getChat();
      chat.sendMessage(answer);
    } else {
      message.reply("Gagal, silahkan masukan pertanyaan dengan benar");
    }
  } catch (error) {
    message.reply("ERROR");
    console.error(error);
  }
};
