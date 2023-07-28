const axios = require('axios');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleReelsIgCommand(message) {
 const instagramUrl = message.body.split(' ')[1];

 if (!instagramUrl) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.reelsdown (Link Video)`");
  return;
}

 const apiUrl = `https://api.betabotz.org/api/download/igdowloader?url=${encodeURIComponent(instagramUrl)}&apikey=bot-secx3`;

 try {
   message.reply('Sedang memproses video Instagram...');
   const response = await axios.get(apiUrl);
   const result = response.data;

   if (result.status && result.message && result.message.url && result.message.url.length > 0) {
     const videoUrl = result.message.url[0];

     const fileName = `instagram_video_${Date.now()}.mp4`; // Generate a unique file name
     const filePath = `../path/to/${fileName}`; // Specify the file path

     const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
     const videoBuffer = Buffer.from(videoResponse.data);

     fs.writeFileSync(filePath, videoBuffer);

     message.reply('Video Instagram telah selesai.');
     const media = MessageMedia.fromFilePath(filePath);
     const chat = await message.getChat();
     chat.sendMessage(media, { sendMediaAsDocument: true });

     fs.unlinkSync(filePath); // Remove the downloaded file
   } else {
     message.reply('Video Instagram tidak dapat diunduh. Periksa kembali URL yang Anda berikan.');
   }
 } catch (error) {
  message.reply("ERROR");
  console.error(error);
 }
};