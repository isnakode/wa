import wa from "whatsapp-web.js";
import qrCode from "qrcode-terminal";

const { Client, LocalAuth } = wa

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrCode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const commands = [
    { cmd: 'cmd', desc: 'lihat perintah' },
    { cmd: 'booking', desc: 'lihat bookingan' },
]

const commandList = commands.map(c => `*!${c.cmd}*\n${c.desc}\n`).join('')

client.on('message', async message => {
    const chat = await message.getChat()
    const msg = message.body.toLowerCase()

    if (!chat.isGroup) { return }

    if (msg == '!cmd') {
        await chat.sendMessage(`Daftar perintah\n\n${commandList}`)
    } else if (msg == '!booking') {

    }
});

client.initialize();