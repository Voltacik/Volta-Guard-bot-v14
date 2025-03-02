const { sendLog } = require('../helpers/logHelper');

module.exports = {
    name: 'channelDelete',
    async execute(channel) {
        const auditLogs = await channel.guild.fetchAuditLogs({ type: 12 });
        const logEntry = auditLogs.entries.first();

        if (!logEntry || !logEntry.executor) return;

        const executor = logEntry.executor;
        const isWhitelisted = channel.client.whitelist.get(executor.id)?.includes('kanal');

        if (!isWhitelisted) {
            await channel.guild.channels.create({
                name: channel.name,
                type: channel.type
            });

            sendLog(channel.guild, 'volta-kanal-log', 'Kanal Silindi', `**Silinen Kanal:** ${channel.name}\n**Silen Kişi:** ${executor.tag}\n**Kanal Geri Açıldı.**`, 'Red');
        } else {
            sendLog(channel.guild, 'volta-kanal-log', 'Whitelist - Kanal Silindi', `**Silinen Kanal:** ${channel.name}\n**Silen Kişi:** ${executor.tag}\n**Whitelist'te olduğu için işlem yapılmadı.**`, 'Green');
        }
    }
};
