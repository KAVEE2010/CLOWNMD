const { cmd } = require('../command')
const fs = require('fs');
const path = require('path');
const config = require('../config')

const BOT_NAME = "CLOWN-MD"
const BOT_PACK = `${BOT_NAME} 🤡`

// ===== CLOWN-MD ALL AUTO FUNCTIONS - 1 HANDLER =====
cmd({
  on: "body"
}, async (conn, mek, m, { from, body, isOwner }) => {
    try{
        if(!body) return
        const lowerBody = body.toLowerCase().trim()

        // 1. AUTO VOICE
        if(config.AUTO_VOICE === 'true' && !isOwner){
            try{
                const filePath = path.join(__dirname, '../data/autovoice.json');
                if(fs.existsSync(filePath)){
                    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    for (const text in data) {
                        if (lowerBody === text.toLowerCase()) {
                            await conn.sendPresenceUpdate('recording', from);
                            await conn.sendMessage(from, { audio: { url: data[text] }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
                            break;
                        }
                    }
                }
            }catch{}
        }

        // 2. AUTO STICKER
        if(config.AUTO_STICKER === 'true' && !isOwner){
            try{
                const filePath = path.join(__dirname, '../data/autosticker.json');
                if(fs.existsSync(filePath)){
                    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    for (const text in data) {
                        if (lowerBody === text.toLowerCase()) {
                            await conn.sendMessage(from,{sticker: { url : data[text]}, package: BOT_PACK },{ quoted: mek })
                            break;
                        }
                    }
                }
            }catch{}
        }

        // 3. AUTO REPLY
        if(config.AUTO_REPLY === 'true' && !isOwner){
            try{
                const filePath = path.join(__dirname, '../data/autoreply.json');
                if(fs.existsSync(filePath)){
                    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    for (const text in data) {
                        if (lowerBody === text.toLowerCase().trim()) {
                            let finalReply = data[text].replace(/\\n/g, '\n')
                            // Branding auto add
                            await m.reply(finalReply)
                            break;
                        }
                    }
                }
            }catch{}
        }

        // 4. AUTO RECORDING
        if(config.RECORDING === 'true' && !isOwner){
            await conn.sendPresenceUpdate('recording', from);
        }

        // 5. AUTO REACT
        if(config.AUTO_REACT === 'true' && !isOwner){
            await conn.sendMessage(from, { react: { text: '🌹', key: mek.key } });
        }

    }catch(e){ console.log(e) }
});