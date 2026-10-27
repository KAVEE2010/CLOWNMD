var commands = [];

function cmd(info, func) {
    var data = info;
    data.function = func;
    
    // Default values - CLOWN-MD
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = 'misc';
    if(!info.filename) data.filename = "Not Provided";
    
    // CLOWN-MD Enhancements
    if (!data.use) data.use = `No usage`;
    if (!data.react) data.react = '🤡';
    if (!data.alias) data.alias = [];
    if (!data.pattern) {
        console.log(`⚠️ [CLOWN-MD] Pattern missing in ${data.filename}`);
        return;
    }
    
    // Duplicate check
    const exists = commands.find(c => c.pattern === data.pattern);
    if(exists) {
        console.log(`⚠️ [CLOWN-MD] Duplicate pattern: ${data.pattern} - Skipped`);
        return;
    }
    
    commands.push(data);
    
    // Log only in dev
    if(process.env.DEBUG === "true") {
        console.log(`✅ [CLOWN-MD] Loaded: ${data.pattern} [${data.category}]`);
    }
    
    return data;
}

module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
};