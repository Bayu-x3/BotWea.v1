const axios = require('axios');
const fs = require('fs')
const { MessageMedia } = require('whatsapp-web.js')

module.exports = async function handleRevIpCommands(message) {
 const url = message.body.split(' ')[1]; // Ambil URL dari pesan
  const apiUrl = `https://api.hackertarget.com/reverseiplookup/?q=${url}`;
      
  if (!url) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.revip (Link Website *JANGAN MENGGUNAKAN HTTP / HTTPS!!*)`");
    return;
  }

    message.reply('Sedang mereverse IP...');

    try {
      const response = await axios.get(apiUrl);
      const reversedIPs = response.data.split('\n');

      if (reversedIPs.length > 0) {
        const reversedIPsText = reversedIPs.join('\n');

        message.reply(`Hasil reverse IP untuk ${url}:\n${reversedIPsText}`);
      } else {
        message.reply(`Tidak ditemukan IP terbalik untuk ${url}`);
      }
    } catch (error) {
      message.reply('Terjadi kesalahan saat mereverse IP');
      console.error(error);
    }
  }