const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleIgStalkCommands(message) {
  const stalkIg = message.body.split(" ")[1];
  
  if (!fbId) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.igstalk (Username Instagram)`");
    return;
  }

  const apiUrl = `https://api.betabotz.org/api/stalk/ig?username=${stalkIg}&apikey=bot-secx3`;

  try {
    message.reply("Sedang mengstalk....");
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.result) {
      const username = get.result.username;
      const profile = get.result.profilePicHD;
      const fullname = get.result.fullName;
      const bio = get.result.bio;
      const followers = get.result.followers;
      const following = get.result.following;
      const postCount = get.result.postsCount;

      const media = await MessageMedia.fromUrl(`${profile}`);
      const chat = await message.getChat();
      chat.sendMessage(media, {caption: `Username: ${username}\nFullname: ${fullname}\nBio: ${bio}\nFollowers: ${followers}\nFollowing: ${following}\nPost Count: ${postCount}`});
    } else {
      message.reply("Gagal,silahkan masukan username dengan benar");
    }
  } catch (error) {
    console(error)
   message.reply("ERROR");
  }
};
