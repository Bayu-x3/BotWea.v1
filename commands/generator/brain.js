const axios = require('axios')
const fs = require('fs')
const { MessageMedia } = require('whatsapp-web.js')

module.exports = async function handleBrainCommands(message) {
 const brainGet = message.body.substring(5);
   
 if (!brainGet) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.brain (Text yang ingin di ubah)`");
  return;
}

 const apiUrl = `https://tools.helixs.id//API/brainfuck.php?encode&text=${encodeURIComponent(brainGet)}`;

 message.reply("Sedang memperoses.....");

 try {
  const response = await axios.get(apiUrl)
  const get = response.data

  if (get.status) {
   const hasil = get.result
   message.reply('Berhasil')
   const chat = await message.getChat();
   chat.sendMessage(hasil)
  } else {
   message.reply('Gagal, silahkan masukan inputan dengan benar.')
  }
 } catch(error) {
  message.reply("ERROR")
  console.error(error)
 }
}