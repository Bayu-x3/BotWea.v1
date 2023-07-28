const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleShopeeCommands(message) {
  const shopeGet = message.body.split(' ')[1];

  if (!shopeGet) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.linkaja (NomorHp Menggunakan 08)`");
    return;
  }

  const apiUrl = `http://47.88.53.4:3333/api/ewallet/shopeepay/${shopeGet}`;
  message.reply("Sedang memproses.....");

  try {
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.status === true) {
      message.reply("Berhasil");
      const { CustomerNumber, CustomerName, EwalletType } = get;
      const chat = await message.getChat();
      chat.sendMessage(`Nomor: ${CustomerNumber}\nAtas Nama: ${CustomerName}\nTipe: ${EwalletType}`);
    } else {
      message.reply("Gagal, silakan masukkan nomor Ewallet dengan benar");
    }
  } catch(error) {
    message.reply("Terjadi kesalahan");
    console.error(error);
  }
}
