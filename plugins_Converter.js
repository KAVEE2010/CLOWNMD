const { cmd } = require('../command');
const { getRandom } = require('../lib/functions');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const googleTTS = require("google-tts-api");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath);

const CLOWN = "> POWERED by CLOWN-MD 🤡"

// ===== TTS =====
cmd({
    pattern: "tts",
    react: "❄️",
    desc: "text to speech",
    category: "convert",
    filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
    try{
        if (!q) return reply('Text ekak denna! Ex: .tts hello clown')
        const url = googleTTS.getAudioUrl(q, { lang: "en", slow: false, host: "https://translate.google.com" });
        await conn.sendMessage(from, { audio: { url }, mimetype: "audio/mpeg", ptt: true }, { quoted: mek });
    }catch(e){ reply('Error!') }
});

// ===== TO PTT =====
cmd({
    pattern: "toptt",
    alias: ["toaudio","tomp3"],
    react: "🔊",
    desc: "video to audio",
    category: "convert",
    filename: __filename
}, async(conn, mek, m,{from, reply}) => {
try{
    if(!m.quoted || m.quoted.type !== 'videoMessage') return reply("Video ekakata reply karapan! .toptt")
    let media = await m.quoted.download()
    let tempIn = path.join(__dirname, '../temp_in.mp4')
    let tempOut = path.join(__dirname, '../temp_out.mp3')
    fs.writeFileSync(tempIn, media)
    await new Promise((res, rej) => {
        ffmpeg(tempIn).toFormat("mp3").save(tempOut).on("end", res).on("error", rej)
    })
    await conn.sendMessage(from, { audio: fs.readFileSync(tempOut), mimetype: 'audio/mpeg' }, {quoted: m})
    fs.unlinkSync(tempIn); fs.unlinkSync(tempOut);
} catch (e) { reply('Error converting!') }
})

// ===== STICKER =====
cmd({
    pattern: "sticker",
    alias: ["s","stic"],
    react: "🔮",
    desc: "Convert to sticker",
    category: "convert",
    filename: __filename
}, async(conn, mek, m,{from, q, pushname, reply}) => {
try{
    const isQImg = m.quoted ? (m.quoted.type === 'imageMessage') : false
    const isQVid = m.quoted ? (m.quoted.type === 'videoMessage') : false
    if ((m.type === 'imageMessage') || isQImg) {
        var nameJpg = getRandom('')
        isQImg ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
        let sticker = new Sticker(nameJpg + '.jpg', {
            pack: pushname || "CLOWN-MD",
            author: "CLOWN-MD 🤡",
            type: q.includes("--crop") ? StickerTypes.CROPPED : StickerTypes.FULL,
            quality: 75,
            background: "transparent"
        });
        const buffer = await sticker.toBuffer();
        return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
    } else return reply("Image ekakata reply karapan! .s")
} catch (e) { reply('Sticker error!') }
});

// ===== IMG2URL =====
cmd({
    pattern: "img2url",
    alias: ["tourl","imgurl"],
    react: "🔗",
    desc: "image to url",
    category: "convert",
    filename: __filename
}, async(conn, mek, m,{from, reply}) => {
    try{
        if (!m.quoted || m.quoted.type !== 'imageMessage') return reply("Image ekakata reply karapan!")
        let buff = await m.quoted.download()
        let type = await require("file-type").fromBuffer(buff);
        let p = "./temp." + type.ext
        fs.writeFileSync(p, buff)
        let { img2url } = require('@blackamda/telegram-image-url');
        let url = await img2url(p)
        await reply(`🔗 *URL:* ${url}\n\n${CLOWN}`);
        fs.unlinkSync(p)
    } catch(e){ reply('Upload fail!') }
});

// ===== CURRENCY =====
cmd({
    pattern: "convert",
    react: "💱",
    desc: "Currency convert",
    category: "convert",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 3) return reply("Use: .convert 100 USD LKR");
        const [amount, fromC, toC] = [args[0], args[1].toUpperCase(), args[2].toUpperCase()]
        const { data } = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromC}`);
        if (!data.rates[toC]) return reply(`Rate not found for ${toC}`);
        const converted = (amount * data.rates[toC]).toFixed(2);
        await reply(`💱 *${amount} ${fromC} = ${converted} ${toC}*\nRate: 1 ${fromC} = ${data.rates[toC]} ${toC}\n\n${CLOWN}`);
    } catch (e) { reply(`Error: ${e.message}`) }
});

// ===== TRANSLATE =====
cmd({
    pattern: "trt",
    react: "🌐",
    desc: "Translate",
    category: "convert",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("Use: .trt si Hello world");
        const [lang, ...txt] = args
        const text = txt.join(' ')
        const { data } = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
        return reply(`🌍 *${text}*\n➡️ *${data.responseData.translatedText}*\nLang: ${lang}\n\n${CLOWN}`);
    } catch (e) { reply("Translate error") }
});