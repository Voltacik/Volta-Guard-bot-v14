const { sendLog } = require('../helpers/logHelper');

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel) {
        const auditLogs = await newChannel.guild.fetchAuditLogs({ type: 31 });
        const logEntry = auditLogs.entries.first();
        if (!logEntry || !logEntry.executor) return;

        const executor = logEntry.executor;
        const isWhitelisted = newChannel.client.whitelist.get(executor.id)?.includes('kanal');

        if (!isWhitelisted) {
            sendLog(newChannel.guild, 'volta-kanal-log', 'Kanal İzinleri Değiştirildi', `**Kanal:** ${newChannel.name}\n**İşlem Yapan:** ${executor.tag}\n**Durum:** İzinler değiştirildi.`, 'Red');
        } else {
            sendLog(newChannel.guild, 'volta-kanal-log', 'Whitelist - Kanal İzinleri Değiştirildi', `**Kanal:** ${newChannel.name}\n**İşlem Yapan:** ${executor.tag}\n**Durum:** Whitelist'te olduğu için işlem yapılmadı.`, 'Green');
        }
    }
};
