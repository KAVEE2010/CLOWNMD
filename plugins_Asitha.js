const config = require('../config')
const { cmd } = require('../command')
const { fetchJson, isUrl } = require('../lib/functions')
const axios = require('axios')
const { igdl } = require('ruhend-scraper')
const { File } = require('megajs')

// ===== CLOWN-MD BRANDING =====
const yourName = "> POWERED by CLOWN-MD 🤡"

// ===== PREMIUM CACHE =====
let premiumCache = null
let premiumCacheTime = 0
async function getPremiumUsers() {
    if (premiumCache && Date.now() - premiumCacheTime < 600000) return premiumCache
    try{
        const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Moviedl/primiyam.json');
        const preUsers = preUser.split(",");
        premiumCache = preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
        premiumCacheTime = Date.now()
        return premiumCache
    }catch{ return [] }
}

function formatNumber(num) { return String(num).padStart(2, '0'); }

// ==================== TWITTER ====================
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    react: "🎥",
    desc: "download twitter videos",
    category: "download",
    filename: __filename
}, async(conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("*Give me twitter url ❌*\nEx: .twitter https://twitter.com/...")
        await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } })
        let data = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/twitter?url=${q}`)
        if(!data?.result) return reply("Failed to fetch ❌ API down maybe")
        reply("*Downloading...*")
        await conn.sendMessage(from, { video: { url: data.result.video_sd}, mimetype: "video/mp4", caption: `*SD Quality*\n${yourName}` }, { quoted: mek })
        await conn.sendMessage(from, { video: { url: data.result.video_hd}, mimetype: "video/mp4", caption: `*HD Quality*\n${yourName}` }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } })
    } catch (e) { console.log(e); reply(`Error: ${e.message}`) }
})

// ==================== GDRIVE ====================
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    react: "📀",
    desc: "download gdrive files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("*Give me gdrive url ❌*");
        await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } })
        let data = await fetchJson(`https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`);
        if (!data.result) return reply("*Failed to fetch ❌*");
        let fileName = data.result.fileName || "CLOWN-MD_file"
        let downloadUrl = data.result.downloadUrl
        let mimeType = data.result.mimetype || "application/octet-stream"
        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: fileName,
            mimetype: mimeType,
            caption: `${fileName}\n${yourName}`
        }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } })
    } catch (e) { console.error(e); reply("*Error while processing ❌*") }
})

// ==================== GDRIVE GINI (Ginisisila) ====================
cmd({
    pattern: "gdrivegini",
    react: "📀",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        let url = q.split(" & ")[0]
        let img = q.split(" & ")[1] || "https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg"
        let down = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ginisisila?url=${url}`);
        let downurl = down.result.dl_link
        let data = await fetchJson(`https://api.fgmods.xyz/api/downloader/gdrive?url=${downurl}&apikey=mnp3grlZ`);
        if (!data.result) return reply("*Failed ❌*");
        await conn.sendMessage(from, {
            document: { url: data.result.downloadUrl },
            fileName: data.result.fileName,
            mimetype: data.result.mimetype || "video/mp4",
            caption: `${data.result.fileName}\n${yourName}`
        }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } })
    } catch (e) { console.error(e); reply("*Error ❌*") }
})

// ==================== MEDIAFIRE ====================
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    react: "📚",
    desc: "download mediafire files",
    category: "download",
    filename: __filename
}, async(conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("*Give me mediafire url ❌*")
        await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } })
        let data = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/mfire?url=${q}`)
        await conn.sendMessage(from, { document: { url: data.result.dl_link }, fileName: data.result.fileName, mimetype: data.result.file_type, caption: `${data.result.fileName}\n${yourName}` }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } })
    } catch (e) { console.log(e); reply(`${e}`) }
})

// ==================== INSTAGRAM ====================
cmd({
    pattern: "ig",
    desc: "Instagram downloader",
    react: "🎥",
    category: "download",
    filename: __filename
}, async(conn, mek, m,{from, q, reply}) => {
try{
    if (!q) return reply(`Give valid IG Link...`);
    await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } })
    let res = await igdl(q);
    let data = await res.data;
    for (let i = 0; i < Math.min(data.length, 5); i++) {
        await conn.sendMessage(from,{video: {url: data[i].url},mimetype:"video/mp4",caption: `${yourName}`},{quoted:mek})
    }
    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } })
}catch(e){ console.log(e); reply("IG API error ❌") }
})

// ==================== APK ====================
cmd({
    pattern: "apk",
    react: '🗽',
    desc: "Download apk",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
try {
    if(!q) return reply("App name? Ex: .apk whatsapp")
    await conn.sendMessage(from, { react: { text: "🔄", key: mek.key } })
    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data.datalist.list[0];
    let sizeMB = (data.size / 1000000).toFixed(2)
    let desc = `*「 CLOWN-MD APK 」*\n\n*🏷️ Name:* ${data.name}\n*📦 Size:* ${sizeMB}MB\n*🔖 Package:* ${data.package}\n*👤 Dev:* ${data.developer.name}\n\n${yourName}`
    await conn.sendMessage(from,{image: {url: data.icon},caption: desc},{quoted: mek})
    await conn.sendMessage(from,{document: {url: data.file.path_alt},fileName: `${data.name}.apk`,mimetype: 'application/vnd.android.package-archive',caption: `${yourName}`},{quoted: mek})
    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } })
}catch(e){ console.log(e); reply(`${e}`) }
})

// ==================== MEGA ====================
cmd({
    pattern: "mega",
    category: "download",
    react: "⬇️",
    desc: "Download Mega file",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !q.includes('mega.nz')) return reply("Valid Mega.nz URL please")
        const file = File.fromURL(q);
        const buffer = await file.downloadBuffer();
        await conn.sendMessage(from, { document: buffer, mimetype: "application/octet-stream", fileName: file.name || "CLOWN-MD_mega_file" }, { quoted: mek });
    } catch (e) { console.error(e); reply(`Error: ${e.message}`) }
});

// ==================== DBL (Movie Upload) ====================
cmd({
    pattern: "dbl",
    react: "⬇️",
    filename: __filename
}, async(conn, mek, m, { from, q, reply }) => {
    try {
        const link = q.split(" & ")[0]
        const titel = q.split(" & ")[1] || "CLOWN-MD Movie"
        const si = q.split(" & ")[2] || ""
        if (!link) return reply('Link please');
        const urlRegex = /^(https?:\/\/[^\s]+)/;
        if (!urlRegex.test(link)) return reply('Invalid URL');
        const ad_mg = await conn.sendMessage(from, { text : 'ᴜᴘʟᴏᴀᴅɪɴɢ file...📥' }, {quoted: mek} )
        var loader = ["[■□□□□□□□□□□] 0%","[■■■□□□□□□□□] 30%","[■■■■■■■□□□□] 60%","[■■■■■■■■■■■] 100%","*Downloading...*"];
        let { key } = await conn.sendMessage(from, {text: 'Starting...' , edit : ad_mg.key }, {quoted: mek})
        for (let i = 0; i < loader.length; i++) { await conn.sendMessage(from, {text: loader[i], edit: key }) }
        await conn.sendMessage(from, { document: { url: link }, caption: `*${titel}*\n*${si}*\n${yourName}`, mimetype: "video/mp4", fileName: `🎬 CLOWN-MD ${titel}.mp4` });
    } catch (e) { reply('❗ Error: ' + e.message); }
});

// ==================== FORWARD (Owner Only) ====================
cmd({
    pattern: "forward",
    desc: "forward msgs",
    alias: ["fo"],
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { from, q, isOwner, reply }) => {
if (!isOwner) return reply("*Owner Only ❌*")
if (!q || !m.quoted) return reply("*Give message + JID ❌*")
let message = {}
message.key = mek.quoted?.fakeObj?.key;
message.message = mek.quoted;
await conn.forwardMessage(q, message, false)
return reply(`*Forwarded to:* ${q}\n${yourName}`)
})

// ==================== LOADING ANIMATION ====================
cmd({
    pattern: "loading",
    react: "⬇️",
    filename: __filename
}, async(conn, mek, m, { from, reply }) => {
    try {
        let frames = ["[■□□□□□□□□□□]","[■■■□□□□□□□□]","[■■■■■□□□□□□]","[■■■■■■■■□□□]","[■■■■■■■■■■□]","[■■■■■■■■■■■■]"];
        let { key } = await conn.sendMessage(from, { text: 'Loading...' });
        for (let i = 0; i < frames.length; i++) {
            await new Promise(r => setTimeout(r, 500));
            await conn.sendMessage(from, { text: frames[i], edit: key });
        }
        await conn.sendMessage(from, { text: `*CLOWN-MD Loaded!* 🤡\n${yourName}`, edit: key });
    } catch (e) { reply('Error: ' + e.message); }
});