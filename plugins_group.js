const config = require('../config')
const { getBuffer } = require('../lib/functions')
const { cmd } = require('../command') 

// ===== BRANDING =====
const BOT_NAME = "CLOWN-MD"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
const ONLGROUP = "*This command only for groups*"
const ADMIN = "*You need to be admin*"
const BOTADMIN = "*I need admin*"
// ====================

cmd({
  pattern: "setgroupphoto",
  alias: ["setgp"],
  desc: "Set group dp",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, { from, quoted, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply(ONLGROUP);
    if (!isBotAdmins) return reply(BOTADMIN);
    if (!isAdmins) return reply(ADMIN);
    if (!quoted || !m.quoted.imageMessage) return reply(`*Reply to an image!*`);
    const media = await conn.downloadMediaMessage(quoted);
    await conn.query({ tag: 'iq', attrs: { to: from, type: 'set', xmlns: 'w:profile:picture' },
      content: [{ tag: 'picture', attrs: { type: 'image' }, content: media }] });
    reply(`*Group dp updated!* ${FOOTER}`);
  } catch (e) { reply(`Error`); console.error(e) }
});

cmd({
  pattern: "kick",
  alias: [".."],
  desc: "Kick user",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, { from, quoted, args, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply(ONLGROUP);
    if (!isBotAdmins) return reply(BOTADMIN);
    if (!isAdmins) return reply(ADMIN);
    const user = quoted?.sender || (args[0] ? args[0]+"@s.whatsapp.net" : null)
    if (!user) return reply(`*Reply or number denna*`);
    await conn.groupParticipantsUpdate(from, [user], "remove");
    reply(`*Kicked!* ${FOOTER}`);
  } catch (e) { reply('*Done ✓*') }
});

cmd({
    pattern: "add",
    alias: ["invite"],
    desc: "Add user",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, q, isGroup, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply(ONLGROUP);
        if (!isBotAdmins) return reply(BOTADMIN);
        if (!q) return reply('Number? Ex: .add 9477xxxxxxx');
        const userToAdd = `${q.replace(/\D/g,'')}@s.whatsapp.net`;
        await conn.groupParticipantsUpdate(from, [userToAdd], "add");
        reply(`*Added ${q}* ${FOOTER}`);
    } catch (e) { reply('Add fail - number check karanna') }
});

cmd({
    pattern: "delete",
    alias: [","],
    react: "⛔",
    desc: "delete msg",
    category: "group",
    filename: __filename
}, async(conn, mek, m,{from, quoted, isGroup, reply}) => {
    try{
        if(!quoted) return reply("Reply to a msg to delete")
        const key = { remoteJid: from, fromMe: false, id: quoted.id, participant: quoted.sender }
        await conn.sendMessage(from, { delete: key })
    } catch (e) { reply('*Error*') }
});

cmd({
    pattern: "kickall",
    desc: "Kick all non-admins",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, groupMetadata, groupAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply(ONLGROUP);
        if (!isBotAdmins) return reply(BOTADMIN);
        const nonAdmin = groupMetadata.participants.filter(member => !groupAdmins.includes(member.id));
        if (nonAdmin.length === 0) return reply('No non-admins');
        for (let p of nonAdmin) { await conn.groupParticipantsUpdate(from, [p.id], "remove"); }
        reply(`*Kicked all non-admins* ${FOOTER}`);
    } catch (e) { reply('Error kickall') }
});

cmd({
    pattern: "tagall",
    react: "🔖",
    desc: "Tag all",
    category: "group",
    filename: __filename
}, async(conn, mek, m,{from, q, isGroup, isBotAdmins, isAdmins, participants, reply}) => {
try{
if (!isGroup) return reply(ONLGROUP)
if (!isBotAdmins) return reply(BOTADMIN)
if (!isAdmins) return reply(ADMIN)
let teks = `*ＧＲＯＵＰ ＮＯＴＩＦＹ - ${BOT_NAME}*\n\n*MSG : ${q ? q : 'blank'}*\n\n`
for (let mem of participants) { teks += `🔵 @${mem.id.split('@')[0]}\n` }
await conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id)})
} catch (e) { reply('Error tagall') }
});

cmd({ pattern: "tagadmin", category: "group", filename: __filename }, async (conn, mek, m, { from, isGroup, groupAdmins, reply }) => {
    try {
        if (!isGroup) return reply(ONLGROUP);
        let txt = `*Admins - ${BOT_NAME}*\n\n`;
        for (let admin of groupAdmins) { txt += `@${admin.split('@')[0]}\n`; }
        await conn.sendMessage(from, { text: txt, mentions: groupAdmins }, { quoted: mek });
    } catch (e) { reply('Error') }
});

cmd({ pattern: "mute", category: "group", filename: __filename }, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try { if (!isGroup) return reply(ONLGROUP); if (!isBotAdmins) return reply(BOTADMIN); if (!isAdmins) return reply(ADMIN);
        await conn.groupSettingUpdate(from, 'announcement'); reply(`✅ Group muted ${FOOTER}`);
    } catch (e) { reply('Error mute') }
});

cmd({ pattern: "unmute", category: "group", filename: __filename }, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try { if (!isGroup) return reply(ONLGROUP); if (!isBotAdmins) return reply(BOTADMIN); if (!isAdmins) return reply(ADMIN);
        await conn.groupSettingUpdate(from, 'not_announcement'); reply(`✅ Group unmuted ${FOOTER}`);
    } catch (e) { reply('Error unmute') }
});

cmd({ pattern: "promote", category: "group", filename: __filename }, async (conn, mek, m, { from, quoted, q, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply(ONLGROUP); if (!isBotAdmins) return reply(BOTADMIN); if (!isAdmins) return reply(ADMIN);
        let user = quoted ? quoted.sender : `${q.replace(/\D/g, '')}@s.whatsapp.net`;
        await conn.groupParticipantsUpdate(from, [user], 'promote'); reply(`✅ Promoted ${FOOTER}`);
    } catch (e) { reply('Error promote') }
});

cmd({ pattern: "demote", category: "group", filename: __filename }, async (conn, mek, m, { from, quoted, q, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply(ONLGROUP); if (!isBotAdmins) return reply(BOTADMIN); if (!isAdmins) return reply(ADMIN);
        let user = quoted ? quoted.sender : `${q.replace(/\D/g, '')}@s.whatsapp.net`;
        await conn.groupParticipantsUpdate(from, [user], 'demote'); reply(`✅ Demoted ${FOOTER}`);
    } catch (e) { reply('Error demote') }
});

cmd({ pattern: "setname", category: "group", filename: __filename }, async (conn, mek, m, { from, q, isGroup, isBotAdmins, isAdmins, reply }) => {
    try { if (!isGroup) return reply(ONLGROUP); if (!isBotAdmins) return reply(BOTADMIN); if (!isAdmins) return reply(ADMIN); if (!q) return reply("Name?")
        await conn.groupUpdateSubject(from, q); reply(`✅ Name updated to *${q}* ${FOOTER}`);
    } catch (e) { reply('Error setname') }
});

cmd({ pattern: "setdesc", category: "group", filename: __filename }, async (conn, mek, m, { from, q, isGroup, isBotAdmins, isAdmins, reply }) => {
    try { if (!isGroup) return reply(ONLGROUP); if (!isBotAdmins) return reply(BOTADMIN); if (!isAdmins) return reply(ADMIN); if (!q) return reply("Desc?")
        await conn.groupUpdateDescription(from, q); reply(`✅ Desc updated ${FOOTER}`);
    } catch (e) { reply('Error setdesc') }
});

cmd({ pattern: "invite", category: "group", filename: __filename }, async (conn, mek, m, { from, isGroup, isBotAdmins, reply }) => {
    try { if (!isGroup) return reply(ONLGROUP); if (!isBotAdmins) return reply(BOTADMIN);
        const code = await conn.groupInviteCode(from); reply(`*Invite:* https://chat.whatsapp.com/${code}\n\n${FOOTER}`);
    } catch (e) { reply('Error invite') }
});

cmd({ pattern: "join", category: "group", filename: __filename }, async (conn, mek, m, { from, q, reply }) => {
    try { if (!q) return reply("Link?"); const code = q.split('/').pop(); await conn.groupAcceptInvite(code); reply(`✅ Joined ${FOOTER}`);
    } catch (e) { reply('Join fail') }
});

cmd({ pattern: "leave", category: "group", filename: __filename }, async (conn, mek, m, { from, isGroup, reply }) => {
    try { if (!isGroup) return reply(ONLGROUP); await conn.groupLeave(from); } catch (e) { reply('Error leave') }
});