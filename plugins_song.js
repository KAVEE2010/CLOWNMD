const { cmd } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { ytmp3, ytmp4 } = require('../lib/scrap')

// ===== CLOWN-MD =====
const BOT_NAME = "CLOWN-MD"
const CHANNEL_JID = "120363414424834083@newsletter"
const CHANNEL_NAME = "CLOWN-MD OFFICIAL "
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
const BOT_LOGO = "https://i.ibb.co/xyz/logo.jpg"
// ====================

function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
    return q;
}

// ===== SECURED EVAL - OWNER ONLY =====
cmd({ 
    pattern: "eval",
    category: "owner",
    dontAddCommandList: true,
    filename: __filename,
    desc: "eval"
}, async(conn, mek, m,{from, q, isOwner, reply}) => {
    if (!isOwner) return reply("*Owner Only*")
    try {
        let result = eval(`(async()=>{ ${q} })()`);
        if (typeof result === "object") reply(JSON.stringify(result, null, 2));
        else reply(String(result));
    } catch (err) { reply(err.toString()); }
})

// .song
cmd({
    pattern: "song",
    desc: "Download songs",
    react: "🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { prefix, from, q, reply }) => {
    try {
        if(!q) return reply("Song name denna: .song Believer")
        let query = convertYouTubeLink(q);
        const search = await yts(query);
        const data = search.videos[0];
        if(!data) return reply("Not found")
        const url = data.url;

        const buttons = [
          {buttonId: prefix + 'ytmp3 ' + url, buttonText: {displayText: ' Audio 🎶'}, type: 1},
          {buttonId: prefix + 'ytdoc ' + url, buttonText: {displayText: ' Document 📂'}, type: 1}
        ]

        let desc = `*🎶 ${BOT_NAME} AUDIO 🎶*\n*╭──────────────●●►*\n*│📀 Title:* ${data.title}\n*│🕘 Time:* ${data.timestamp}\n*│📅 Ago:* ${data.ago}\n*│👁️ Views:* ${data.views}\n*│🔗 Link:* ${data.url}\n*╰──────────────●●►*\n\n${FOOTER}`

        await conn.buttonMessage(from, {
            image: { url: data.thumbnail },
            caption: desc,
            footer: FOOTER,
            buttons: buttons,
            headerType: 1
        }, mek)
    } catch (e) { console.log(e); reply(`Error: ${e}`) }
})

// .video
cmd({
    pattern: "video",
    desc: "Download videos",
    react: "🎥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { prefix, from, q, reply }) => {
    try {
        if(!q) return reply("Video name denna: .video Alan Walker")
        let query = convertYouTubeLink(q);
        const search = await yts(query);
        const data = search.videos[0];
        const url = data.url;

        const buttons = [
          {buttonId: prefix + `ytmp4 ${url} & 360p`, buttonText: {displayText: ' 360p 🎶'}, type: 1},
          {buttonId: prefix + `ytmp4 ${url} & 720p`, buttonText: {displayText: ' 720p 🎶'}, type: 1},
          {buttonId: prefix + `ytmp4 ${url} & 1080p`, buttonText: {displayText: ' 1080p 🎶'}, type: 1},
          {buttonId: prefix + `ytvdoc ${url} & 720p`, buttonText: {displayText: ' Doc 720p 📂'}, type: 1}
        ]

        let desc = `*📽️ ${BOT_NAME} VIDEO 📽️*\n*╭──────────────●●►*\n*│📀 Title:* ${data.title}\n*│🕘 Time:* ${data.timestamp}\n*│📅 Ago:* ${data.ago}\n*│👁️ Views:* ${data.views}\n*╰──────────────●●►*\n\n${FOOTER}`

        await conn.buttonMessage(from, {
            image: { url: data.thumbnail },
            caption: desc,
            footer: FOOTER,
            buttons: buttons,
            headerType: 1
        }, mek)
    } catch (e) { console.log(e); reply(`Error`) }
})

// ytmp3
cmd({
    pattern: "ytmp3",
    react: "⬇",
    filename: __filename
}, async(conn, mek, m,{from, q, reply}) => {
try{
    if(!q) return reply("URL denna")
    if (!q.includes('youtube.com/watch?v=')) return reply("Valid YT link")
    let data = await ytmp3(q)
    let dl = data.dl_link
    await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
    await conn.sendMessage(from, { audio: { url: dl }, mimetype: "audio/mpeg" }, {quoted:mek})
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){ reply(`Error: ${e}`) }
})

// ytdoc
cmd({
    pattern: "ytdoc",
    react: "⬇",    
    filename: __filename
}, async(conn, mek, m,{from, q, reply}) => {
try{
    if(!q) return reply("URL denna")
    let data = await ytmp3(q)
    let dl = data.dl_link
    const search = await yts(q);
    const data1 = search.videos[0];
    await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
    await conn.sendMessage(from, { document: { url: dl }, mimetype: "audio/mpeg", fileName: data1.title + ".mp3", caption: `${FOOTER}`}, {quoted:mek})
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){ reply(`Error: ${e}`) }
})

// ytmp4
cmd({
    pattern: "ytmp4",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1] || "720p";
        if (!pm) return reply("URL denna");
        let data = await ytmp4(`${pm}`,`${rr}`)
        let dl = data
        await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});
        await conn.sendMessage(from, { video: { url: dl }, mimetype: "video/mp4", caption: FOOTER }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }});
    } catch (e) { reply(`${e}`); }
})

// ytvdoc
cmd({
    pattern: "ytvdoc",
    react: "⬇",    
    filename: __filename
}, async(conn, mek, m,{from, q, reply}) => {
try{
    const pm = q.split(" & ")[0];
    const rr = q.split(" & ")[1] || "720p";
    if (!pm) return reply("URL denna");
    let data = await ytmp4(`${pm.trim()}`,`${rr.trim()}`)
    let dl = data
    const search = await yts(q);
    const data3 = search.videos[0];
    await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});
    await conn.sendMessage(from, { document: { url: dl }, mimetype: "video/mp4", fileName: data3.title+ ".mp4", caption: `${FOOTER}`}, {quoted:mek})
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){ reply(`Error: ${e}`) }
})

cmd({
    pattern: "yts",
    react: "🔎",
    alias: ["ytsearch"],
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Search term denna");
        const searchResults = await yts(q);
        const videos = searchResults.videos.slice(0, 5);
        if (!videos.length) return reply("No results");

        var rows = []
        for (let i of videos ){     
            rows.push({ title: i.title, description: i.timestamp, rowId: config.PREFIX + 'ytselect ' + i.url });
        }
        const sections = [{ title: 'YT Results', rows: rows }]
        const listMessage = {
            text: `*${BOT_NAME} YTS*\n\n🔎 Search: *${q}*\n\n${FOOTER}`,
            footer: FOOTER,
            title: 'Results',
            buttonText: 'Select Video',
            sections
        }
        await conn.listMessage(from, listMessage, mek)
    } catch (e) { reply('ERROR') }
})

cmd({
    pattern: "ytselect",
    filename: __filename
}, async (conn, mek, m, { from, prefix, q }) => {
    try {
        let query = convertYouTubeLink(q);
        const search = await yts(query);
        const data = search.videos[0];
        const url = data.url;
        const buttons = [
          {buttonId: prefix + 'song ' + url, buttonText: {displayText: ' Audio 🎶'}, type: 1},
          {buttonId: prefix + 'video ' + url, buttonText: {displayText: ' Video 📂'}, type: 1}
        ]
        await conn.buttonMessage(from, {
            image: { url: data.thumbnail },
            caption: `*${data.title}*\n\n${FOOTER}`,
            footer: FOOTER,
            buttons: buttons,
            headerType: 1
        }, mek)
    } catch (e) { console.log(e) }
})