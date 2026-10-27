const config = require('../config')
const {cmd , commands} = require('../command')
const {fetchJson} = require('../lib/functions')

cmd({
    pattern: "ai",
    desc: "CLOWN-MD AI Chat",
    category: "ai",
    use: '.ai < Text >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("🤡 *CLOWN-MD AI*\n\nMokak ahanna one kiyala type karapan machan!\n\n*Ex:* .ai who is clown md\n*Ex:* .ai write a love letter")

await conn.sendMessage(from, { react: { text: "🤖", key: mek.key } })

// Try main API
try{
let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(q)}`)

if(data?.data && data.data !== ""){
return await reply(`🤡 *CLOWN-MD AI*\n\n${data.data}\n\n> POWERED by CLOWN-MD`)
}
}catch(e){}

 // Backup API if first fails
try{
let data2 = await fetchJson(`https://api.ryzendesu.vip/api/ai/openai?text=${encodeURIComponent(q)}`)
if(data2?.result){
return await reply(`🤡 *CLOWN-MD AI*\n\n${data2.result}\n\n> POWERED by CLOWN-MD`)
}
}catch(e){}

return reply("🤖 AI busy machan, tikak inn dala try karapan! 🤡")

}catch(e){
console.log(e)
reply(`❌ Error: ${e.message} 🤡`)
}
})