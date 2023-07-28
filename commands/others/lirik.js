const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleLirikCommands(message) {
  const judulLagu = message.body.split(' ')[1, 2, 3];

  if (!judulLagu) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.lirik (Judul Lagu)`");
    return;
  }

  const apiUrl = `https://api.pinostore.my.id/api/search/lirik?apikey=FreeKey&query=${encodeURIComponent(judulLagu)}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status && data.result) {
      const author = data.result.author;
      const lirik = data.result.lirik;

      message.reply(`Lirik lagu "${judulLagu}" oleh ${author}:\n\n${lirik}`);
    } else {
      message.reply('Maaf, lirik lagu tidak ditemukan.');
    }
  } catch (error) {
    message.reply("ERROR");
    console.error(error);
  }
};
