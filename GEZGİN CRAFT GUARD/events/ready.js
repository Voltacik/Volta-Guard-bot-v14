const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} aktif!`);

        const logChannels = [
            'volta-kanal-log',
            'volta-rol-log',
            'volta-emoji-log',
            'volta-webhook-log',
            'volta-sunucu-log',
            'volta-yenihesap-log',
            'volta-gorunmezhesap-log',
            'volta-chrome-log'
        ];

        for (const guild of client.guilds.cache.values()) {
            for (const channelName of logChannels) {
                if (!guild.channels.cache.find(c => c.name === channelName)) {
                    await guild.channels.create({
                        name: channelName,
                        type: 0, // Text channel
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: ['ViewChannel']
                            }
                        ]
                    });
                }
            }

            // Bot aktif olduğunda sabit bir kanala mesaj atma
            const generalChannel = guild.channels.cache.find(c => c.name === "💬│yetkili-chat" || c.name === "💬│yetkili-chat");
            if (generalChannel) {
                const embed = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle('Volta Guard Bot Aktif!')
                    .setDescription('Bu bot **Volta** tarafından kodlanmıştır.\nDaha fazla bilgi ve kaynak kodlar için:\nhttps://github.com/voltacik')  // URL'yi düz metin olarak ekledik
                    .setTimestamp();

                generalChannel.send({ embeds: [embed] }).catch(() => {});
            }
        }
    }
};
