const os = require('os')
const { cmd, commands } = require('../command')
const { runtime } = require('../lib/functions')
const config = require('../config')

// ===== CLOWN-MD BRANDING - FINAL =====
const BOT_NAME = "CLOWN-MD"
const CHANNEL_JID = "120363414424834083@newsletter" // UBE REAL JID ✅
const CHANNEL_NAME = "🤡 CLOWN-MD OFFICIAL ࿐"
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
const BOT_LOGO = "https://i.ibb.co/xyz/your-logo.jpg" // OYAGE LOGO
// =====================================

// Common function - code repeat na
async function sendMenu(conn, from, mek, pushname, categoryName, emoji) {
  let pp = ''
  for (let i=0; i<commands.length; i++) { 
    if(commands[i].category === categoryName.toLowerCase()){
      if(!commands[i].dontAddCommandList){
        pp += `*╭──────────●●►*\n*│Command:* ${config.PREFIX}${commands[i].pattern}\n*│Use:* ${commands[i].use || 'No use'}\n*╰──────────●●►*\n\n`
      }
    }
  }
  if(!pp) pp = "*No commands found*"

  let menuc = `*HELLO* ${pushname}

*╭─「 ${BOT_NAME} 」*
*│◈ RAM -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ RUNTIME -* ${runtime(process.uptime())}
*│◈ BOT -* ${BOT_NAME} 🤡
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ ${categoryName} MENU*
*╰──────────●●►*
${pp}
${FOOTER}

📢 ${CHANNEL_URL}
`

  await conn.sendMessage(from, { 
    image: { url: BOT_LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [mek.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_JID,
        newsletterName: CHANNEL_NAME,
        serverMessageId: 999
      }
    }
  }, { quoted: mek });
}

cmd({
  pattern: "menu",
  react: "📂",
  alias: ["panel","list","commands"],
  desc: "Get command list",
  category: "main",
  use: '.menu',
  filename: __filename
}, async(conn, mek, m,{from, pushname}) => {
try{
  const buttons = [
    {buttonId: config.PREFIX + 'extra' ,buttonText: {displayText: ' MOVIE'}, type: 1},
    {buttonId: config.PREFIX + 'ownermenu' , buttonText: {displayText: ' OWNER'}, type: 1},
    {buttonId: config.PREFIX + 'aimenu' , buttonText: {displayText: ' AI'}, type: 1},
    {buttonId: config.PREFIX + 'searchmenu' , buttonText: {displayText: ' SEARCH'}, type: 1},
    {buttonId: config.PREFIX + 'downloadmenu' , buttonText: {displayText: ' DOWNLOAD'}, type: 1},
    {buttonId: config.PREFIX + 'funmenu' , buttonText: {displayText: ' FUN'}, type: 1},
    {buttonId: config.PREFIX + 'mainmenu' , buttonText: {displayText: ' MAIN'}, type: 1},
    {buttonId: config.PREFIX + 'groupmenu' , buttonText: {displayText: ' GROUP'}, type: 1},
    {buttonId: config.PREFIX + 'convertmenu' , buttonText: {displayText: ' CONVERT'}, type: 1},
    {buttonId: config.PREFIX + 'othermenu' , buttonText: {displayText: ' OTHER'}, type: 1}
  ]

  let text = `*HELLO* ${pushname}

*╭─「 ${BOT_NAME} COMMANDS 」*
*│◈ RAM -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ RUNTIME -* ${runtime(process.uptime())}
*│◈ BOT -* ${BOT_NAME} 🤡
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ LIST MENU*
*│   ───────*`

  const buttonMessage = {
      image: { url: BOT_LOGO },
      caption: text,
      footer: '*╰───────────●●►*\n\n' + FOOTER + `\n\n${CHANNEL_URL}`,
      buttons: buttons,
      headerType: 2
  }
  return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) { console.log(e) }
})

// All menus - 1 line each!
cmd({ pattern: "downloadmenu", react: "📥", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "DOWNLOAD", "📥") })
cmd({ pattern: "downmenu", react: "📥", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "DOWNLOAD", "📥") })
cmd({ pattern: "extra", react: "🎥", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "EXTRA", "🎥") })
cmd({ pattern: "searchmenu", react: "🔎", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "SEARCH", "🔎") })
cmd({ pattern: "convertmenu", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "CONVERT", "🔄") })
cmd({ pattern: "othermenu", react: "👾", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "OTHER", "👾") })
cmd({ pattern: "ownermenu", react: "👨‍💻", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "OWNER", "👨‍💻") })
cmd({ pattern: "aimenu", react: "🤖", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "AI", "🤖") })
cmd({ pattern: "groupmenu", react: "🎩", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "GROUP", "🎩") })
cmd({ pattern: "mainmenu", react: "🎀", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "MAIN", "🎀") })
cmd({ pattern: "funmenu", react: "🎈", dontAddCommandList: true, filename: __filename }, async(conn, mek, m,{from, pushname}) => { await sendMenu(conn, from, mek, pushname, "FUN", "🎈") })