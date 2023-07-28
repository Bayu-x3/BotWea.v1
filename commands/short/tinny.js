const axios = require("axios");
const fs = require("fs");
const { MessageMedia, ChatTypes } = require("whatsapp-web.js");

module.exports = async function handleCutlyCommands(message) {
 const tinnyGet = message.body.split(' ')[1];
   
 if (!tinnyGet) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.tinurl (Link yang ingin di short)`");
  return;
}

 const apiUrl = `https://api-miftah.xyz/api/url-shortener/tinyurl?url=${tinnyGet}&keys=1fmFhB`;

 try {
  message.reply('Sedang memperoses.....')
  const response = await axios.get(apiUrl);
  const get = response.data

  if (get.code === 200) {
   const short = get.data.url_shortener

   message.reply('Url berhasil di short')
   const chat = await message.getChat();
   chat.sendMessage(short)
  } else {
   message.reply("Gagal, silahkan inputkan url dengan benar")
  }
 } catch(error) {
  message.reply("ERROR");
  console.error(error);
 }

}