const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async function handleCmsCommands(message) {
  const cmsGet = message.body.split(' ')[1]; 
    
  if (!cmsGet) {
    message.reply("Cara Penggunaannya adalah dengan mengetik `.scancms (Link web yang ingin di scan)`");
    return;
  }

  const apiUrl = `https://tools.prinsh.com/API/cms-scan.php?url=${cmsGet}`;

  message.reply("Sedang mengscan......");

  try {
    const response = await axios.get(apiUrl);
    const get = response.data;

    if (get.status === "success") {
      const type = get.type;
      const url = get.site;

      const chat = await message.getChat();
      chat.sendMessage(`Url: ${url}\nTipe Cms: ${type}`);
    } else {
      message.reply("Gagal, tidak dapat mendeteksi cms");
    }
  } catch (error) {
    message.reply("ERROR");
    console.error(error);
  }
};
