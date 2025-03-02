const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'whitelist-ekle',
    execute: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        const member = message.mentions.members.first();
        if (!member) return message.reply('Bir kullanıcı etiketle.');

        const descriptionText = `
<a:emoji:1345538249577467995> **Whitelist Kategorileri Açıklaması**

> <a:emoji:1345538249577467995> **Kanal Koruma:** Kanal silme, düzenleme işlemlerine karışmaz.
> <a:emoji:1345538249577467995> **Rol Koruma:** Rol silme, düzenleme işlemlerine karışmaz.
> <a:emoji:1345538249577467995> **Emoji Koruma:** Sunucuya emoji ekleme/silme işlemlerine karışmaz.
> <a:emoji:1345538249577467995> **Webhook Koruma:** Webhook oluşturma/silme işlemlerine karışmaz.
> <a:emoji:1345538249577467995> **Sunucu Ayar Koruma:** Sunucu adı, iconu, ayar değişikliklerine karışmaz.
> <a:emoji:1345538249577467995> **Yeni Hesap Koruma:** Yeni açılmış hesapları kontrol etmez.
> <a:emoji:1345538249577467995> **Görünmez Hesap Koruma:** İsmi boş veya görünmez hesapları kontrol etmez.
`;

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('whitelistMenu')
                    .setPlaceholder('Muafiyet Kategorilerini Seç')
                    .setMinValues(0)
                    .setMaxValues(7)
                    .addOptions([
                        { label: 'Kanal Koruma', value: 'kanal', emoji: '1345538249577467995' },
                        { label: 'Rol Koruma', value: 'rol', emoji: '1345538249577467995' },
                        { label: 'Emoji Koruma', value: 'emoji', emoji: '1345538249577467995' },
                        { label: 'Webhook Koruma', value: 'webhook', emoji: '1345538249577467995' },
                        { label: 'Sunucu Ayar Koruma', value: 'sunucu', emoji: '1345538249577467995' },
                        { label: 'Yeni Hesap Koruma', value: 'yenihesap', emoji: '1345538249577467995' },
                        { label: 'Görünmez Hesap Koruma', value: 'gorunmez', emoji: '1345538249577467995' }
                    ])
            );

        message.reply({ 
            content: `${member} kullanıcısı için muafiyet ayarlarını seçin.\n\n${descriptionText}`,
            components: [row] 
        });

        client.whitelist.set(member.id, []);

        // Loglama
        const logChannel = message.guild.channels.cache.find(c => c.name === 'volta-log');

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Whitelist Ekleme')
            .addFields(
                { name: 'Kullanıcı', value: `${member}`, inline: true },
                { name: 'Ekleyen Yetkili', value: `${message.author}`, inline: true },
                { name: 'Başlangıçta Muafiyetler', value: 'Henüz seçilmedi', inline: false }
            )
            .setFooter({ text: 'Whitelist Sistemi', iconURL: message.guild.iconURL() })
            .setTimestamp();

        if (logChannel) {
            logChannel.send({ embeds: [embed] });
        }
    }
};
