const axios = require('axios');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleShortCommands(message) {
 const shrtGet = message.body.split(' ')[1];
    
 if (!shrtGet) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.shrt (Link yang ingin di short)`");
  return;
}

 const apiUrl = `https://api.lolhuman.xyz/api/shortlink2?apikey=216de7927dea3dcbc916c28e&url=${shrtGet}`;
 await message.reply("Sedang memproses.....");
 try {
  await message.reply("Berhasil");
  const response = await axios.get(apiUrl);
  const get = response.data
  
  if (get.status === 200) {
   const hasil = get.result;
   const chat = await sendMessage.getChat();
   chat.sendMessage(hasil);
  } else {
   await message.reply("Terjadi kesalahan: " + get.message);
  }
 } catch (error){
  console.error(error);
   await message.reply("Terjadi kesalahan");
 }
}