const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleWikiCommands(message) {
 const wikiAsk = message.body.substring(5)

 if (!wikiAsk) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.wiki (Pertanyaan)`");
  return;
}

 const apiUrl = `https://api.betabotz.org/api/search/wikipedia?text=${encodeURIComponent(wikiAsk)}&apikey=bot-secx3`

 try {
  message.reply(`Sedang mencari pertanyaan ${wikiAsk}, mohon di tunggu.....`)
  const response = await axios.get(apiUrl)
  const get = response.data

  if(get.result) {
   const jawaban = get.result.isi;

   const chat = await message.getChat();
   chat.sendMessagae(jawaban);

  } else {
   message.reply("Gak bisa mas")
  }

 } catch(error) {
  message.reply("ERROR");
    console.error(error);
 }
}