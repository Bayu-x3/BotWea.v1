const axios = require('axios');
const fs = require('fs');
const { sendMessage } = require('whatsapp-web.js');

module.exports = async function handlePosCommands(message) {
 const kodeGet = message.body.split(' ')[1]

 if (!kodeGet) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.kodepos (Kota)`");
  return;
}

const apiUrl = `https://zerooneapi.my.id/api/information/kodepos?apikey=534bf3eb&kota=${encodeURIComponent(kodeGet)}`;
message.reply("Sedang memperoses.....")
try {
 message.reply("Berhasil")
 const response = await axios.get(apiUrl);
 const get = response.data

 if(get.result.message === "success") {
  const {province, city, subdistrict, urban, postalcode} = get.result.data;

  const chat = await message.getChat();
  chat.sendMessage(`Provinsi: ${province}\nKota: ${city}\nKecamatan: ${subdistrict}\nKelurahan: ${urban}\nPosKode: ${postalcode}`);
 } else {
  message.reply("Gagal, masukan nama kota dengan benar")
 }
} catch(error) {
 message.reply("ERROR");
 console.error(error)
}

}