const config = require('../config'); 
const {cmd} = require('../command')
const os = require("os")
const { runtime, fetchJson } = require('../lib/functions')
const axios = require('axios')

// ===== BRANDING - MEKA WENAS KARAN =====
const BOT_NAME = "CLOWN-MD"
const OWNER_NUM = "94704296653"
const REPO_URL = "https://github.com/CLOWN-MD/CLOWN-MD"
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83nconst config = require('../config'); 
const {cmd} = require('../command')
const os = require("os")
const { runtime } = require('../lib/functions')
const axios = require('axios')

// ===== CLOWN-MD BRANDING - FINAL =====
const BOT_NAME = "CLOWN-MD"
const OWNER_NUM = "94789123880"
const REPO_URL = "https://github.com/CLOWN-MD/CLOWN-MD"
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n"
const CHANNEL_JID = "120363414424834083@newsletter" // UBE REAL JID ✅
const CHANNEL_NAME = "CLOWN-MD OFFICIAL"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
const BOT_LOGO = "https://i.ibb.co/xyz/your-video.mp4"
// ======================================

cmd({
    pattern: "repo",
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
}, async(conn, mek, m,{from}) => {
try{
let repo = `*╭──────────────●●►*
*| BOT:* ${BOT_NAME}
*| OWNER:* ${OWNER_NUM}
*| REPO:* ${REPO_URL}
*| CHANNEL:* ${CHANNEL_URL}
*╰──────────────●●►*

${FOOTER}
`
await conn.sendMessage(from, { 
    video: { url: BOT_LOGO }, 
    caption: repo,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_JID,
        newsletterName: CHANNEL_NAME,
        serverMessageId: 999
      }
    }
  }, { quoted: mek });
} catch (e) { console.log(e) }
})

cmd({
    pattern: "system",
    category: "main",
    react: "🛠️",
    filename: __filename
}, async(conn, mek, m,{from, reply}) => {
let status = `*┌───────────────────────*
*├* ⏰ *Runtime:* ${runtime(process.uptime())}
*├* 📟 *Ram:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*├* ⚙️ *Host:* ${os.hostname()}
*├* 👨‍💻 *Bot:* ${BOT_NAME}
*├* 📢 *Channel:* https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*└───────────────────────*

${FOOTER}
`
return reply(status)
});

cmd({
    pattern: "ping",
    react: "🚀",
    category: "main",
    filename: __filename,
}, async (conn, mek, m, { from }) => {
    var inital = new Date().getTime();
    const { key } = await conn.sendMessage(from, { text: '```Ping!!!```' });
    var final = new Date().getTime();
    await conn.sendMessage(from, { text: `*Pong* 🤡 *${final - inital} ms*\n\n${FOOTER}`, edit: key });
});

cmd({
    pattern: "alive",
    category: "main",
    filename: __filename
}, async(conn, mek, m,{from}) => {
const aliveMsg = config.ALIVE_MSG || `${BOT_NAME} is Alive!`
let aliveMessage = `*╭─「 ALIVE 」──●●►*
*│◈ RUNTIME:* ${runtime(process.uptime())}
*│◈ BOT:* ${BOT_NAME} 🤡
*│◈ CHANNEL:* CLOWN-MD OFFICIAL
*╰────────────────●●►*

${aliveMsg}

${CHANNEL_URL}

${FOOTER}
`
await conn.sendMessage(from, { 
    video: { url: BOT_LOGO }, 
    caption: aliveMessage,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_JID,
        newsletterName: CHANNEL_NAME,
        serverMessageId: 999
      }
    }
  }, { quoted: mek });
});

let lastNewsTitles = { hiru: {}, sirasa: {}, derana: {} };
async function getNews(api){
    try{
        const res = await axios.get(`https://dark-yasiya-news-apis.vercel.app/api/${api}`);
        if(res.data.status) return res.data.result
        return null
    }catch{ return null }
}
async function sendNews(conn, groupId, news, source) {
    if (!news) return
    if (lastNewsTitles[source][groupId] !== news.title) {
        lastNewsTitles[source][groupId] = news.title;
        let message = `📰 *${source.toUpperCase()} - ${BOT_NAME}*\n\n*${news.title}*\n\n${news.desc}\n\n${news.url ? `*Read:* ${news.url}\n\n` : ''}${CHANNEL_URL}\n\n${FOOTER}`;
        if (news.image) {
            await conn.sendMessage(groupId, { image: { url: news.image }, caption: message });
        } else {
            await conn.sendMessage(groupId, { text: message });
        }
    }
}
async function checkAndPostNews(conn, groupId) {
    await sendNews(conn, groupId, await getNews('hiru'), 'hiru');
    await sendNews(conn, groupId, await getNews('sirasa'), 'sirasa');
    await sendNews(conn, groupId, await getNews('derana'), 'derana');
}
function startNewsService(conn, nsjid) {
    if (!startNewsService.interval) {
        startNewsService.interval = setInterval(async () => {
            if (nsjid) await checkAndPostNews(conn, nsjid);
        }, 60000);
    }
}
module.exports = { startNewsService, checkAndPostNews, sendNews };"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
const BOT_LOGO = "https://i.ibb.co/xyz/your-video.mp4" // OYAGE LOGO URL DAPAN
// =======================================

cmd({
    pattern: "repo",
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
}, async(conn, mek, m,{from, reply}) => {
try{
let repo = `*╭──────────────●●►*
*| OWNER:* ${OWNER_NUM}
*| BOT:* ${BOT_NAME}
*| REPO:* ${REPO_URL}
*| CHANNEL:* ${CHANNEL_URL}
*╰──────────────●●►*

${FOOTER}
`
await conn.sendMessage(from, { 
    video: { url: BOT_LOGO }, 
    caption: repo,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: `🤡 ${BOT_NAME} ࿐`,
        serverMessageId: 999
      }
    }
  }, { quoted: mek });
} catch (e) { console.log(e); reply("Error repo") }
})

cmd({
    pattern: "system",
    desc: "Check runtime",
    category: "main",
    react: "🛠️",
    filename: __filename
}, async(conn, mek, m,{from, reply}) => {
try{
let status = `*┌───────────────────────*
*├* ⏰ *Runtime:* ${runtime(process.uptime())}
*├* 📟 *Ram:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*├* ⚙️ *Host:* ${os.hostname()}
*├* 👨‍💻 *Bot:* ${BOT_NAME}
*├* 🧬 *Version:* 2.0.0 CLOWN
*└───────────────────────*

${FOOTER}
`
return reply(status)
}catch(e){ reply(`${e}`) }
});

cmd({
    pattern: "ping",
    react: "🚀",
    desc: "check ping",
    category: "main",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        var inital = new Date().getTime();
        const { key } = await conn.sendMessage(from, { text: '```Ping!!!```' });
        var final = new Date().getTime();
        return await conn.sendMessage(from, { text: `*Pong* 🤡 *${final - inital} ms* \n\n${FOOTER}`, edit: key });
    } catch (e) { reply(`${e}`) }
});

cmd({
    pattern: "alive",
    desc: "Check bot online",
    react: "🛠️",
    category: "main",
    filename: __filename
}, async(conn, mek, m,{from, reply}) => {
try{
const aliveMsg = config.ALIVE_MSG || `${BOT_NAME} is Alive & Running!`
let aliveMessage = `*╭─「 ALIVE 」──●●►*
*│◈ RUNTIME:* ${runtime(process.uptime())}
*│◈ RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
*│◈ BOT:* ${BOT_NAME} 🤡
*╰────────────────●●►*

${aliveMsg}

${FOOTER}
`
// Voice nathnam comment karapan
// await conn.sendMessage(from, { audio: { url: 'https://.../alive.mp3' }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })

await conn.sendMessage(from, { 
    video: { url: BOT_LOGO }, 
    caption: aliveMessage,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: `🤡 ${BOT_NAME} ࿐`,
        serverMessageId: 999
      }
    }
  }, { quoted: mek });
} catch (e) { console.log(e); reply(`${e}`) }
});

// ===== NEWS SERVICE =====
let lastNewsTitles = { hiru: {}, sirasa: {}, derana: {} };

async function getNews(api){
    try{
        const res = await axios.get(`https://dark-yasiya-news-apis.vercel.app/api/${api}`);
        if(res.data.status) return res.data.result
        return null
    }catch{ return null }
}

async function sendNews(conn, groupId, news, source) {
    if (!news) return
    if (lastNewsTitles[source][groupId] !== news.title) {
        lastNewsTitles[source][groupId] = news.title;
        let message = `📰 *${source.toUpperCase()} News - ${BOT_NAME}*\n\n*Title:* ${news.title}\n\n*Desc:* ${news.desc}\n\n*Date:* ${news.date}\n\n${news.url ? `*Read:* ${news.url}\n\n` : ''}${FOOTER}`;
        if (news.image) {
            await conn.sendMessage(groupId, { image: { url: news.image }, caption: message });
        } else {
            await conn.sendMessage(groupId, { text: message });
        }
    }
}

async function checkAndPostNews(conn, groupId) {
    const hiru = await getNews('hiru');
    const sirasa = await getNews('sirasa');
    const derana = await getNews('derana');
    await sendNews(conn, groupId, hiru, 'hiru');
    await sendNews(conn, groupId, sirasa, 'sirasa');
    await sendNews(conn, groupId, derana, 'derana');
}

function startNewsService(conn, nsjid) {
    if (!startNewsService.interval) {
        startNewsService.interval = setInterval(async () => {
            if (nsjid) await checkAndPostNews(conn, nsjid);
        }, 60000);
    }
}

module.exports = { startNewsService, checkAndPostNews, sendNews };