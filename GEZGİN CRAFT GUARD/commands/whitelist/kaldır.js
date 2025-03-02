const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'whitelist-kaldır',
    execute: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        const member = message.mentions.members.first();
        if (!member) return message.reply('Bir kullanıcı etiketle.');

        const logChannel = message.guild.channels.cache.find(c => c.name === 'volta-log');

        if (client.whitelist.has(member.id)) {
            const removedCategories = client.whitelist.get(member.id) || [];

            client.whitelist.delete(member.id);

            const embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Whitelist Kaldırıldı')
                .addFields(
                    { name: 'Kullanıcı', value: `${member}`, inline: true },
                    { name: 'Kaldıran Yetkili', value: `${message.author}`, inline: true },
                    { name: 'Kaldırılan Muafiyetler', value: removedCategories.length > 0 ? removedCategories.map(c => `- ${c}`).join('\n') : 'Yok', inline: false }
                )
                .setFooter({ text: 'Whitelist Sistemi', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.reply({ content: `${member} whitelistten kaldırıldı.`, embeds: [embed] });

            if (logChannel) {
                logChannel.send({ embeds: [embed] });
            }
        } else {
            message.reply(`${member} zaten whitelistte değil.`);
        }
    }
};
