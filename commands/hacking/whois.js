const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleWhoCommands(message) {
  const whoGet = message.body.split(' ')[1]; 
    
  if (!whoGet) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.whois (Link web)`");
    return;
  }

  const apiUrl = `https://api.ibeng.tech/api/other/whois?url=${whoGet}&apikey=N5y82sgfmy`
  message.reply("Sedang mengscan......");
 try {

  const response = await axios.get(apiUrl);
  const get = response.data

  if (get.code === 200) {
   message.reply("Berhasil")
   const hasil = get.data.result
   const chat = await message.getChat();

   chat.sendMessage(chat)
  } else {
   message.reply("Gagal, masukan url dengan benar")
  }

 } catch (error) { 
    message.reply("ERROR");
    console.error(error);
 }
}
