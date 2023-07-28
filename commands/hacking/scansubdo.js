const axios = require('axios')
const wa = require('whatsapp-web.js')

module.exports = async function handleScanSubdoCommands(message) {
 const url = message.body.substring(11).trim();
    if (!url) {
      message.reply('Mohon berikan URL yang valid.');
      return;
    }

    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set('domain', url);

      const options = {
        method: 'POST',
        url: 'https://subdomain-scan.p.rapidapi.com/subdomain-scan/',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Proxy-Secret': '353ece00-422e-11ec-bd7a-b11641c59ea7',
          'X-RapidAPI-Key': '1f0d424afamsh0c16fe26fe061d8p171587jsn5b02a39b74da',
          'X-RapidAPI-Host': 'subdomain-scan.p.rapidapi.com'
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      const subdomains = response.data;

      if (Object.keys(subdomains).length > 0) {
        let reply = 'Hasil Pemindaian Subdomain:\n\n';
        for (const subdomain in subdomains) {
          reply += `Subdomain: ${subdomain}\n`;
          reply += `Alias: ${subdomains[subdomain].alias.join(', ')}\n`;
          reply += `Code: ${subdomains[subdomain].code}\n`;
          reply += `Domain: ${subdomains[subdomain].domain}\n`;
          reply += `IP Address: ${subdomains[subdomain].ipaddr.join(', ')}\n`;
          reply += `Server: ${subdomains[subdomain].server}\n\n`;
        }
        message.reply(reply);
      } else {
        message.reply('Tidak ditemukan subdomain untuk URL yang diberikan.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.reply('Terjadi kesalahan saat melakukan pemindaian subdomain.');
    }
   }