const axios = require('axios');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleJackingCommands(message) {
 const jackingUrl = message.body.split(' ')[1];

 if (!jackingUrl) {
  message.reply(`Cara penggunaan nya adalah dengan cara mengetikan .jacking (url)`)
  return;
 }

 const apiUrl = `https://apiasx.adlixs.repl.co/api/cjtest?cj=${encodeURIComponent(jackingUrl)}`;
 
 try {
  const response = await axios.get(apiUrl);
  const get = response.data

  const hasil = get.message;
  const chat = await message.getChat();

  chat.sendMessage(hasil);
 } catch(error) {
  message.reply("ERROR")
  console.error(error)
 }
}