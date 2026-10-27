const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');

// ===== CLOWN-MD =====
const BOT_NAME = "CLOWN-MD"
const CHANNEL_JID = "120363414424834083@newsletter"
const CHANNEL_NAME = "🤡 CLOWN-MD OFFICIAL ࿐"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
// ====================

cmd({
    pattern: "weather",
    desc: "🌤 Get weather",
    react: "🌤",
    category: "other",
    use: '.weather colombo',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ City eka denna: .weather Colombo");

        // UBE API KEY DAPAN - openweathermap.org eken free ganna
        const apiKey = config.WEATHER_API || '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weather = `🌍 *Weather - ${data.name}, ${data.sys.country}* 🌍
*╭──────────────●●►*
*│🌡️ Temp:* ${data.main.temp}°C
*│🌡️ Feels:* ${data.main.feels_like}°C
*│🌡️ Min/Max:* ${data.main.temp_min}°C / ${data.main.temp_max}°C
*│💧 Humidity:* ${data.main.humidity}%
*│☁️ Weather:* ${data.weather[0].main}
*│🌫️ Desc:* ${data.weather[0].description}
*│💨 Wind:* ${data.wind.speed} m/s
*│🔽 Pressure:* ${data.main.pressure} hPa
*╰──────────────●●►*

${FOOTER}
`;

        return reply(weather);
    } catch (e) {
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found!");
        }
        return reply("⚠️ Weather error - API key check karapan");
    }
});

// ===== DANGER COMMANDS - OWNER ONLY + LIMIT =====
cmd({
    pattern: "bb",
    react: "✔️",
    dontAddCommandList : true ,
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, q, isOwner, reply}) => {
try{
    if(!isOwner) return reply("*Owner Only*")
    if (!q || !q.includes(" & ") ) return reply('*Use: .bb 94xxxxxxxxx@s.whatsapp.net & 5*\n*Msg reply karapan*')
    if (!m.quoted) return reply('*Reply to a msg*')
    
    const data = q.split(" & ")[0] 
    const count = parseInt(q.split(" & ")[1])
    if(count > 10) return reply("*Limit 10* - Spam nisa ban wenawa!")

    let i = 0
    while (i < count) {
        await conn.sendMessage(data, { text : m.quoted.text || m.quoted.msg } )
        i++
    }
    reply(`*Sent to ${data} - ${count} times* ${FOOTER}`)
} catch (e) {
    reply('❗ Error ' + e )
}
})

cmd({
    pattern: "boom",
    desc: "forward msgs",
    alias: ["bbb"],
    category: "owner",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isOwner, reply }) => {
    if (!isOwner) return reply("*Owner Only ❌*")
    if (!q || !m.quoted) return reply("*Reply + .boom jid & count*")

    try{
        const data = q.split(" & ")[0] 
        const count = parseInt(q.split(" & ")[1])
        if(count > 10) return reply("*Limit 10* - Ban risk!")

        let message = {}
        message.key = mek.quoted?.fakeObj?.key;
        if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
            let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype
            const mimeType = require('mime-types');
            let ext = mimeType.extension(mime);		    
            mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = (mek.quoted.documentWithCaptionMessage.message.documentMessage.caption || "file") + "." + ext;
        }
        message.message = mek.quoted;

        let i = 0
        while (i < count) {
            await conn.forwardMessage(data, message, false)
            i++
        }
        return reply(`*${BOT_NAME} Boom to: ${data} x${count}* ${FOOTER}`)
    }catch(e){ reply(`Error: ${e}`) }
})