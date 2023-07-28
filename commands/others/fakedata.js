const axios = require('axios');
const fs = require('fs')
const {MessageMedia} = require('whatsapp-web.js');

module.exports = async function handleFakeCommands(message) {
 const apiUrl = `https://api.pinostore.my.id/api/others/fakedata?apikey=FreeKey`
 message.reply("Sedang membuat data....");

 try {
  const response = await axios.get(apiUrl);
  const get = response.data;

  if (get.code === 200) { 
   const {FirstName, LastName, Gender, Location, StreetNumber, City, State, Country, Poscode, Latitude, Email, Uuid, Username, Password, Phone, Cell } = get.result;
   const chat = await message.getChat();
   chat.sendMessage(`FirstName: ${FirstName}\nLastName: ${LastName}\nGender: ${Gender}\nLocation: ${Location}, StreetNumber: ${StreetNumber}\nCity:${City}\nState: ${State}\nCountry: ${Country}\nPoscode: ${Poscode}\nLatitude: ${Latitude}\nEmail: ${Email}\n Uuid: ${Uuid}\nUsername: ${Username}\nPassword: ${Password}\nPhone: ${Phone}\nCell: ${Cell}`);
  } else {
   message.reply("Tidak dapat memuat fakedata");
  }
 } catch(error) {
  console.error(error)
  message.reply("ERROR")
 }
}