const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const { MessageMedia } = require("whatsapp-web.js")

const wwebVersion = '2.2412.54';
const id = "0001"
const clients = {}

clients[id] = new Client({
    authStrategy: new LocalAuth({
        clientId: "0001"
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    }
})

clients[id].initialize().catch(err => console.log(err))

clients[id].on("qr", (qr) => {
    console.log(qr)
    qrcode.generate(qr, { small: true })
})
clients[id].on("ready", () => console.log("Client is ready!"))

clients[id].on("message", async (msg) => {
    try {
        if (process.env.PROCCESS_MESSAGE_FROM_CLIENT && msg.from != "status@broadcast") {
            const contact = await msg.getContact()
            console.log(contact, msg.from)
        }
    } catch (error) {
        console.error(error)
    }
})