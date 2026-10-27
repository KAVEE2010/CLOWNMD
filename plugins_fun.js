const { cmd } = require('../command')
const axios = require('axios')
const cheerio = require('cheerio')
const { fetchJson } = require('../lib/functions')

const CLOWN = "> POWERED by CLOWN-MD 🤡"

async function getPremiumUsers() {
    try{
        const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Moviedl/primiyam.json');
        const preUsers = preUser.split(",");
        return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
    }catch{ return [] }
}

// ===== ANIME GIRL =====
cmd({
    pattern: "animegirl",
    react: "👧",
    desc: "Random anime girl",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const { data } = await axios.get(`https://api.waifu.pics/sfw/waifu`);
        await conn.sendMessage(from, { image: { url: data.url }, caption: `👧 *Random Anime Girl* 👧\n${CLOWN}` }, { quoted: mek });
    } catch (e) { reply(`Error: ${e.message}`) }
});

// ===== FACT =====
cmd({
    pattern: "fact",
    react: "🤓",
    desc: "Random fact",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const { data } = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        return reply(`🧠 *Random Fact* 🧠\n\n${data.text}\n\n${CLOWN}`);
    } catch (e) { reply("Fact fetch fail!") }
});

// ===== JOKE =====
cmd({
    pattern: "joke",
    react: "🤣",
    desc: "Random joke",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const { data } = await axios.get('https://official-joke-api.appspot.com/random_joke');
        return reply(`😂 *${data.setup}*\n\n${data.punchline} 😄\n\n${CLOWN}`);
    } catch (e) { reply("Joke fail!") }
});

// ===== YTMX (Premium) =====
cmd({
    pattern: "ytmx",
    react: '📽️',
    desc: "YTS MX torrent",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, prefix, q, sender, reply }) => {
try{
    const preUsers = await getPremiumUsers()
    if(!preUsers.includes(sender)) return reply("*Premium Only* - Owner contact karapan 🤡")
    if (!q) return reply('*Link or name denna!*')
    const { data } = await axios.get(q);
    const $ = cheerio.load(data);
    const title = $("#mobile-movie-info > h1").text() || "Unknown";
    const image = $("#movie-poster > img").attr("src");
    let results = [];
    $("div.modal.modal-download.hidden-xs.hidden-sm > div > div > div").each((c, d) => {
        results.push({ quality: $(d).find("div > span").text(), size: $(d).find("p.quality-size").eq(1).text(), magnet: $(d).find("a.magnet-download").attr("href") })
    })
    if(!results.length) return reply("No torrents found!")
    let txt = `📽️ *CLOWN-MD YTMX* 📽️\n\n*${title}*\n\n`
    results.forEach((r,i)=> txt += `${i+1}. ${r.quality} - ${r.size}\n${prefix}ytmxdl ${r.magnet}\n\n`)
    await conn.sendMessage(from, { image: { url: image || 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: txt + CLOWN }, { quoted: mek });
} catch (e) { console.log(e); reply('*Error YTMX!*') }
});

// ===== MVDB (hide API key in env) =====
cmd({
    pattern: "mvdb",
    react: "🎥",
    desc: "Movie DB",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, prefix, q, reply }) => {
    const API_KEY = 'dzhdJ6Ty9jTH2D56-H171z83j319dj61d'; // .env ekata danna recommend!
    const BASE_URL = 'http://103.195.101.44:2662';
    if (!q) return reply('*Movie name? Ex: .mvdb avatar*');
    try {
        const { data: movies } = await axios.get(`${BASE_URL}/api/movies?search=${encodeURIComponent(q)}&apiKey=${API_KEY}`);
        if (!movies || !movies.length) return reply(`No movies for "${q}"`);
        let msg = `🎬 *CLOWN-MD CINEMA* 🎬\n\nSearch: "${q}"\n\n`
        for(let i=0; i<Math.min(movies.length, 5); i++){
            let movie = movies[i]
            try{
                let { data: detail } = await axios.get(`${BASE_URL}/api/request-movie/${encodeURIComponent(movie.name)}?apiKey=${API_KEY}`);
                let sizeGB = (detail.size / (1024**3)).toFixed(2)
                msg += `${i+1}. *${movie.name}* (${movie.quality}) - ${sizeGB}GB\n${prefix}dbl ${BASE_URL}${detail.url} & ${movie.name}\n\n`
            }catch{}
        }
        await conn.sendMessage(from, { text: msg + CLOWN }, { quoted: mek })
    } catch (e) { console.log(e); reply('MVDB API down!') }
});