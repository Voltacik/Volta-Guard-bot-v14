const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const { sendLog } = require('./helpers/logHelper');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
       // Bu intent, v14'te deprecated ama hala çalışır
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

client.config = config;  // <= ÖNEMLİ
client.commands = new Collection();
client.whitelist = new Map();
client.cooldowns = new Collection();

client.sendLog = (guild, channelName, title, description, color = 'Blurple', fields = []) => {
    sendLog(guild, channelName, title, description, color, fields);
};

fs.readdirSync('./commands').forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
});

fs.readdirSync('./events').forEach(file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
});

client.login(config.token);
