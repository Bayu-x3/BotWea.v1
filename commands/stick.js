const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleStickerCommands(message) {
  const cmd = message.body.slice(1).split(" ")[0];
  const args = message.body.slice(1).split(" ").slice(1).join(" ");

  if (cmd === "say") {
    await message.reply(args);
  }

  if (cmd === "sticker") {
    const attachmentData = await message.downloadMedia();
    await message.reply(new MessageMedia(attachmentData), { sendMediaAsSticker: true });
  }

  if (cmd === "link") {
    const media = MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
    await message.reply(media, { sendMediaAsSticker: true });
  }

  if (cmd === "link2") {
    const media = MessageMedia.fromUrl(args);
    await message.reply(media, { sendMediaAsSticker: true });
  }
};
