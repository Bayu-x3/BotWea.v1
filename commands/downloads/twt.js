const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleTwtCommands(message) {
  const twitterUrl = message.body.split(" ")[1];
  
 if (!instagramUrl) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.twitter (Link)`");
  return;
}

  const apiUrl = `https://api.betabotz.org/api/download/twitter?url=${encodeURIComponent(
    twitterUrl
  )}&apikey=bot-secx3`;
  message.reply(
    "Jika terjadi pengiriman video > 1, itu tetap video yang sama tetapi kualitas video nya berbeda."
  );
  try {
    message.reply("Sedang memproses video Twitter...");
    const response = await axios.get(apiUrl);
    const result = response.data;

    if (result.status && result.result && result.result.length > 0) {
      const videos = result.result;

      for (const video of videos) {
        const videoUrl = video.url;
        const quality = video.quality;

        const fileName = `twitter_video_${quality.replace(
          "x",
          "_"
        )}_${Date.now()}.mp4`; // Generate a unique file name
        const filePath = `../path/to/${fileName}`; // Specify the file path

        const videoResponse = await axios.get(videoUrl, {
          responseType: "arraybuffer",
        });
        const videoBuffer = Buffer.from(videoResponse.data);

        fs.writeFileSync(filePath, videoBuffer);

        message.reply(`Video Twitter (${quality}) telah selesai.`);
        const media = MessageMedia.fromFilePath(filePath);
        const chat = await message.getChat();
        chat.sendMessage(media, { sendMediaAsDocument: true });

        fs.unlinkSync(filePath); // Remove the downloaded file
      }
    } else {
      message.reply(
        "Video Twitter tidak dapat diunduh. Periksa kembali URL yang Anda berikan."
      );
    }
  } catch (error) {
    console(error)
   message.reply("ERROR");
  }
};
