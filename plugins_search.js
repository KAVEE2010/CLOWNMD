const axios = require('axios');
const { cmd } = require('../command')
const config = require('../config');
const Esana = require('@sl-code-lords/esana-news');
const { fetchJson } = require('../lib/functions')

// ===== CLOWN-MD =====
const BOT_NAME = "CLOWN-MD"
const CHANNEL_JID = "120363414424834083@newsletter"
const CHANNEL_NAME = "CLOWN-MD OFFICIAL"
const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n"
const FOOTER = `> POWERED by ${BOT_NAME} 🤡`
// ====================

var api = new Esana()

cmd({
    pattern: "wiki",
    desc: "Wikipedia search",
    category: "search",
    use: '.wiki lion',
    react: "📚",
    filename: __filename
}, async(conn, mek, m, {from, q, reply}) => {
    try {
        if (!q) return reply('Search term denna: .wiki Colombo');
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
        const response = await axios.get(url);
        const { extract, title } = response.data;
        const message = `📚 *${title}*\n\n${extract}\n\n${CHANNEL_URL}\n\n${FOOTER}`;
        return await conn.sendMessage(from, { 
            text: message,
            contextInfo: {
                forwardedNewsletterMessageInfo: {
                    newsletterJid: CHANNEL_JID,
                    newsletterName: CHANNEL_NAME,
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });
    } catch (e) { reply('Wiki not found'); }
})

cmd({
    pattern: "esananews",
    react: '🎙️',
    desc: "Esana news",
    category: "search",
    filename: __filename
}, async(conn, mek, m,{from, q}) => {
try{
    const latst = await api.latest_id();
    const nws = latst.results.news_id
    let nn = q || nws
    const ress = await api.news(nn);
    const res = ress.results;
    await conn.sendMessage(from, {
        image: {url: res.COVER},
        caption: `\n*┃◉ TITLE:* ${res.TITLE}\n*┃◉ DATE:* ${res.PUBLISHED}\n*┃◉ URL:* ${res.URL}\n\n${res.DESCRIPTION}\n\n${CHANNEL_URL}\n\n${FOOTER}`
    }, { quoted: mek });
} catch (e) { console.log(e) }
})       

cmd({
    pattern: "news",
    desc: "Latest headlines",
    category: "search",
    react: "📰",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const apiKey = config.NEWS_API || "0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;
        if (!articles.length) return reply("No news found.");
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `📰 *${article.title}*\n_${article.description}_\n🔗 ${article.url}\n\n${FOOTER}`;
            if (article.urlToImage) {
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                await conn.sendMessage(from, { text: message });
            }
        };
    } catch (e) { reply("News API error - check key"); }
});

cmd({
    pattern: "img",
    desc: "Google image search",
    react: "🖼️",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Query denna: .img cat");
        const GOOGLE_API_KEY = config.GOOGLE_API || 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU';
        const GOOGLE_CX = config.GOOGLE_CX || '45b94c5cef39940d1';
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        const response = await axios.get(url);
        const data = response.data;
        if (!data.items || data.items.length === 0) return reply("No images found");

        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;
            try{
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(imageResponse.data, 'binary');
                await conn.sendMessage(from, {
                    image: buffer,
                    caption: `*${q} - Image ${i + 1}*\n*${BOT_NAME} IMG*\n\n${FOOTER}`
                }, { quoted: mek });
            }catch{}
        }
    } catch (e) { reply(`Error: ${e.message}`); }
});

cmd({
    pattern: "movie",
    desc: "Movie info",
    category: "search",
    use: '.movie avatar',
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("📽️ Movie name denna: .movie John Wick");
        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(q)}&apikey=${config.OMDB_API || '76cb7f39'}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        if (data.Response === "False") return reply("🚫 Movie not found");

        const movieInfo = `🎬 *${data.Title}* (${data.Year})\n\n*Rated:* ${data.Rated}\n*Runtime:* ${data.Runtime}\n*Genre:* ${data.Genre}\n*Director:* ${data.Director}\n*Actors:* ${data.Actors}\n\n*Plot:* ${data.Plot}\n\n*IMDB:* ${data.imdbRating} ⭐\n\n${CHANNEL_URL}\n\n${FOOTER}`;
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: movieInfo
        }, { quoted: mek });
    } catch (e) { reply(`❌ ${e.message}`); }
});

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api'

cmd({
    pattern: "hirunews",
    alias: ["hiru","news1"],
    react: "⭐",
    category: "search",
    filename: __filename
}, async(conn, mek, m,{from}) => {
try{
    const news = await fetchJson(`${apilink}/hiru`)
    const msg = `⭐ *HIRU NEWS - ${BOT_NAME}*\n\n*${news.result.title}*\n\n${news.result.desc}\n\n*Link:* ${news.result.url}\n\n${CHANNEL_URL}\n\n${FOOTER}`
    await conn.sendMessage(from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) { console.log(e) }
})

cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "🔺",
    category: "search",
    filename: __filename
}, async(conn, mek, m,{from}) => {
try{
    const news = await fetchJson(`${apilink}/sirasa`) 
    const msg = `🔺 *SIRASA NEWS - ${BOT_NAME}*\n\n*${news.result.title}*\n\n${news.result.desc}\n\n*Link:* ${news.result.url}\n\n${CHANNEL_URL}\n\n${FOOTER}`
    await conn.sendMessage(from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) { console.log(e) }
})

cmd({
    pattern: "derananews",
    alias: ["derana","news3"],
    react: "📑",
    category: "search",
    filename: __filename
}, async(conn, mek, m,{from}) => {
try{
    const news = await fetchJson(`${apilink}/derana`)
    const msg = `📑 *DERANA NEWS - ${BOT_NAME}*\n\n*${news.result.title}*\n\n${news.result.desc}\n*Date:* ${news.result.date}\n*Link:* ${news.result.url}\n\n${CHANNEL_URL}\n\n${FOOTER}`
    await conn.sendMessage(from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) { console.log(e) }
})