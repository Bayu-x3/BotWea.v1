const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

module.exports = async function handleQrCommands(message, client) {
  try {
    const qrGet = message.body.substring(8);
      
  if (!qrGet) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.qrcode (Inputan yang ingin di jadikan QR)`");
    return;
  }

    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(qrGet)}`;

    message.reply('Sedang membuat QR code...');

    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer'
    });

    const mediaData = response.data;

    fs.writeFileSync(`${qrGet}.png`, mediaData);

    const media = MessageMedia.fromFilePath(`${qrGet}.png`);
    const chat = await message.getChat();
    await chat.sendMessage(media, { caption: `Ini adalah QR code untuk ${qrGet}` });

    fs.unlinkSync(`${qrGet}.png`); // Menghapus file setelah dikirim

  } catch (error) {
    console.error('Error:', error);
    message.reply('Terjadi kesalahan saat membuat QR code.');
  }
};
