const { Client, LocalAuth, MessageMedia, ChatTypes } = require("whatsapp-web.js");
const fs = require("fs");
const path = require("path");
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath:
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    headless: false,
  },
});

client.on("qr", (qr) => {
  console.log(qr);
});

client.on("ready", () => {
  console.log("Bot is ready");
});

// Memulai bot
client.on("message", async (message) => {
  if (message.body === ".start") {
    const mediaUrl = `https://i.ibb.co/P95BCqP/Colorful-Artificial-Intelligence-Logo.jpg`
    const media = await MessageMedia.fromUrl(`${mediaUrl}`);
    const chat = await message.getChat();
    chat.sendMessage(media, {caption: 'Selamat datang di Voldigoad-Ai. Silahkan ketikan *.list* untuk melihat daftar command yang tersedia'});
  }
});

client.on("message", async (message) => {
  if (message.body === ".list") {
    const mediaUrl = "https://i.ibb.co/P95BCqP/Colorful-Artificial-Intelligence-Logo.jpg";
    const media = await MessageMedia.fromUrl(mediaUrl);
    const chat = await message.getChat();
    chat.sendMessage(media, {
      
      caption: `
╭════•›「 Tools 」
├≽️ *🤖 .gpt*
├ _ChatGPT_
├≽️ *🤖 .simi*
├ _SimSimi_
├≽️ *🎵 .lirik*
├ _Lirik Lagu_
├≽️ *🎸 .chord*
├ _Chord Lagu_
├≽️ *🌐 .wiki*
├ _Wikipedia_
├≽️ *📬 .kodepos*
├ _Check KodePos_
╰═══════════════

╭════•›「 Text To Speech (Women Voice) 」
├≽️ *🇮🇩 .indo*
├ _Bahasa Indonesia_
├≽️ *🇺🇸 .eng*
├ _English United States_
├≽️ *🇯🇵 .jap*
├ _Bahasa Jepang_
├≽️ *🇫🇷 .fr*
├ _Bahasa Perancis_
├≽️ *🇹🇭 .th*
├ _Bahasa Thailand_
├≽️ *🇷🇺 .rus*
├ _Bahasa Rusia_
╰═══════════════

╭════•›「 Downloader 」
├≽️ *🎵 .ytmp3*
├ _Unduh Musik YT_
├≽️ *🎥 .ytmp4*
├ _Unduh Video YT_
├≽️ *📽️ .fbdown*
├ _Unduh Video FB_
├≽️ *🎥 .reeldown*
├ _Unduh IG Reels_
├≽️ *🎥 .tiktok*
├ _Unduh Video TikTok_
├≽️ *🐦 .twitter*
├ _Unduh Video Twitter_
├≽️ *📁 .mediafire*
├ _Unduh dari MediaFire_
├≽️ *🎵 .soundcloud*
├ _Unduh Musik SoundCloud_
╰═══════════════

╭════•›「 Stalker 」
├≽️ *📸 .igstalk*
├ _Stalking IG_
├≽️ *💻 .gitstalk*
├ _Stalking GitHub_
├≽️ *🎵 .tikstalk*
├ _Stalking TikTok_
╰═══════════════

╭════•›「 ShortUrl 」
├≽️ *🔗 .bitly*
├ _ShortUrl menggunakan bitly_
├≽️ *🔗 .cutly*
├ _ShortUrl menggunakan cutly_
├≽️ *🔗 .tinurl*
├ _ShortUrl menggunakan tinurl_
├≽️ *🔗 .shrt*
├ _ShortUrl menggunakan shrt_
╰═══════════════

╭════•›「 Generator 」
├≽️ *📲 .qrcode*
├ _Buat QR Code_
├≽️ *🧠 .brain*
├ _Teks menjadi BrainFuck_
├≽️ *🔐 .hashgen*
├ _Teks menjadi hash_
├≽️ *📝 .fakedata*
├ _Data palsu_
╰═══════════════

╭════•›「 Check E-Wallet 」
├≽️ *💰 .ovo*
├ _Check Ovo_
├≽️ *💰 .gopay*
├ _Check Gopay_
├≽️ *💰 .linkaja*
├ _Check LinkAja_
├≽️ *💰 .spay*
├ _Check ShopeePay_
╰═══════════════
      
╭════•›「 Hacking 」
├≽️ *🌐 .scancms*
├ _Memeriksa CMS Website_
├≽️ *🌐 .jacking*
├ _Periksa ClickJacking_
├≽️ *🌐 .revip*
├ _Reverse IP_
├≽️ *🌐 .revip*
├ _Reverse IP_
├≽️ *🌐 .whois*
├ _WhoisLookup_
╰═══════════════      
`
    });
  }
});


// // ---------------- END COMMAND LIST ---------------------- //

// ---------------- OTHER TOOLS ---------------------- //

// Handle dev command
client.on("message", async (message) => {
  if (message.body === ".dev") {
    const nama = "Bayu Candra Yudistira";
    const ig = "bayucndra__";
    const github = "https://github.com/Bayu-x3";
    const replyMessage = `*Developer's Bio*\nNama: ${nama}\nInstagram: ${ig}\nGithub: ${github}`;
    message.reply(replyMessage);
  }
});

// Require and execute ChatGPT command
client.on("message", async (message) => {
  if (message.body.startsWith(".gpt")) {
    const handleGptCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "gpt.js"
    ));
    await handleGptCommands(message);
  }
});

// Require and executed SimSimi command
client.on("message", async (message) => {
  if (message.body.startsWith(".simi")) {
    const handleSimiCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "simi.js"
    ));
    await handleSimiCommands(message);
  }
});

// Require and executed LirikLagu command
client.on("message", async (message) => {
  if (message.body.startsWith(".lirik")) {
    const handleLirikCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "lirik.js"
    ));
    await handleLirikCommands(message);
  }
});

// Require and executed Wikipedia command
client.on("message", async (message) => {
  if (message.body.startsWith(".wikped")) {
    const handleWikiCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "wiki.js"
    ));
    await handleWikiCommands(message);
  }
});

// Require and executed Chord command
client.on("message", async (message) => {
  if (message.body.startsWith(".chord")) {
    const handleChordCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "chord.js"
    ));
    await handleChordCommands(message);
  }
});

// Require and executed FakeData command
client.on("message", async (message) => {
  if (message.body.startsWith(".kodepos")) {
    const handlePosCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "kodepos.js"
    ));
    await handlePosCommands(message);
  }
});


// ------------------------------------------------------ //

// ---------------- TEXT TO SPEACH TOOLS ---------------------- //

// Require and executed Indonesia command
client.on("message", async (message) => {
  if (message.body.startsWith(".indo")) {
    const handleIndonesiaCommands = require(path.join(
      __dirname,
      "commands",
      "speach",
      "indo.js"
    ));
    await handleIndonesiaCommands(message);
  }
});

// Require and executed English command
client.on("message", async (message) => {
  if (message.body.startsWith(".eng")) {
    const handleEnglishCommands = require(path.join(
      __dirname,
      "commands",
      "speach",
      "us.js"
    ));
    await handleEnglishCommands(message);
  }
});

// Require and executed Japan command
client.on("message", async (message) => {
  if (message.body.startsWith(".jap")) {
    const handleJapanCommands = require(path.join(
      __dirname,
      "commands",
      "speach",
      "japan.js"
    ));
    await handleJapanCommands(message);
  }
});

// Require and executed French command
client.on("message", async (message) => {
  if (message.body.startsWith(".fr")) {
    const handleFrenchCommands = require(path.join(
      __dirname,
      "commands",
      "speach",
      "french.js"
    ));
    await handleFrenchCommands(message);
  }
});

// Require and executed Thailand command
client.on("message", async (message) => {
  if (message.body.startsWith(".th")) {
    const hanldeThCommands = require(path.join(
      __dirname,
      "commands",
      "speach",
      "th.js"
    ));
    await hanldeThCommands(message);
  }
});

// Require and executed Russia command
client.on("message", async (message) => {
  if (message.body.startsWith(".rus")) {
    const handleRussiaCommands = require(path.join(
      __dirname,
      "commands",
      "speach",
      "russia.js"
    ));
    await handleRussiaCommands(message);
  }
});

// ---------------- END TEXT TO SPEACH TOOLS ---------------------- //

// ---------------- DOWNLOADER TOOLS ---------------------- //

// Require and execute ytmp3 command
client.on("message", async (message) => {
  if (message.body.startsWith(".ytmp3")) {
    const handleYtmp3Command = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "ytmp3.js"
    ));
    await handleYtmp3Command(message);
  }
});

// Require and execute ytmp4 command
client.on("message", async (message) => {
  if (message.body.startsWith(".ytmp4")) {
    const handleYtmp4Command = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "ytmp4.js"
    ));
    await handleYtmp4Command(message);
  }
});

// Require and execute Facebook command
client.on("message", async (message) => {
  if (message.body.startsWith(".fbdown")) {
    const handleFacebookCommand = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "fbdown.js"
    ));
    await handleFacebookCommand(message);
  }
});

// Require and execute TikTok command
client.on("message", async (message) => {
  if (message.body.startsWith(".tiktok")) {
    const handleTikTokCommand = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "tiktok.js"
    ));
    await handleTikTokCommand(message);
  }
});

// Require and execute Reels command
client.on("message", async (message) => {
  if (message.body.startsWith(".reelsdown")) {
    const handleReelsIgCommand = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "ig.js"
    ));
    await handleReelsIgCommand(message);
  }
});

// Require and execute Twitter command
client.on("message", async (message) => {
  if (message.body.startsWith(".twitter")) {
    const handleTwtCommands = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "twt.js"
    ));
    await handleTwtCommands(message);
  }
});

// Require and execute MediaFire command
client.on("message", async (message) => {
  if (message.body.startsWith(".mediafire")) {
    const handleMediafireCommands = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "mediafire.js"
    ));
    await handleMediafireCommands(message);
  }
});

// Require and execute SoundCloud command
client.on("message", async (message) => {
  if (message.body.startsWith(".soundcld")) {
    const handleSoundCommands = require(path.join(
      __dirname,
      "commands",
      "downloads",
      "snd.js"
    ));
    await handleSoundCommands(message);
  }
});

// ---------------- END DOWNLOADER TOOLS ---------------------- //

// ---------------- STALKER TOOLS ---------------------- //

// Require and execute IgStalk command
client.on("message", async (message) => {
  if (message.body.startsWith(".igstalk")) {
    const handleIgStalkCommands = require(path.join(
      __dirname,
      "commands",
      "stalk",
      "igstalk.js"
    ));
    await handleIgStalkCommands(message);
  }
});

// Require and execute TiktokStalk command
client.on("message", async (message) => {
  if (message.body.startsWith(".tikstalk")) {
    const handleGitCommands = require(path.join(
      __dirname,
      "commands",
      "stalk",
      "tikstalk.js"
    ));
    await handleGitCommands(message);
  }
});

// Require and execute GithubStalk command
client.on("message", async (message) => {
  if (message.body.startsWith(".gitstalk")) {
    const handleTikStalkCommands = require(path.join(
      __dirname,
      "commands",
      "stalk",
      "git.js"
    ));
    await handleTikStalkCommands(message);
  }
});

// ---------------- END STALKER TOOLS ---------------------- //

// ---------------- SHORT URL TOOLS ---------------------- //

// Require and execute Bitly command
client.on("message", async (message) => {
  if (message.body.startsWith(".bitly")) {
    const handleBitCommands = require(path.join(
      __dirname,
      "commands",
      "short",
      "bit.js"
    ));
    await handleBitCommands(message);
  }
});

// Require and execute cutly command
client.on("message", async (message) => {
  if (message.body.startsWith(".cutly")) {
    const handleCutlyCommands = require(path.join(
      __dirname,
      "commands",
      "short",
      "cutly.js"
    ));
    await handleCutlyCommands(message);
  }
});

// Require and execute tinur command
client.on("message", async (message) => {
  if (message.body.startsWith(".tinurl")) {
    const handleTinCommands = require(path.join(
      __dirname,
      "commands",
      "short",
      "tinny.js"
    ));
    await handleTinCommands(message);
  }
});

// Require and execute short command
client.on("message", async (message) => {
  if (message.body.startsWith(".shrt")) {
    const handleShortCommands = require(path.join(
      __dirname,
      "commands",
      "short",
      "shrt.js"
    ));
    await handleShortCommands(message);
  }
});

// ---------------- END SHORT URL TOOLS ---------------------- //

// ----------------- GENERATOR TOOLS -------------------------- //

// Require and execute Qr command
client.on("message", async (message) => {
  if (message.body.startsWith(".qrcode")) {
    const handleQrCommands = require(path.join(
      __dirname,
      "commands",
      "generator",
      "qr.js"
    ));
    await handleQrCommands(message);
  }
});

// Require and execute BrainFuck command
client.on("message", async (message) => {
  if (message.body.startsWith(".brain")) {
    const handleBrainCommands = require(path.join(
      __dirname,
      "commands",
      "generator",
      "brain.js"
    ));
    await handleBrainCommands(message);
  }
});

// Require and execute Hash command
client.on("message", async (message) => {
  if (message.body.startsWith(".hashgen")) {
    const handleHashCommands = require(path.join(
      __dirname,
      "commands",
      "generator",
      "hash.js"
    ));
    await handleHashCommands(message);
  }
});

// Require and executed FakeData command
client.on("message", async (message) => {
  if (message.body.startsWith(".fakedata")) {
    const handleFakeCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "fakedata.js"
    ));
    await handleFakeCommands(message);
  }
});

// Require and executed FakeData command
client.on("message", async (message) => {
  if (message.body.startsWith(".jacking")) {
    const handleJackingCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "jacking.js"
    ));
    await handleJackingCommands(message);
  }
});

// Require and executed FakeData command
client.on("message", async (message) => {
  if (message.body.startsWith(".whois")) {
    const handleWhoCommands = require(path.join(
      __dirname,
      "commands",
      "others",
      "whois.js"
    ));
    await handleWhoCommands(message);
  }
});

// ---------------- END GENERATOR TOOLS ---------------------- //

// ---------------- HACKING TOOLS ---------------------------- //

// Require and execute Cms command
client.on("message", async (message) => {
  if (message.body.startsWith(".scancms")) {
    const handleCmsCommands = require(path.join(
      __dirname,
      "commands",
      "hacking",
      "cms.js"
    ));
    await handleCmsCommands(message);
  }
});

// Require and execute ReverseIP command
client.on("message", async (message) => {
  if (message.body.startsWith(".revip")) {
    const handleRevIpCommands = require(path.join(
      __dirname,
      "commands",
      "hacking",
      "revip.js"
    ));
    await handleRevIpCommands(message);
  }
});

// ---------------- END HACKING TOOLS ---------------------------- //

// ---------------- EWALLET TOOLS ---------------------------- //

// Require and execute Ovo command
client.on("message", async (message) => {
  if (message.body.startsWith(".revip")) {
    const handleOvoCommands = require(path.join(
      __dirname,
      "commands",
      "wallet",
      "ovo.js"
    ));
    await handleOvoCommands(message);
  }
});

// Require and execute Gopay command
client.on("message", async (message) => {
  if (message.body.startsWith(".gopay")) {
    const hanldeGopayCommands = require(path.join(
      __dirname,
      "commands",
      "wallet",
      "gopay.js"
    ));
    await hanldeGopayCommands(message);
  }
});

// Require and execute LinkAja command
client.on("message", async (message) => {
  if (message.body.startsWith(".linkaja")) {
    const handleLinkCommands = require(path.join(
      __dirname,
      "commands",
      "wallet",
      "link.js"
    ));
    await handleLinkCommands(message);
  }
});

// Require and execute ShopeePay command
client.on("message", async (message) => {
  if (message.body.startsWith(".spay")) {
    const handleShopeeCommands = require(path.join(
      __dirname,
      "commands",
      "wallet",
      "spay.js"
    ));
    await handleShopeeCommands(message);
  }
});

// ---------------- END EWALLET TOOLS ---------------------------- //

// ---------------- STICKER TOOLS ---------------------- //

// Commands execute Sticker
const prefix = ".";
client.on('message', async msg => {

	if (msg.body[0] == prefix){
		
		var [cmd, ...args] = msg.body.slice(1).split(" ");
		args = args.join(" ");

		if (cmd == "say"){
			client.sendMessage(msg.from, args);
		}
		
		if (cmd === "s") {
			const attachmentData = await msg.downloadMedia();
			client.sendMessage(msg.from, attachmentData, {sendMediaAsSticker: true});
		}

		if (cmd === "s2") {
			const attachmentData = await msg.downloadMedia();
			client.sendMessage(msg.from, attachmentData, {sendVideoAsGif: true});
		}

		if (cmd == "gambar"){
			const media = MessageMedia.fromFilePath('./path/to/anime-cry.gif');
			client.sendMessage(msg.from, media);
		}

		if (cmd == "video"){
			const media = MessageMedia.fromFilePath('./path/to/anime-cry.mp4');
			client.sendMessage(msg.from, media, {sendVideoAsGif: true});
		}
 
		if (cmd == "link"){
			const media = await MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
			client.sendMessage(msg.from, media, {sendMediaAsSticker: true});
		}
 
		if (cmd == "link2"){
			const media = await MessageMedia.fromUrl(args);
			client.sendMessage(msg.from, media, {sendMediaAsSticker: true});
		}

	}
		
});

// ---------------- END STICKER TOOLS ---------------------- //

client.on("disconnected", (reason) => {
  console.log("disconnected whatsapp-bot", reason);
});

client.initialize();
