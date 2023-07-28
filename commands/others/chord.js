const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleRemoveCommands(message) {
  const chordGet = message.body.substring(5);

  if (!chordGet) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.chord (Judul Lagu)`");
    return;
  }

  const apiUrl = `https://api.lolhuman.xyz/api/chord?apikey=216de7927dea3dcbc916c28e&query=${encodeURIComponent(chordGet)}`;
  await message.reply("Sedang memproses.....");

  try {
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.status === 200) {
      const title = get.result.title;
      const chord = get.result.chord;

      const chat = await message.getChat();
      chat.sendMessage(`Judul Lagu: ${title}\nChord: ${chord}`);
    } else {
      message.reply("Gagal, judul lagu yang kamu inputkan tidak tersedia");
    }
  } catch (error) {
    message.reply("ERROR");
    console.error(error);
  }
};
