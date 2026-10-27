const axios = require('axios')
const { fetchJson } = require('../lib/functions')
const cheerio = require('cheerio')
const config = require('../config')
const { cmd } = require('../command')
const { facebook } = require('@mrnima/facebook-downloader');
const { downloadTiktok } = require("@mrnima/tiktok-downloader");

// ===== BRANDING - MEKA WENAS KARAN =====
const BOT_NAME = "CLOWN-MD"
const BOT_FOOTER = `> *POWERED by ${BOT_NAME}* 🤡`
// =======================================

async function getPremiumUsers() {
    try{
    const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Premium/premium.json');
    const preUsers = preUser.split(",");
    return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
    }catch{ return [] }
}

// ===== TIKTOK =====
cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tt videos",
    category: "download",
    filename: __filename
}, async(conn, mek, m, { from, prefix, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("*give me tiktok url ❌*")
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key }})
        let result = await downloadTiktok(q);
        let desc = `🎟️ *${BOT_NAME} TIKTOK DOWNLOADER* 🎟️\n\n📌 *Title* :- ${result.result.title}\n\n*Options:*\n${prefix}tn1 ${q} - No-Watermark-01\n${prefix}tn2 ${q} - No-Watermark-02\n${prefix}thd ${q} - HD\n${prefix}ta ${q} - Audio\n\n${BOT_FOOTER}`
        await conn.sendMessage(from, { image: { url: result.result.image }, caption: desc }, { quoted: mek })
    } catch (e) { console.log(e); reply(`${e}`) }
})

cmd({ pattern: "thd", react: "⬇", filename: __filename }, async(conn, mek, m,{from, q, reply}) => {
try{
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
 if(!q) return reply(msr.url)
 let data = await downloadTiktok(q);
 await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_hd }, mimetype: "video/mp4", caption: BOT_FOOTER }, { quoted: mek })
}catch(e){ reply(`Error !!\n\n*${e}*`) }
})

cmd({ pattern: "tn2", react: "⬇", filename: __filename }, async(conn, mek, m,{from, q, reply}) => {
try{
 let data = await downloadTiktok(q);
 await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_1}, mimetype: "video/mp4", caption: BOT_FOOTER }, { quoted: mek })
}catch(e){ reply(`Error !!\n\n*${e}*`) }
})

cmd({ pattern: "tn1", react: "⬇", filename: __filename }, async(conn, mek, m,{from, q, reply}) => {
try{
 let data = await downloadTiktok(q);
 await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_2 }, mimetype: "video/mp4", caption: BOT_FOOTER }, { quoted: mek })  
}catch(e){ reply(`Error !!\n\n*${e}*`) }
})

cmd({ pattern: "ta", react: "⬇", filename: __filename }, async(conn, mek, m,{from, q, reply}) => {
try{
 let data = await downloadTiktok(q);
 await conn.sendMessage(from, { audio: { url: data.result.dl_link.download_mp3 }, mimetype: "audio/mpeg" }, { quoted: mek })  
}catch(e){ reply(`Error !!\n\n*${e}*`) }
})

// ===== FACEBOOK =====
cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async(conn, mek, m, { from, prefix, q, reply }) => {
  try {
  if (!q || !q.startsWith("https://")) return reply("*❌ Please provide a valid URL.*")
  const result = await facebook(q)
  await conn.sendMessage(from, { react: { text: "🎥", key: mek.key } });
  const desc = `💢 *${BOT_NAME} FB DOWNLOADER* 💢\n\n*TIME :* ${result.result.duration}\n*URL :* ${q}\n\n*Options:*\n${prefix}fbhd ${q} - HD\n${prefix}fbsd ${q} - SD\n${prefix}fba ${q} - Audio\n\n${BOT_FOOTER}`
  await conn.sendMessage(from, { image: { url: result.result.thumbnail }, caption: desc }, { quoted: mek })
} catch (e) { console.log(e); reply(`${e}`) }
})

cmd({ pattern: "fbsd", react: "⬇", filename: __filename }, async(conn, mek, m,{from, q, reply}) => {
try{
 const result = await facebook(q)
 await conn.sendMessage(from, { video: { url: result.result.links.SD }, mimetype: "video/mp4", caption: BOT_FOOTER }, { quoted: mek })  
}catch(e){ reply(`Error !!\n\n*${e}*`) }
})

cmd({ pattern: "fbhd", react: "⬇", filename: __filename }, async(conn, mek, m,{from, q, reply}) => {
try{
 const result = await facebook(q)
 await conn.sendMessage(from, { video: { url: result.result.links.HD }, mimetype: "video/mp4", caption: BOT_FOOTER }, { quoted: mek })  
}catch(e){ reply(`Error !!\n\n*${e}*`) }
})

cmd({ pattern: "fba", react: "⬇", filename: __filename }, async(conn, mek, m,{from, q, reply}) => {
try{
 const result = await facebook(q)
 await conn.sendMessage(from, { audio: { url: result.result.links.HD }, mimetype: "audio/mpeg" }, { quoted: mek })
}catch(e){ reply(`Error !!\n\n*${e}*`) }
})

// ===== 18+ PART =====
async function xnxxs(query) {
    return new Promise((resolve, reject) => {
      const baseurl = 'https://www.xnxx.com';
      fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'}).then((res) => res.text()).then((res) => {
        const $ = cheerio.load(res, {xmlMode: false});
        const title = []; const url = []; const desc = []; const results = [];
        $('div.mozaique').each(function(a, b) { $(b).find('div.thumb').each(function(c, d) { url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/')); }); });
        $('div.mozaique').each(function(a, b) { $(b).find('div.thumb-under').each(function(c, d) { desc.push($(d).find('p.metadata').text()); $(d).find('a').each(function(e, f) { title.push($(f).attr('title')); }); }); });
        for (let i = 0; i < title.length; i++) { results.push({title: title[i], info: desc[i], link: url[i]}); }
        resolve({status: true, result: results});
      }).catch((err) => reject({status: false, result: err}));
    });
}

cmd({
    pattern: "xnxxdown",
    react: "🫣",
    alias: ["xnxxsearch"],
    desc: "Search xnxx",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, prefix, sender, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
      const premiumUsers = await getPremiumUsers();
      if (!premiumUsers.includes(sender)) return reply(msr.pre_cmd);
      if (!q) return reply("Please provide a search term!");
      const searchResults = await xnxxs(q);
      let txt = `*${BOT_NAME} XNXX DOWNLOADER*\n\n🫣 *Results* for: *${q}*\n\n`
      searchResults.result.slice(0,10).forEach((v,i)=>{ txt += `${i+1}. ${v.title}\n${prefix}xnxxdl ${v.link}\n\n` })
      await conn.sendMessage(from, { text: txt + BOT_FOOTER }, { quoted: mek })
} catch (e) { console.log(e); reply('*ERROR !!*') }
})

async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
      };
      resolve({status: true, result: {title, URL, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

cmd({
    pattern: "xnxxdl",
    alias: ["dlxnxx"],
    react: '🫣',
    desc: "Download xnxx videos",
    filename: __filename
}, async(conn, mek, m,{from, q, sender, reply}) => {
try{
  if (!q) return reply('*Please give me url !!*')
  const premiumUsers = await getPremiumUsers();
  if (!premiumUsers.includes(sender)) return reply("*Premium Only*");
  let res = await xdl(q)
  await conn.sendMessage(from, { video: { url: res.result.files.high }, caption: `${res.result.title}\n\n${BOT_FOOTER}`}, { quoted: mek })
} catch (e) { reply('*Error !!*'); console.log(e) }
})

const apilink = 'https://dark-yasiya-api-new.vercel.app'

cmd({
    pattern: "xvs",
    react: "🫣",
    alias: ["xvideossearch"],
    desc: "Search xvideos",
    category: "download",
    filename: __filename
  }, async (conn, mek, m, { from, prefix, q, sender, reply }) => {
    try{
    const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
    const premiumUsers = await getPremiumUsers();
    if (!premiumUsers.includes(sender)) return reply(msr.pre_cmd);
    if (!q) return reply("Please provide a search term!");
    const searchResults = await fetchJson(`${apilink}/search/xvideo?q=${q}`)
    if (!searchResults || searchResults.result.length === 0) return await reply("No results found!");
    let txt = `*${BOT_NAME} XVIDEO DOWNLOADER*\n\n🫣 *Results* for: *${q}*\n\n`
    searchResults.result.slice(0,10).forEach((v,i)=>{ txt += `${i+1}. ${v.title}\n${prefix}xvdown ${v.url}\n\n` })
    await conn.sendMessage(from, { text: txt + BOT_FOOTER }, { quoted: mek })
} catch (e) { console.log(e); reply('*ERROR !!*') }
})

cmd({
    pattern: "xvdown",
    alias: ["dlxv","xvdl"],
    react: '🫣',
    desc: "Download xvideos",
    filename: __filename
  }, async(conn, mek, m,{from, q, sender, reply}) => {
  try{
  if (!q) return reply('*Please give me url !!*')
  const premiumUsers = await getPremiumUsers();
  if (!premiumUsers.includes(sender)) return reply("*Premium Only*");
  let xv_info = await fetchJson(`${apilink}/download/xvideo?url=${q}`)
  const msg = `🔞 *XVIDEO DOWNLOADER* 🔞\n\n• *Title* - ${xv_info.result.title}\n• *Views* - ${xv_info.result.views}\n\n${BOT_FOOTER}`
  await conn.sendMessage(from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })
  await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title+".mp4" }, { quoted: mek });
  } catch (e) { reply('*Error !!*'); console.log(e) }
})