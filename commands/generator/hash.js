const axios = require('axios');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleHashCommands(message) {
 const hashGet = message.body.substring(5);
   
 if (!hashGet) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.hashgen (Inputan yang ingin di hash)`");
  return;
}

 const apiUrl = `https://tools.helixs.id//API/hashgen.php?text=${encodeURIComponent(hashGet)}`;

 message.reply('Sedang memperoses.....');

 try {
  const response = await axios.get(apiUrl);
  const get = response.data

  if (get.status) {
    const md2 = get.md2
    const md4 = get.md4
    const md5 = get.md5
    const sha1 = get.sha1
    const sha224 = get.sha224
    const sha256 = get.sha256
    const sha386 = get.sha384
    const ripemd128 = get.ripemd128
    const bcyrpt = get.Bcrypt
    const joaat = get.joaat

    const chat =  await message.getChat();
    
    chat.sendMessage(`Md2: ${md2}\n\nMd4: ${md4}\n\nMd5: ${md5}\n\nSha1: ${sha1}\n\nSha224: ${sha224}\n\nSha256: ${sha256}\n\nSha386: ${sha386}\n\nRipemd128: ${ripemd128}\n\nBcrypt: ${bcyrpt}\n\nJoaat: ${joaat}`)
  } else {
   message.reply("Gagal, masukan inputan dengan benar")
  }
 } catch(error) {
  message.reply("ERROR")
  console.error(error);
 }
}