const { sendLog } = require('../helpers/logHelper');

module.exports = {
    name: 'guildUpdate',
    async execute(oldGuild, newGuild) {
        const auditLogs = await newGuild.fetchAuditLogs({ type: 1 });
        const logEntry = auditLogs.entries.first();
        if (!logEntry || !logEntry.executor) return;

        const executor = logEntry.executor;
        const isWhitelisted = newGuild.client.whitelist.get(executor.id)?.includes('sunucu');

        if (!isWhitelisted) {
            sendLog(newGuild, 'volta-sunucu-log', 'Sunucu Ayarları Değiştirildi', `**İşlem Yapan:** ${executor.tag}\n**Durum:** Sunucu ayarları değiştirildi. (Whitelist değil)`, 'Red');
        } else {
            sendLog(newGuild, 'volta-sunucu-log', 'Whitelist - Sunucu Ayarları Değiştirildi', `**İşlem Yapan:** ${executor.tag}\n**Durum:** Sunucu ayarları değiştirildi. (Whitelist'te)`, 'Green');
        }
    }
};
