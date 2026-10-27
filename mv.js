const config = require('../config')
const { cmd, commands } = require('../command')
const axios = require('axios')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const cheerio = require('cheerio');
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 

async function getPremiumUsers() {
    const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Moviedl/primiyam.json');
    const preUsers = preUser.split(",");
    return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
}

  //======================= ASITHA PLUG =====================================



cmd({
    pattern: "ginisisila",
    react: "🎥",
    desc: "Download movie for isaidub9.com",
    category: "extra",
    use: '.Ginisisila <Movie Name>',
    filename: __filename
}, async (conn, mek, m, { from, sender, prefix, quoted, q, reply }) => {
    try {
	let page = q.split(" & ")[1]
        let name = q.split(" & ")[0] // get the q directly!
        

        const apiUrl = `https://dark-yasiya-api-new.vercel.app/search/ginisisila?text=${name}&page=${page}`;
        const data = await axios.get(apiUrl).then(res => res.data);

        if (!data.status) {
            return reply(`*ERROR:* Unable to fetch data for "${name}".`);
        }

        let movieResults = data.result.data;
        
        const ownerData = await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json').then(res => res.data);
        let LOGO = ownerData.imageurl;
        let BTN = ownerData.button;
        let FOOTER = ownerData.footer;
        let BTNURL = ownerData.buttonurl;

        let rows = [];
        for (let movie of movieResults) {
            rows.push({
                title: movie.title,
                description: ``,
                rowId: `${prefix}gdrivegini ${movie.url || 'N/A'} & ${movie.image}`
            });
        }

        const sections = [{
            title: 'Results from ginisisilacartoon.net',
            rows: rows
        }];

        const listMessage = {
            text: `📽 CLOWN-MD CINEMA 📽\n\n👽 Entered Name || ${name}`,
            footer: FOOTER || "> POWERED by CLOWN-MD",
            title: '',
            buttonText: '🔢 Reply below number\n',
            sections
        };

        await conn.listMessage(from, listMessage, mek);
    } catch (e) {
        console.error(e);
        reply(`No Movie`);
    }
});




  cmd({
    pattern: "isaiden",
    react: "🎥",
    desc: "Download movie for isaidub9.com",
    category: "extra",
    use: '.isaid <Movie Name>',
    filename: __filename
}, async (conn, mek, m, { from, sender, prefix, quoted, q, reply }) => {
    try {
        let name = q; // get the q directly!
        let count = 10// Default to 6 results... It fill give a fucking speed!

        const apiKey = "asithamd_xg2p5kl";
        const scrapeSite = "isaidub";
        const lang = "en";

        const apiUrl = `https://api.arabdullah.top/api?mv=true&mvScrape=${scrapeSite}&apiKey=${apiKey}&query=${name}&lang=${lang}&results=${count}`;
        const data = await axios.get(apiUrl).then(res => res.data);

        if (!data.success) {
            return reply(`*ERROR:* Unable to fetch data for "${name}".`);
        }

        let movieResults = data.results;
        
        const ownerData = await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json').then(res => res.data);
        let LOGO = ownerData.imageurl;
        let BTN = ownerData.button;
        let FOOTER = ownerData.footer;
        let BTNURL = ownerData.buttonurl;

        let rows = [];
        for (let movie of movieResults) {
            rows.push({
                title: movie.title,
                description: ``,
                rowId: `${prefix}dbl ${movie.downloadUrls['720p'] || 'N/A'} & ${movie.title} & 720p`
            });
        }

        const sections = [{
            title: 'Results from isaidub9.com',
            rows: rows
        }];

        const listMessage = {
            text: `📽 CLOWN MD CINEMA 📽\n\n👽 Entered Name || ${name}`,
            footer: FOOTER || "> POWERED by CLOWN-MD",
            title: '',
            buttonText: '🔢 Reply below number\n',
            sections
        };

        await conn.listMessage(from, listMessage, mek);
    } catch (e) {
        console.error(e);
        reply(`No Movie`);
    }
});


  cmd({
    pattern: "isaidta",
    react: "🎥",
    desc: "Download movie for isaidub9.com",
    category: "extra",
    use: '.isaid <Movie Name>',
    filename: __filename
}, async (conn, mek, m, { from, sender, prefix, quoted, q, reply }) => {
    try {
        let name = q; // get the q directly!
        let count = 10// Default to 6 results... It fill give a fucking speed!

        const apiKey = "asithamd_xg2p5kl";
        const scrapeSite = "isaidub";
        const lang = "ta";

        const apiUrl = `https://api.arabdullah.top/api?mv=true&mvScrape=${scrapeSite}&apiKey=${apiKey}&query=${name}&lang=${lang}&results=${count}`;
        const data = await axios.get(apiUrl).then(res => res.data);

        if (!data.success) {
            return reply(`*ERROR:* Unable to fetch data for "${name}".`);
        }

        let movieResults = data.results;
        
        const ownerData = await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json').then(res => res.data);
        let LOGO = ownerData.imageurl;
        let BTN = ownerData.button;
        let FOOTER = ownerData.footer;
        let BTNURL = ownerData.buttonurl;

        let rows = [];
        for (let movie of movieResults) {
            rows.push({
                title: movie.title,
                description: ``,
                rowId: `${prefix}dbl ${movie.downloadUrls['720p'] || 'N/A'} & ${movie.title} & 720p`
            });
        }

        const sections = [{
            title: 'Results from isaidub9.com',
            rows: rows
        }];

        const listMessage = {
            text: `📽 CLOWN MD CINEMA 📽\n\n👽 Entered Name || ${name}`,
            footer: FOOTER || "> POWERED by CLOWN-MD",
            title: '',
            buttonText: '🔢 Reply below number\n',
            sections
        };

        await conn.listMessage(from, listMessage, mek);
    } catch (e) {
        console.error(e);
        reply(`No Movie`);
    }
});



cmd({
    pattern: "sub",
    react: "🎥",
    desc: "Download movie for sinhalasub.lk",
    category: "extraa",
    use: '.sub < Movie Name >',
    filename: __filename
}, async (conn, mek, m, { from, sender, prefix, quoted, q, reply }) => {
    try {
const data = await fetchJson(`https://dark-yasiya-api-new.vercel.app/search/baiscope?text=${q}`);
        let hi_patiyo = data.result.data
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;

var rows = []
    
      for (let i of hi_patiyo ){     
rows.push({
title: i.title + '\n',
description: '',
rowId: prefix + 'pqr ' + i.url
});
}

  
const sections = [{
title: 'Results from baiscope.lk.',
rows: rows
}]

  
const listMessage = {
text: `
*📽️CLOWN MD CINEMA📽️*

👽 *Entered Name ||* ${q}  `,
  
footer: "> *POWERED by CLOWN-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
  
await conn.listMessage(from, listMessage,mek)
} catch (e) {
console.log(e)
reply('*ERROR !!*')
}
})

cmd({
    pattern: "pqr",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, prefix, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const data = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/baiscope?url=${q}`);
        
        await conn.sendMessage(from, { 
            document: { url: data.result.dl_link },
            caption: `\n${data.result.title}\n\n> *POWERED by CLOWN-MD*`,
            mimetype: "application/zip",
            fileName: `🎬 CLOWN-MD 🎬 ${data.result.title}.zip`
        }, { quoted: mek });
    } catch (e) {
console.log(e)
reply('*ERROR !!*')
}
})
cmd({
    pattern: "sinhalasub",
    react: "🎥",
    desc: "Download movie for sinhalasub.lk",
    category: "extra",
    use: '.sinhalasub < Movie Name >',
    filename: __filename
}, async (conn, mek, m, { from, sender, prefix, quoted, q, reply }) => {
    try {
	    const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        if (!q) return await reply('Movie name please!');

        const data = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/search?q=${q}&apikey=asitha2005`);
        let hi_patiyo = data.data.data.data
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;

var rows = []
    
      for (let i of hi_patiyo ){     
rows.push({
title: i.title + '\n',
description: '',
rowId: prefix + 'mpp ' + i.link
});
}

  
const sections = [{
title: 'Results from sinhalasub.lk.',
rows: rows
}]

  
const listMessage = {
text: `
*📽️CLOWN MD CINEMA📽️*

👽 *Entered Name ||* ${q}  `,
  
footer: "> *POWERED by CLOWN-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
  
await conn.listMessage(from, listMessage,mek)
} catch (e) {
console.log(e)
reply('*ERROR !!*')
}
})



cmd({
    pattern: "mpp",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, prefix, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

	   if (q.includes("https://sinhalasub.lk/tvshows")) {

		const tvdata2 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/tvshow?url=${q}&apikey=asitha2005`)
		let episodes = tvdata2.data.data.episodesDetails.flatMap(season =>
           season.episodes.map(episode => ({
                 title: `${episode.number} - ${episode.title}`,
                 link: episode.url
    }))
);

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data	
let LOGO = ownerdata.image
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;

var rows = []
    
      for (let i of episodes ){     
rows.push({
title: i.title + '\n',
description: '',
rowId: prefix + 'mddccc ' + i.link + ` & ${i.title}`
});
}

  
const sections = [{
title: 'Results from sinhalasub.lk.',
rows: rows
}]

  
const listMessage = {
text: `
*📽️CLOWN-MD CINEMA📽️*

👽 *Entered Name ||* ${tvdata2?.data?.data?.mainDetails?.maintitle ?? 'Null'}
`,
  
footer: "> *POWERED by CLOWN-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
  
	

		let ccd = `
*📽️CLOWN-MD TV-SHOWS®📽️*

☘️ *Tɪᴛʟᴇ :* ${tvdata2?.data?.data?.mainDetails?.maintitle ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${tvdata2?.data?.data?.mainDetails?.dateCreated ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${tvdata2?.data?.data?.mainDetails?.genres?.length > 0 ? tvdata2.data.data.mainDetails.genres.join(', ') : (tvdata2?.data?.data.moviedata?.tags?.length > 0 ? tvdata2.data.data.moviedata.tags.join(', ') : 'Null')}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${tvdata2?.data?.data?.castDetails?.cast?.length > 0 ? tvdata2.data.data.castDetails.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by CLOWN-MD*
`;

         await conn.sendMessage(from, { image: { url: tvdata2?.data?.data.mainDetails?.imageUrl?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: ccd }, { quoted: mek }); 
         await conn.listMessage(from, listMessage,mek)
          
	
	   }

if (q.includes("https://sinhalasub.lk/movies")) {

        const data2 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/movie?url=${q}&apikey=asitha2005`)


        const link = data2.data.data.dllinks.directDownloadLinks.map(directDownloadLink => directDownloadLink.link)
        const _1080 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[6]}&apikey=asitha2005`)
        const _720 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[7]}&apikey=asitha2005`)
        const _480 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[8]}&apikey=asitha2005`)
	const _10802 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[0]}&apikey=asitha2005`)
        const _7202 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[1]}&apikey=asitha2005`)
        const _4802 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[2]}&apikey=asitha2005`)
	


        console.log(data2)
	console.log(link)

        const size = data2.data.data.dllinks.directDownloadLinks[8].size
        const sizee = data2.data.data.dllinks.directDownloadLinks[7].size
        const sizeee = data2.data.data.dllinks.directDownloadLinks[6].size
        const size2 = data2.data.data.dllinks.directDownloadLinks[2].size
        const sizee2 = data2.data.data.dllinks.directDownloadLinks[1].size
        const sizeee2 = data2.data.data.dllinks.directDownloadLinks[0].size
      
	const links = _480.data.data.link
        const linkss = _720.data.data.link
        const linksss = _1080.data.data.link

	const links2 = _4802.data.data.link
        const linkss2 = _7202.data.data.link
        const linksss2 = _10802.data.data.link
    
        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values දෙනවා
        let cc = `
*📽️CLOWN-MD MOVIE®📽️*

☘️ *Tɪᴛʟᴇ :* ${data2?.data?.data?.mainDetails?.maintitle ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${data2?.data?.data?.mainDetails?.dateCreated ?? 'Null'}
▫️🌎 *Cᴏᴜɴᴛʀʏ :* ${data2?.data?.data?.mainDetails?.country ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.data?.data?.mainDetails?.runtime ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${data2?.data?.data?.moviedata?.genres?.length > 0 ? data2.data.data.moviedata.genres.join(', ') : (data2?.data?.data.moviedata?.tags?.length > 0 ? data2.data.data.moviedata.tags.join(', ') : 'Null')}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${data2?.data?.data?.moviedata?.director ?? 'Null'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${data2?.data?.data?.moviedata?.cast?.length > 0 ? data2.data.data.moviedata.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟* `

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + 'dbl ' + links + ` & ${data2?.data?.data?.mainDetails?.maintitle ?? 'Null'} & 480p` ,buttonText: {displayText: ` Sever 01 = 480p :- ${size}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linkss + ` & ${data2?.data?.data?.mainDetails?.maintitle ?? 'Null'} & 720p`, buttonText: {displayText: ` Sever 01 = 720p :- ${sizee}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linksss + ` & ${data2?.data?.data?.mainDetails?.maintitle ?? 'Null'} & 1080p`, buttonText: {displayText: ` Sever 01 = 1080p :- ${sizeee}`}, type: 1},
  {buttonId: prefix + 'dbl ' + links2 + ` & ${data2?.data?.data?.mainDetails?.maintitle ?? 'Null'} & 480p` ,buttonText: {displayText: ` Sever 02 = 480p :- ${size2}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linkss2 + ` & ${data2?.data?.data?.mainDetails?.maintitle ?? 'Null'} & 720p`, buttonText: {displayText: ` Sever 02 = 720p :- ${sizee2}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linksss2 + ` & ${data2?.data?.data?.mainDetails?.maintitle ?? 'Null'} & 1080p`, buttonText: {displayText: ` Sever 02 = 1080p :- ${sizeee2}`}, type: 1}

]

const buttonMessage = {
    image: { url:`${LOGO}`},
    caption: 'DOWNLOAD\n\n> Use Sever 02',
    footer: FOOTER,
    buttons: buttons,
    headerType: 3
}
let isp = data2?.data?.data.moviedata?.imageUrls[0] ;
let bnb  = isp.replace(/\n/g, "");
await conn.sendMessage(from, { image: { url: bnb ?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek }); 
return await conn.buttonMessage(from, buttonMessage, mek)
}
} catch (e) {
console.log(e)
reply(e)
}
})



cmd({
    pattern: "mddccc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        	    const linkk = q.split(" & ")[0]
        const titell = q.split(" & ")[1] 
        const data2 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/episode?url=${linkk}=asitha2005`)
        const link = data2.data.data.dllinks.directDownloadLinks.map(directDownloadLink => directDownloadLink.link)
        const _1080 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[6]}&apikey=asitha2005`)
        const _720 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[7]}&apikey=asitha2005`)
        const _480 = await fetchJson(`https://asitha-moviedl.vercel.app/api/sinhalasubs/download?url=${link[8]}&apikey=asitha2005`)
	

        const size = data2.data.data.dllinks.directDownloadLinks[8].size
        const sizee = data2.data.data.dllinks.directDownloadLinks[7].size
        const sizeee = data2.data.data.dllinks.directDownloadLinks[6].size
      
	const links = _480.data.data.link
        const linkss = _720.data.data.link
        const linksss = _1080.data.data.link
let cm = `🔽`

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + 'dbl ' + links + ` & ${titell} & 480p` ,buttonText: {displayText: ` 480p :- ${size}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linkss + ` & ${titell} & 720p`, buttonText: {displayText: ` 720p :- ${sizee}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linksss + ` & ${titell} & 1080p`, buttonText: {displayText: ` 1080p :- ${sizeee}`}, type: 1}

]

const buttonMessage = {
    image: { url:`${LOGO}`},
    caption: cm,
    footer: FOOTER,
    buttons: buttons,
    headerType: 3
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
console.log(e)
reply(e)
}
})




cmd({
    pattern: "cinesubz",
    react: "🎥",
    alias: ["cz"],
    desc: "Download movie for sinhalasub.lk",
    category: "extra",
    use: '.cinesubz < Movie Name >',
    filename: __filename
},
    
async(conn, mek, m,{from,sender, prefix, quoted, q, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg
 
        // Fetch premium users
        const premiumUsers = await getPremiumUsers();

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
	}
if(!q) return await reply('Mv name plz')
	
const data = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/search?q=${q}&apikey=asitha2005`)
if (data.data.data.datalength === 0) {
            return reply("🚫 No movies found for your search query.");
}
let hi_patiyo = data.data.data.data
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data	
let LOGO = ownerdata.image
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;

var rows = []
    
      for (let i of hi_patiyo ){     
rows.push({
title: i.title + '\n',
description: '',
rowId: prefix + 'mdc ' + i.link
});
}

  
const sections = [{
title: 'Results from cinesubz.co.',
rows: rows
}]

  
const listMessage = {
text: `
*📽️CLOWN MD CINEMA📽️*

👽 *Entered Name ||* ${q}  `,
  
footer: "> *POWERED by CLOWN-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
  
await conn.listMessage(from, listMessage,mek)
} catch (e) {
console.log(e)
reply('*ERROR !!*')
}
})


cmd({
    pattern: "mdc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, prefix, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

	   if (q.includes("https://cinesubz.co/tvshows")) {

		const tvdata2 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/tvshow?url=${q}&apikey=asitha2005`)
		let episodes = tvdata2.data.data.episodesDetails.flatMap(season =>
           season.episodes.map(episode => ({
                 title: `${episode.number} - ${episode.title}`,
                 link: episode.url
    }))
);
		      
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data	
let LOGO = ownerdata.image
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;

var rows = []
    
      for (let i of episodes ){     
rows.push({
title: i.title + '\n',
description: '',
rowId: prefix + 'mddc ' + i.link + ` & ${i.title}`
});
}

  
const sections = [{
title: 'Results from cinesubz.co.',
rows: rows
}]

  
const listMessage = {
text: `
*📽️CLOWN-MD CINEMA📽️*

👽 *Entered Name ||* ${tvdata2?.data?.data?.mainDetails?.maintitle ?? 'Null'}
`,
  
footer: "> *POWERED by CLOWN-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
  

		let ccd = `
*📽️CLOWN-MD TV-SHOWS®📽️*

☘️ *Tɪᴛʟᴇ :* ${tvdata2?.data?.data?.mainDetails?.maintitle ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${tvdata2?.data?.data?.mainDetails?.dateCreated ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${tvdata2?.data?.data?.mainDetails?.genres?.length > 0 ? tvdata2.data.data.mainDetails.genres.join(', ') : (tvdata2?.data?.data.moviedata?.tags?.length > 0 ? tvdata2.data.data.moviedata.tags.join(', ') : 'Null')}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${tvdata2?.data?.data?.castDetails?.cast?.length > 0 ? tvdata2.data.data.castDetails.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by ASITHA-MD*
`;

         await conn.sendMessage(from, { image: { url: tvdata2?.data?.data.mainDetails?.imageUrl?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: ccd }, { quoted: mek }); 
         await conn.listMessage(from, listMessage,mek)
          
	
	   }

if (q.includes("https://cinesubz.co/movies")) {

        const data2 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/movie?url=${q}&apikey=asitha2005`)


        const link = data2.data.data.dllinks.directDownloadLinks.map(directDownloadLink => directDownloadLink.link)
        const _1080 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[2]}&apikey=asitha2005`)
        const _720 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[1]}&apikey=asitha2005`)
        const _480 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[0]}&apikey=asitha2005`)
	
        const links = _480.data.data[0].href
        const size = _480.data.data[0].fileSize
        const linkss = _720.data.data[0].href
        const sizee = _720.data.data[0].fileSize
        const linksss = _1080.data.data[0].href
        const sizeee = _1080.data.data[0].fileSize


        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values දෙනවා
        let cc = `
*📽️CLOWN-MD MOVIE®📽️*

☘️ *Tɪᴛʟᴇ :* ${data2?.data?.data?.moviedata?.title ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${data2?.data?.data?.mainDetails?.dateCreated ?? 'Null'}
▫️🌎 *Cᴏᴜɴᴛʀʏ :* ${data2?.data?.data?.mainDetails?.country ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.data?.data?.mainDetails?.runtime ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${data2?.data?.data?.moviedata?.genres?.length > 0 ? data2.data.data.moviedata.genres.join(', ') : (data2?.data?.data.moviedata?.tags?.length > 0 ? data2.data.data.moviedata.tags.join(', ') : 'Null')}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${data2?.data?.data?.moviedata?.director ?? 'Null'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${data2?.data?.data?.moviedata?.cast?.length > 0 ? data2.data.data.moviedata.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
`

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + 'dbl ' + links + ` & ${data2?.data?.data?.moviedata?.title ?? 'Null'} & 480p` ,buttonText: {displayText: ` 480p :- ${size}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linkss + ` & ${data2?.data?.data?.moviedata?.title ?? 'Null'} & 720p`, buttonText: {displayText: ` 720p :- ${sizee}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linksss + ` & ${data2?.data?.data?.moviedata?.title ?? 'Null'} & 1080p`, buttonText: {displayText: ` 1080p :- ${sizeee}`}, type: 1}

]

const buttonMessage = {
    image: { url:`${LOGO}`},
    caption: 'DOWNLOAD',
    footer: FOOTER,
    buttons: buttons,
    headerType: 3
}
await conn.sendMessage(from, { image: { url:  data2?.data?.data.mainDetails?.imageUrl?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek }); 
return await conn.buttonMessage(from, buttonMessage, mek)
}
} catch (e) {
console.log(e)
reply(e)
}
})


cmd({
    pattern: "mddc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
	}
	    const linkk = q.split(" & ")[0]
        const titell = q.split(" & ")[1] 
         let numrep = []
         const linnk = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/episode?url=${linkk}&apikey=asitha2005`)
          const link = linnk.data.data.dllinks.directDownloadLinks.map(directDownloadLink => directDownloadLink.link)
const _1080 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[2]}&apikey=asitha2005`)
const _720 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[1]}&apikey=asitha2005`)
const _480 = await fetchJson(`https://asitha-moviedl.vercel.app/api/cinesubz/download?url=${link[0]}&apikey=asitha2005`)
	    
const links = _480.data?.data[0]?.href ?? 'Null'
const size = _480.data?.data[0]?.fileSize ?? 'Null'
const linkss = _720.data?.data[0]?.href ?? 'Null'
const sizee = _720.data?.data[0]?.fileSize ?? 'Null'
const linksss = _1080.data?.data[0]?.href ?? 'Null'
const sizeee = _1080.data?.data[0]?.fileSize ?? 'Null'

let cm = `🔽`

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + 'dbl ' + links + ` & ${titell} & 480p` ,buttonText: {displayText: ` 480p :- ${size}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linkss + ` & ${titell} & 720p`, buttonText: {displayText: ` 720p :- ${sizee}`}, type: 1},
  {buttonId: prefix + 'dbl ' + linksss + ` & ${titell} & 1080p`, buttonText: {displayText: ` 1080p :- ${sizeee}`}, type: 1}

]

const buttonMessage = {
    image: { url:`${LOGO}`},
    caption: cm,
    footer: FOOTER,
    buttons: buttons,
    headerType: 3
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
console.log(e)
reply(e)
}
})


cmd({
    pattern: "ytxms",
    react: "🎥",
    alias: ["ys"],
    desc: "Download movie for ytxms",
    category: "extra",
    use: '.ytxms < Movie Name >',
    filename: __filename
},
    
async(conn, mek, m,{from,sender, prefix, quoted, q, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Fetch premium users
        const premiumUsers = await getPremiumUsers();

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
	}
if(!q) return await reply('Mv name plz')
	
const data = await fetchJson(`https://yts.mx/api/v2/list_movies.json?sort_by=rating&query_term=${q}`)
if (data.data.limit === 0) {
            return reply("🚫 No movies found for your search query.");
}
let hi_patiyo = data.data.movies
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data	
let LOGO = ownerdata.image
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;

var rows = []
    
      for (let i of hi_patiyo ){     
rows.push({
title: i.title_long + '\n',
description: '',
rowId: prefix + 'ytmx ' + i.url
});
}

  
const sections = [{
title: 'Results from yts.mx.',
rows: rows
}]

  
const listMessage = {
text: `
*📽️CLOWN MD CINEMA📽️*

👽 *Entered Name ||* ${q}  `,
  
footer: "> *POWERED by CLOWN-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
  
await conn.listMessage(from, listMessage,mek)
} catch (e) {
console.log(e)
reply('*ERROR !!*')
}
});



cmd({
    pattern: "pvc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, prefix, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }
const data = await fetchJson(`https://yts.mx/api/v2/movie_details.json?movie_id=${q}`)
const data2 = data.data.movie
let cc = `
*📽️CLOWM-MD MOVIE®📽️*

☘️ *Tɪᴛʟᴇ :* ${data2?.title_long ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${data2?.year ?? 'Null'}
▫️🌎 *ɪᴍʙ :* ${data2?.rating ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.runtime ?? 'Null'}
▫️⭕ *ᴅᴇꜱᴄ :* ${data2?.description_full ?? 'Null'}
▫️👁️‍🗨️ *ɪᴍʙ :*  ${data2?.rating ?? 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
`
let episodes = data2.torrents.map(episode => ({
                 title: `${episode.quality} - ${episode.size}`,
                 link: episode.url
    })
);
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
var rows = []
    
      for (let i of episodes ){     
rows.push({
title: i.title + '\n',
description: '',
rowId: prefix + 'pvcc ' + i.link
});
}

  
const sections = [{
title: 'ytmx torrents',
rows: rows
}]


const listMessage = {
text: `*CLOWN-MD*`,  
footer: "> *POWERED by CLOWN-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
await conn.sendMessage(from, { image: { url: data2?.large_cover_image ?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek });  
await conn.listMessage(from, listMessage,mek)
} catch (e) {
console.log(e)
reply('*ERROR !!*')
}
});




cmd({
    pattern: "firemovies",
    alias: ["fh"],
    desc: "Check bot setting.",
    react: "🎬",
    category: "extra",
    use: '.firemovies < Movie Name >',
    filename: __filename
},
async(conn, mek, m, { from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Fetch premium users
        const premiumUsers = await getPremiumUsers();

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

    
        const data = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/search?text=${q}`)

        // Check if the search returned any results
        if (data.result && data.result.length > 0) {
            return reply("🚫 No movies found for your search query.");
        }

let numrep = []
let pp = '' 

data.result.data.forEach((data, httaa) => {
				
                  pp += `👾 *${formatNumber( httaa + 1)} ||* ${data.title}\n\n`
				
                //  numrep.push(`${prefix}fdc ${data.link}` )
                  })	      
        // Create buttons for each movie found in the search results
let pakaya = `*📽️CLOWN-MD CINEMA📽️*

firemovieshub.com

👽 *Entered Name ||* ${q}

🔢 *Reply Below Number ||* 👇


${pp}
> *POWERED by CLOWN-MD*
`
	
	                
	

	 const mass = await conn.sendMessage(from, { text : pakaya }, { quoted: mek });
	
          
	
} catch (e) {
console.log(e)
reply(e)
}	
})


cmd({
    pattern: "fdc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
        }

if (q.includes("https://firemovieshub.com/tvshows")) {

		const tvdata2 = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/tvshow?url=${q}`)
let numrep = []
let pp = '' 

tvdata2.result.data.episodes.forEach((episode, htta) => {
				
                  pp += ` *${formatNumber( htta + 1)} ||* ${episode.number}  ${episode.name}\n\n`
				
                //  numrep.push(`${prefix}mbddc ${episode.link} & ${episode.name}` )
                  })	      
let pakaya = `*📽️CLOWN-MD CINEMA📽️*

firemovieshub.com

👽 *Entered Name ||* ${q}

🔢 *Reply Below Number ||* 👇


${pp}

> *POWERED by CLOWN-MD*
`
  

		let cc = `
*📽️MOVIE.HUB TV-SHOWS®📽️*

☘️ *Tɪᴛʟᴇ :* ${tvdata2?.result?.data?.title ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${tvdata2?.result?.data?.date ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${tvdata2?.result?.data?.duration ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${tvdata2?.result?.data?.category?.length > 0 ? tvdata2.result.data.category.join(', ') : 'Null'}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${tvdata2?.result?.data?.director ?? 'Null'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${tvdata2?.result?.data?.cast?.length > 0 ? tvdata2.result.data.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :*https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by CLOWN-MD*
`;

         await conn.sendMessage(from, { image: { url: tvdata2?.result?.data?.mainImage?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek }); 
          const mass = await conn.sendMessage(from, { text : pakaya}, { quoted: mek });
	
          


	
	}



if (q.includes("https://firemovieshub.com/movies")) {

        const data2 = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/movie?url=${q}`);
        let pp = '';
        let numrep = [];

        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values ලබා දීම
        data2.result.data.dl_links.forEach((dl_links, htta) => {
            pp += ` *${formatNumber(htta + 1)} ||*  ${dl_links.quality} :- ${dl_links.size}\n\n`;
        //    numrep.push(`${prefix}dbl ${dl_links.link} & ${data2?.result?.data?.title ?? 'Null'} & ${dl_links.quality}`);
        });

        let cc = `
*📽️MOVIE.HUB MOVIE®📽️*

☘️ *Tɪᴛʟᴇ :* ${data2?.result?.data?.title ?? 'Null'}
▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${data2?.result?.data?.date ?? 'Null'}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.result?.data?.duration ?? 'Null'}
▫️🎭 *Gᴇɴʀᴇꜱ :* ${data2?.result?.data?.category?.length > 0 ? data2.result.data.category.join(', ') : 'Null'}
▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${data2?.result?.data?.director ?? 'Null'}
▫️🕵️‍♂️ *Cᴀsᴛ :* ${data2?.result?.data?.cast?.length > 0 ? data2.result.data.cast.map(cast => cast.name).join(', ') : 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VbDr58YDJ6H481jeJ83n
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

🔽 *To download send:*

${pp}

> *POWERED by CLOWN-MD*
`;

        const mass = await conn.sendMessage(from, { 
            image: { url: data2?.result?.data?.mainImage ?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' },
            caption: cc
        }, { quoted: mek });

}
     }catch (e) {
        console.log(e);
        await reply(`${e}`);
    }
})

cmd({

    pattern: "mbddc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Premium users බලනවා
        const premiumUsers = await getPremiumUsers();

        // User එක premium user එකක්ද කියලා බලනවා
        const isPreUser = premiumUsers.includes(sender);

        // Premium user එකක් නොවේ නම්, command එක deny කරනවා
        if (!isPreUser) {
            return reply(msr.pre_cmd);
	}
	const linkk = q.split(" & ")[0]
        const titell = q.split(" & ")[1] 
         const linnk = await fetchJson(`https://mr-asitha.vercel.app/movie/firemovie/episode?url=${linkk}`);

        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values ලබා දීම
        let pp = '';
        let numrep = [];

        // Optional chaining (?.) සහ Nullish coalescing (??) operators වලින් default values ලබා දීම
linnk.result.data.dl_links.forEach((dl_links, htta) => {
            pp += ` *${formatNumber(htta + 1)} ||* ${dl_links.quality} ${dl_links.size}\n\n`;
          //  numrep.push(`${prefix}dbl ${dl_links.link} & ${titell} & ${dl_links.quality}`);
        });

        let cc = `
🔽 *To download send:*


${pp}

> *POWERED by CLOWN-MD*
`;

        const mass = await conn.sendMessage(from, {text : cc}, { quoted: mek });

        
     }catch (e) {
        console.log(e);
        await reply(`${e}`);
    }
})

