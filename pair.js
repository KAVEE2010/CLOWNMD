const { default: makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')
const pino = require('pino')

async function startPair() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        printQRInTerminal: false,
        browser: ["Chrome", "Windows", "10"]
    })

    if (!sock.authState.creds.registered) {
        const number = "947XXXXXXXX" 
        const code = await sock.requestPairingCode(number)
        console.log("PAIR CODE: " + code)
        console.log("WhatsApp > Linked Devices > Link with phone number > Code dapan")
    }

    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('connection.update', async (s) => {
        if (s.connection === 'open') {
            console.log("✅ CONNECTED! Session folder eke creds.json ready!")
        }
    })
}

startPair()
