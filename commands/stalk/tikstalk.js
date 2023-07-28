const axios = require("axios");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleTikStalkCommands(message) {
 const tikStalk = message.body.split(' ')[1]
 
 if (!fbId) {
  message.reply("Cara Penggunaannya adalah dengan mengetik `.tikstalk (Username TiktTok)`");
  return;
}

 const apiUrl = `https://saipulanuar.cf/api/download/tiktokstalk?username=${tikStalk}`
  message.reply("Sedang mengstalk.....")
 try {
  const response = await axios.get(apiUrl);
  const get = response.data

  if(get.result) {
   const userName = get.result.username;
   const nickName = get.result.nickname;
   const ppUrl = get.result.ppurl;
   const followers = get.result.followers;
   const following = get.result.following;
   const likes = get.result.likes;
   const videos = get.result.videos;

   const media = await MessageMedia.fromUrl(`${ppUrl}`);
   const chat = await message.getChat();
   chat.sendMessage(media, {caption: `Username: ${userName}\nNickname: ${nickName}\nFollowers: ${followers}\nFollowing: ${following}\nLikes: ${likes}\nVideo: ${videos}\nProfile Picture: ${ppUrl}`})
  } else {
   message.reply("Gagal, coba ketik username yang bener")
  }
 } catch(error){
  message.reply("ERROR");
    console.error(error);
 }
}