const { cmd } = require('../command');
const config = require('../config');
const { sleep } = require('../lib/functions')

// ===== CLOWN-MD =====
const BOT_NAME = "CLOWN-MD"
const OWNER_NAME = "KAVIDU DILAKSHANA"
const OWNER_NUM = "94704296653" // UBE NUMBER
const CHANNEL_JID = "120363414424834083@newsletter"
const CHANNEL_NAME = "CLOWN-MD OFFICIAL "
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
// ====================

// 1. Shutdown
cmd({
    pattern: "shutdown",
    desc: "Shutdown bot",
    category: "owner",
    react: "🛑",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ Owner only!");
    await reply(`🛑 *${BOT_NAME} Shutting down...*\n${FOOTER}`).then(() => process.exit());
});

// 2. Broadcast
cmd({
    pattern: "broadcast",
    desc: "Broadcast to all groups",
    category: "owner",
    alias: ["bc","bcall"],
    use: '.broadcast <msg>',
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, q, reply }) => {
    if (!isOwner) return reply("❌ Owner only!");
    if (!q) return reply("📢 Msg eka denna: .broadcast Hello");

    const groups = Object.keys(await conn.groupFetchAllParticipating());
    let count = 0
    for (const groupId of groups) {
        await conn.sendMessage(groupId, { 
            text: `📢 *${BOT_NAME} BROADCAST*\n\n${q}\n\n${CHANNEL_URL}\n\n${FOOTER}`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: CHANNEL_JID,
                    newsletterName: CHANNEL_NAME,
                    serverMessageId: 999
                }
            }
        });
        count++
        await sleep(1000) // Ban nathi wenna delay
    }
    reply(`📢 Broadcast done to ${count} groups!`);
});

// 3. Set PP - Fixed
cmd({
    pattern: "setpp",
    desc: "Set bot pp",
    category: "owner",
    use: '.setpp (reply to image)',
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ Owner only!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Image ekata reply karapan");

    try {
        const media = await conn.downloadAndSaveMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.id, { url: media });
        reply(`🖼️ PP updated! ${FOOTER}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// 4. Block
cmd({
    pattern: "block",
    desc: "Block user",
    category: "owner",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ Owner only!");
    if (!quoted) return reply("❌ User ta reply karapan");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 Blocked ${user}`);
    } catch (e) { reply(`❌ ${e.message}`) }
});

// 5. Unblock
cmd({
    pattern: "unblock",
    desc: "Unblock user",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ Owner only!");
    if (!quoted) return reply("❌ User ta reply karapan");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ Unblocked ${user}`);
    } catch (e) { reply(`❌ ${e.message}`) }
});

// 6. Clear Chats - Fixed
cmd({
    pattern: "clearchats",
    desc: "Clear all chats",
    category: "owner",
    react: "🧹",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ Owner only!");
    try {
        const chats = await conn.chatFetchAll() || [];
        for (const chat of chats) {
            await conn.modifyChat(chat.id || chat.jid, 'delete');
        }
        reply("🧹 Chats cleared!");
    } catch (e) { reply(`❌ ${e.message}`) }
});

// 7. Restart
cmd({
    pattern: "restart",
    desc: "restart bot",
    category: "owner",
    react: "♻️",
    filename: __filename
}, async(conn, mek, m,{from, isOwner, reply}) => {
    if(!isOwner) return reply(`Owner only`);
    reply(`*${BOT_NAME} Restarting...* ${FOOTER}`)
    await sleep(1500)
    require("child_process").exec("pm2 restart all")
});

// 8. Owner Contact - BRANDED ✅
cmd({
    pattern: "owner",
    desc: "owner info",
    react: "👑",
    category: "main",
    filename: __filename
}, async(conn, mek, m,{from}) => {
try{
let vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + `FN: ${OWNER_NAME} - ${BOT_NAME}\n` 
            + `ORG: ${BOT_NAME} Owner;\n` 
            + `TEL;type=CELL;type=VOICE;waid=${OWNER_NUM}:+${OWNER_NUM}\n` 
            + `URL:${CHANNEL_URL}\n`
            + 'END:VCARD'

await conn.sendMessage(from, { 
    contacts: { 
        displayName: `${OWNER_NAME}`, 
        contacts: [{ vcard }] 
    },
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: CHANNEL_JID,
            newsletterName: CHANNEL_NAME,
            serverMessageId: 999
        }
    }
}, { quoted: mek })
}catch(e){ console.log(e) }
});