const axios = require('axios');

async function ytmp3(ytUrl) {
  try {
    if (!ytUrl) throw new Error('URL required');
    
    // API 1 - Fast
    try {
      const res = await axios.get(`qwnloader/ytmp3?url=${ytUrl}`, { timeout: 15000 });
      if(res.data && res.data.url) {
        return {
          status: true,
          title: res.data.title || "CLOWN-MD Song",
          dl_link: res.data.url
        };
      }
    } catch {}

    // API 2 - Backup
    const info = await axios.get(`https://cdn73.savetube.su/info?url=${encodeURIComponent(ytUrl)}`, {
      headers: {
        'Origin': 'https://ytshorts.savetube.me',
        'Referer': 'https://ytshorts.savetube.me/',
      }
    });
    
    const key = info.data.data.key;
    const title = info.data.data.title;
    const dl = await axios.get(`https://cdn71.savetube.su/download/audio/128/${key}`, {
      headers: {
        'Origin': 'https://ytshorts.savetube.me',
        'Referer': 'https://ytshorts.savetube.me/',
      }
    });

    return {
      status: true,
      Created_by: 'CLOWN-MD 🤡',
      title: title,
      dl_link: dl.data.data.downloadUrl
    };
  } catch (e) {
    console.log('ytmp3 error:', e.message);
    return { status: false, error: e.message };
  }
}

async function ytmp4(url, format = '720p') {
  try {
    if (!url) throw new Error('URL required');
    const quality = format.replace('p','') || '720';

    // API 1
    try {
      const res = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp4?url=${url}`, { timeout: 15000 });
      if(res.data && res.data.url) {
        return res.data.url;
      }
    } catch {}

    // API 2 - Backup
    const firstUrl = 'https://ab.cococococ.com/ajax/download.php';
    const firstParams = { button: 1, start: 1, end: 1, format: quality, url };
    const headers = {
      'Origin': 'https://loader.to',
      'Referer': 'https://loader.to',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/124.0.0.0 Mobile Safari/537.36',
    };
    
    const firstRes = await axios.get(firstUrl, { params: firstParams, headers });
    const id = firstRes.data.id;

    const check = async () => {
      const sec = await axios.get('https://p.oceansaver.in/ajax/progress.php', { params: { id }, headers });
      if (sec.data.text === "Finished") return sec.data.download_url;
      await new Promise(r => setTimeout(r, 1000));
      return check();
    };
    
    return await check();

  } catch (e) {
    console.log('ytmp4 error:', e.message);
    return null;
  }
}

module.exports = { ytmp3, ytmp4 }