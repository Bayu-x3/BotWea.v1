const axios = require("axios");
const fs = require("fs");
const { send } = require("process");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = async function handleGitCommands(message) {
  const stalkGit = message.body.split(" ")[1];
  
  if (!stalkGit) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.gitstalk (Link Username GitHub)`");
    return;
  }

  const apiUrl = `https://api.betabotz.org/api/stalk/github?username=${stalkGit}&apikey=bot-secx3`;

  try {
    message.reply("Sedang mengstalk.....");
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.result) {
      const idUser = get.result.user.idUser;
      const username = get.result.user.username;
      const nodeId = get.result.user.nodeId;
      const avatarUrl = get.result.user.avatarUrl;
      const githubUrl = get.result.user.githubUrl;
      const type = get.result.user.types;
      const name = get.result.user.name;
      const bio = get.result.user.bio;
      const publicRepos = get.result.user.publicRepos;
      const publicGists = get.result.user.publicGists;
      const createdAt = get.result.user.createdAt;

      const media = await MessageMedia.fromUrl(`${avatarUrl}`, { unsafeMime: true });
      const chat = await message.getChat();
      chat.sendMessage(media, { caption: `IdUser: ${idUser}\nUsername: ${username}\nNodeID: ${nodeId}\nGithub Url: ${githubUrl}\nType Account: ${type}\nFullname: ${name}\nBio: ${bio}\nPublic Repositories: ${publicRepos}\nPublic GitS: ${publicGists}\nCreated Account: ${createdAt}` });
    } else {
      message.reply("Gak bisa mas, coba ketik username yang bener");
    }
  } catch (error) {
    message.reply("ERROR");
    console.error(error);
  }
};
