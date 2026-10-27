const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    getContentType,
    fetchLatestBaileysVersion,
    Browsers,
    jidNormalizedUser,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = require('@whiskeysockets/baileys')

const { getBuffer, getGroupAdmins, getRandom, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const { sms } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
var { updateCMDStore, isbtnID, getCMDStore, getCmdForCmdId, connectdb, input, get, updb } = require("./lib/asitha")

// ===== CLOWN-MD BRANDING =====
const BOT_NAME = "CLOWN-MD"
const CHANNEL_JID = "120363414424834083@newsletter"
const CHANNEL_NAME = "CLOWN-MD OFFICIAL"
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n"
const FOOTER = "> POWERED by CLOWN-MD 🤡"
const LOGO = "https://i.postimg.cc/xyz/clown.jpg"
const OWNER_NUM = config.OWNER_NUMBER || "94704296653"

console.log(`🤡 Starting ${BOT_NAME}...`)

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if(!config.SESSION_ID) return console.log('❌ Please add SESSION_ID in .env !!')
    try {
        // Support both CLOWN-MD= and ASITHA-MD= prefix
        let sessdata = config.SESSION_ID.includes("=") ? config.SESSION_ID.split("=")[1] : config.SESSION_ID;
        const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
        filer.download((err, data) => {
            if(err) throw err
            fs.writeFile(__dirname + '/session/creds.json', data, () => {
                console.log("✅ Session downloaded")
            })
        })
    } catch(e) { console.log("Session error:", e) }
}

const express = require("express");
const app = express();
const port = process.env.PORT || 7860;

async function connectToWA() {
console.log(`Connecting ${BOT_NAME} 🧬...`);
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
var { version } = await fetchLatestBaileysVersion()

const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Firefox"),
        syncFullHistory: true,
        auth: state,
        version
        })
    
conn.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
    if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA()
    }
} else if (connection === 'open') {
console.log(`😼 ${BOT_NAME} Plugins Installing... `)
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
    if (path.extname(plugin).toLowerCase() == ".js") {
        require("./plugins/" + plugin);
    }
});
console.log('✅ Plugins installed')
await connectdb();
await updb();
console.log('✅ Bot connected to whatsapp')

const prefix = config.PREFIX

let up = `*${BOT_NAME} connected ✅*

*PREFIX:* ${prefix}
*MODE:* ${config.MODE}
*OWNER:* ${OWNER_NUM}

${FOOTER}
${CHANNEL_URL}`

await conn.sendMessage(OWNER_NUM + "@s.whatsapp.net", { image: { url: LOGO }, caption: up })

// News service optional
try {
    const { startNewsService } = require('./plugins/plugins_main');    
    const nsjid = config.NEWS_JID;
    if(nsjid) startNewsService(conn, nsjid);
} catch(e) {}
}
})

conn.ev.on('creds.update', saveCreds)  

conn.ev.on('messages.upsert', async(mek) => {
if (config.ALLWAYS_OFFLINE === "true" && mek.key && mek.key.remoteJid !== 'status@broadcast') {
    await conn.readMessages([mek.key]);
}
mek = mek.messages[0]
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
    await conn.readMessages([mek.key])
}

// Anti-delete alert
conn.ev.on('messages.update', async (update) => {
    for (const event of update) {
        if (event.update === 'message-revoke-everyone') {
            const { remoteJid, key } = event;
            try {
                const message = await conn.loadMessage(remoteJid, key.id).catch(() => null);
                if (!message) return;
                const sender = message.participant || key.participant || remoteJid;
                const text = message.message?.conversation || message.message?.extendedTextMessage?.text || "Deleted a message";
                await conn.sendMessage(remoteJid, {
                    text: `💬 *Message Deleted!*\n👤 From: @${sender.split('@')[0]}\n📄 Message: ${text}\n\n${FOOTER}`,
                    mentions: [sender]
                })
            } catch {}
        }
    }
});

const prefix = config.PREFIX;
const m = sms(conn, mek)
const type = getContentType(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type == 'interactiveResponseMessage' ) ? mek.message.interactiveResponseMessage  && mek.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :(type == 'templateButtonReplyMessage' )? mek.message.templateButtonReplyMessage && mek.message.templateButtonReplyMessage.selectedId  : (type === 'conversation') ? mek.message.conversation : mek.message?.extendedTextMessage?.contextInfo?.hasOwnProperty('quotedMessage') &&
await isbtnID(mek.message?.extendedTextMessage?.contextInfo?.stanzaId) &&
getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text)
? getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text) : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'No Name'
const isMe = botNumber?.includes(senderNumber)	
const isOwner = botNumber?.includes(senderNumber) || senderNumber === OWNER_NUM
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins?.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins?.includes(sender) : false
const isReact = m.message.reactionMessage ? true : false
const reply = (teks) => { conn.sendMessage(from, { text: teks }, { quoted: mek }) }

// Button handler - CLOWN-MD style
const NON_BUTTON = true
conn.buttonMessage = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) { await conn.sendMessage(jid, msgData) }
  else {
    let result = ""; const CMD_ID_MAP = []
    msgData.buttons.forEach((button, bttnIndex) => {
        const mainNumber = `${bttnIndex + 1}`;
        result += `\n*${mainNumber} | ${button.buttonText.displayText}*\n`;
        CMD_ID_MAP.push({ cmdId: mainNumber, cmd: button.buttonId });
    });
    const buttonMessage = `${msgData.caption || msgData.text}\n\n🔢 Reply below number,\n${result}\n\n${msgData.footer || FOOTER}`
    const textmsg = await conn.sendMessage(from, { text: buttonMessage, contextInfo: { 
        mentionedJid: [m.sender], forwardingScore: 999, isForwarded: true, 
        forwardedNewsletterMessageInfo: { newsletterJid: CHANNEL_JID, newsletterName: CHANNEL_NAME, serverMessageId: 999 }
    }}, { quoted: quotemek || mek })
    await updateCMDStore(textmsg.key.id, CMD_ID_MAP);
  }
}

conn.listMessage = async (jid, msgData, quotemek) => {
    let result = ""; const CMD_ID_MAP = []
    msgData.sections.forEach((section, sectionIndex) => {
        const mainNumber = `${sectionIndex + 1}`;
        result += `\n*[${mainNumber}] ${section.title}*\n`;
        section.rows.forEach((row, rowIndex) => {
            const subNumber = `${mainNumber}.${rowIndex + 1}`;
            result += `   ⭕ *${subNumber} ||* ${row.title}\n`;
            CMD_ID_MAP.push({ cmdId: subNumber, cmd: row.rowId });
        });
    });
    const listMessage = `${msgData.text}\n\n${msgData.buttonText}\n${result}\n${msgData.footer || FOOTER}\n`
    const text = await conn.sendMessage(from, { text: listMessage, contextInfo: { 
        mentionedJid: [m.sender], forwardingScore: 999, isForwarded: true,
        forwardedNewsletterMessageInfo: { newsletterJid: CHANNEL_JID, newsletterName: CHANNEL_NAME, serverMessageId: 999 }
    }}, { quoted: quotemek || mek})
    await updateCMDStore(text.key.id, CMD_ID_MAP);
}

// Forward & file helpers
conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
    let mtype = Object.keys(message.message)[0]
    let content = await generateForwardMessageContent(message, forceForward)
    let ctype = Object.keys(content)[0]
    let context = message.message[mtype].contextInfo || {}
    content[ctype].contextInfo = { ...context, ...content[ctype].contextInfo }
    const waMessage = await generateWAMessageFromContent(jid, content, options)
    await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
    return waMessage
}

conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    let mime = ''; let res = await axios.head(url); mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted })
    let type = mime.split("/")[0] + "Message"
    if (mime === "application/pdf") return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted })
    if (mime.split("/")[0] === "image") return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted })
    if (mime.split("/")[0] === "video") return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted })
    if (mime.split("/")[0] === "audio") return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted })
}

if(isCmd && config.READ_CMD === "true" && config.ALLWAYS_OFFLINE === "false") {
    await conn.readMessages([mek.key])
}

// ========== WORK TYPE ==========
if(!isOwner && config.MODE === "private") return 
if(!isOwner && isGroup && config.MODE === "inbox") return 
if(!isOwner && !isGroup && config.MODE === "groups") return 

// ========== PLUGIN MAP ==========
const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
    const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    if (cmd) {
        if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
        try {
            cmd.function(conn, mek, m, { from, prefix, quoted, body, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
        } catch (e) { console.error("[PLUGIN ERROR] ", e); }
    }
}
events.commands.map(async (command) => {
    if (body && command.on === "body") {
        command.function(conn, mek, m, { from, prefix, quoted, body, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply })
    }
});

// ========== ANTI-LINK / BAD / BOT ==========
if (config.ANTI_LINK == "true"){
    if (!isOwner && isGroup && isBotAdmins ) {   
        if (body.match(`chat.whatsapp.com`)) {
            if (isMe) return
            if(groupAdmins.includes(sender)) return
            await conn.sendMessage(from, { delete: mek.key })  
        }
    }
}

if (config.ANTI_BOT == "true"){
    if ( isGroup && !isAdmins && !isMe && !isOwner && isBotAdmins ) {
        if ( mek.key.id.startsWith("BAE") || mek.key.id.startsWith("QUEENAMDI") ) {
            await conn.sendMessage(from, { text: `❌ *Bot Detected* Removed by ${BOT_NAME} ❗` })
            await conn.sendMessage(from, { delete: mek.key })
            await conn.groupParticipantsUpdate(from,[sender], 'remove')
        }
    }
}

})
}

app.get("/", (req, res) => { res.send(`${BOT_NAME} started ✅ ${FOOTER}`); });
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
setTimeout(() => { connectToWA() }, 4000);