const { EmbedBuilder } = require('discord.js');

function sendLog(guild, channelName, title, description, color = 'Blurple', fields = []) {
    const logChannel = guild.channels.cache.find(c => c.name === channelName);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp()
        .setFooter({ text: `${guild.name} - Log Sistemi`, iconURL: guild.iconURL({ dynamic: true }) })
        .setThumbnail(guild.iconURL({ dynamic: true }));

    if (fields.length > 0) {
        embed.addFields(fields);
    }

    logChannel.send({ embeds: [embed] });
}

module.exports = { sendLog };
