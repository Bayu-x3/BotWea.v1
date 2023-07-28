const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleBitCommands(message) {
 const bitCommand = message.body.split(' ')[1];
   
 if (!bitCommand) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.bitly (Link yang ingin di short)`");
  return;
}

 const apiUrl = `https://api-miftah.xyz/api/url-shortener/bitly?url=${bitCommand}&keys=1fmFhB`

 try {
  message.reply("Sedang menghsort url.....")
  const response = await axios.get(apiUrl)
  const get = response.data

  if(get.code === 200 ) {
  message.reply('Url berhasil di short')
   const hasil = get.data.url_shortener;
   const chat = await message.getChat();
   chat.sendMessage(hasil)
  } else {
    message.reply('Gagal, silahkan inputan url dengan benar')
   }
  } catch(error) {    
    message.reply("ERROR");
    console.error(error);
  }
 }