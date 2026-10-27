const config = require('../config')
const { cmd } = require('../command')
const { get, input } = require("../lib/asitha")

// ===== CLOWN-MD =====
const BOT_NAME = "CLOWN-MD"
const CHANNEL_JID = "120363414424834083@newsletter"
const CHANNEL_NAME = "CLOWN-MD OFFICIAL "
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
const BOT_LOGO = "https://i.ibb.co/xyz/logo.jpg"
// ====================

cmd({
    pattern: "apply",
    react: "🛡️",
    alias: ["add",'set'],
    desc: "Apply settings",
    category: "owner",
    filename: __filename
}, async(conn, mek, m, { from, prefix, q, isMe, reply }) => {
    try {
        if (!isMe) return reply("Owner only")
        if(!q) return reply("Text denna: .apply hello")

        const buttons = [
          {buttonId: prefix + 'prefix ' + q, buttonText: {displayText: ' SET PREFIX'}, type: 1},
          {buttonId: prefix + 'alivemessage ' + q, buttonText: {displayText: ' ALIVE MSG'}, type: 1},
          {buttonId: prefix + 'newsjid ' + q, buttonText: {displayText: ' NEWS JID'}, type: 1}
        ]

        await conn.buttonMessage(from, {
            image: { url: BOT_LOGO },
            caption: `*「 ${BOT_NAME} APPLY 」*\n\n*Input:* ${q}\n\n${FOOTER}`,
            footer: FOOTER,
            buttons: buttons,
            headerType: 1
        }, mek)
    } catch (e) { reply(`${e}`) }
})

cmd({
    pattern: "setting",
    react: "🛡️",
    alias: ["settings",'botsetting'],
    desc: "Bot settings panel",
    category: "owner",
    filename: __filename
}, async(conn, mek, m, { from, prefix, isMe, reply }) => {
    try {
        if (!isMe) return reply("❌ Owner only")

        const sections = [
            { title: 'MODE', rows: [
                {title: 'PUBLIC', rowId: prefix + 'mode public'},
                {title: 'PRIVATE', rowId: prefix + 'mode private'},
                {title: 'GROUPS', rowId: prefix + 'mode groups'},
                {title: 'INBOX', rowId: prefix + 'mode inbox'}
            ]},
            { title: 'AUTO READ STATUS', rows: [
                {title: 'True', rowId: prefix + 'autoreadsratus true'},
                {title: 'False', rowId: prefix + 'autoreadsratus false'}
            ]},
            { title: 'AUTO REPLY', rows: [
                {title: 'True', rowId: prefix + 'autoreply true'},
                {title: 'False', rowId: prefix + 'autoreply false'}
            ]},
            { title: 'AUTO VOICE', rows: [
                {title: 'True', rowId: prefix + 'autovoice true'},
                {title: 'False', rowId: prefix + 'autovoice false'}
            ]},
            { title: 'AUTO STICKER', rows: [
                {title: 'True', rowId: prefix + 'autosticker true'},
                {title: 'False', rowId: prefix + 'autosticker false'}
            ]},
            { title: 'ANTI BAD', rows: [
                {title: 'True', rowId: prefix + 'antibad true'},
                {title: 'False', rowId: prefix + 'antibad false'}
            ]},
            { title: 'ANTI LINK', rows: [
                {title: 'True', rowId: prefix + 'antilink true'},
                {title: 'False', rowId: prefix + 'antilink false'}
            ]},
            { title: 'ANTI BOT', rows: [
                {title: 'True', rowId: prefix + 'antibot true'},
                {title: 'False', rowId: prefix + 'antibot false'}
            ]},
            { title: 'ALLWAYS OFFLINE', rows: [
                {title: 'True', rowId: prefix + 'alwaysoffline true'},
                {title: 'False', rowId: prefix + 'alwaysoffline false'}
            ]},
            { title: 'READ CMD', rows: [
                {title: 'True', rowId: prefix + 'readcommand true'},
                {title: 'False', rowId: prefix + 'readcommand false'}
            ]},
            { title: 'AUTO REACT', rows: [
                {title: 'True', rowId: prefix + 'autoreact true'},
                {title: 'False', rowId: prefix + 'autoreact false'}
            ]},
            { title: 'RECORDING', rows: [
                {title: 'True', rowId: prefix + 'recording true'},
                {title: 'False', rowId: prefix + 'recording false'}
            ]},
            { title: 'BAD BLOCK', rows: [
                {title: 'True', rowId: prefix + 'badno true'},
                {title: 'False', rowId: prefix + 'badno false'}
            ]}
        ]
	    
        await conn.listMessage(from, {
            text: `*「 ${BOT_NAME} SETTINGS 」*\n\n${FOOTER}`,
            footer: FOOTER,
            title: `${BOT_NAME} Panel`,
            buttonText: 'Select Setting',
            sections
        }, mek)
    } catch (e) { console.log(e); reply('ERROR') }
})

// ONE FUNCTION FOR ALL SETTINGS - NO REPEAT
async function setSetting(key, q, isMe, reply, successMsg){
    if (!isMe) return await reply("Owner only")
    if(!q) return reply("Value denna")
    let gett = await get(key)
    if(gett === q) return await reply("*Already set*")
    await input(key, q)
    await reply(`*${successMsg}: ${q}*\n${FOOTER}`)
}

cmd({ pattern: "prefix", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("PREFIX", q, isMe, reply, "PREFIX updated") })
cmd({ pattern: "alivemessage", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("ALIVE_MSG", q, isMe, reply, "ALIVE MSG updated") })
cmd({ pattern: "mode", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("MODE", q, isMe, reply, "MODE updated") })
cmd({ pattern: "autoreply", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("AUTO_REPLY", q, isMe, reply, "AUTO REPLY updated") })
cmd({ pattern: "autoreadsratus", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("AUTO_READ_STATUS", q, isMe, reply, "READ STATUS updated") })
cmd({ pattern: "autovoice", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("AUTO_VOICE", q, isMe, reply, "AUTO VOICE updated") })
cmd({ pattern: "autosticker", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("AUTO_STICKER", q, isMe, reply, "AUTO STICKER updated") })
cmd({ pattern: "antibad", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("ANTI_BAD", q, isMe, reply, "ANTI BAD updated") })
cmd({ pattern: "antilink", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("ANTI_LINK", q, isMe, reply, "ANTI LINK updated") })
cmd({ pattern: "antibot", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("ANTI_BOT", q, isMe, reply, "ANTI BOT updated") })
cmd({ pattern: "alwaysoffline", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("ALLWAYS_OFFLINE", q, isMe, reply, "OFFLINE updated") })
cmd({ pattern: "readcommand", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("READ_CMD", q, isMe, reply, "READ CMD updated") })
cmd({ pattern: "autoreact", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("AUTO_REACT", q, isMe, reply, "AUTO REACT updated") })
cmd({ pattern: "recording", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("RECORDING", q, isMe, reply, "RECORDING updated") })
cmd({ pattern: "newsjid", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("NEWS_JID", q, isMe, reply, "NEWS JID updated") })
cmd({ pattern: "badno", dontAddCommandList: true, filename: __filename }, async(conn, mek, m, {q, isMe, reply}) => { await setSetting("BAD_NO_BLOCK", q, isMe, reply, "BAD BLOCK updated") })