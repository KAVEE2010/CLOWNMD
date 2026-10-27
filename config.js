const fs = require('fs');

// Load .env first - SECURE
if (fs.existsSync('.env')) require('dotenv').config({ path: './.env' });
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

// ===== CLOWN-MD SECURE CONFIG =====
// TOKEN NEVER HARDCODE - ONLY FROM .env
const envv2 = (() => {
    try { return require('./config-db') } catch { return {} }
})();

module.exports = {
// ===== SECRETS - FROM ENV ONLY =====
SESSION_ID: process.env.SESSION_ID || envv2.SESSION_ID || "",
GITHUB_USERNAME: process.env.GITHUB_USERNAME || envv2.GITHUB_USERNAME || "",
GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN || envv2.GITHUB_AUTH_TOKEN || "",

// ===== CLOWN-MD BRANDING =====
BOT_NAME: "CLOWN-MD",
OWNER_NAME: "CLOWN",
OWNER_NUMBER: process.env.OWNER_NUMBER || "94704296653",
CHANNEL_JID: "120363414424834083@newsletter",
CHANNEL_NAME: "CLOWN-MD OFFICIAL ",
CHANNEL_URL: "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n",
FOOTER: "> POWERED by CLOWN-MD 🤡",
BOT_LOGO: process.env.ALIVE_IMG || "https://i.ibb.co/xyz/clown.jpg",

// ===== BOT SETTINGS =====
PREFIX: process.env.PREFIX || ".",
MODE: process.env.MODE || "public",
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/xyz/clown.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "🤡 *CLOWN-MD ALIVE!*\n\n> POWERED by CLOWN-MD",

AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS || "true"),
AUTO_REACT: convertToBool(process.env.AUTO_REACT || "false"),
AUTO_REPLY: convertToBool(process.env.AUTO_REPLY || "false"),
AUTO_VOICE: convertToBool(process.env.AUTO_VOICE || "false"),
AUTO_STICKER: convertToBool(process.env.AUTO_STICKER || "false"),
ANTI_BAD: convertToBool(process.env.ANTI_BAD || "false"),
ANTI_LINK: convertToBool(process.env.ANTI_LINK || "false"),
ANTI_BOT: convertToBool(process.env.ANTI_BOT || "false"),

// ===== API KEYS - FROM ENV =====
WEATHER_API: process.env.WEATHER_API || "",
NEWS_API: process.env.NEWS_API || "",
GOOGLE_API: process.env.GOOGLE_API || "",
GOOGLE_CX: process.env.GOOGLE_CX || "",
OMDB_API: process.env.OMDB_API || "",
};