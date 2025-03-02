const { sendLog } = require('../helpers/logHelper');

module.exports = {
    name: 'emojiDelete',
    async execute(emoji) {
        const auditLogs = await emoji.guild.fetchAuditLogs({ type: 62 });
        const logEntry = auditLogs.entries.first();

        if (!logEntry || !logEntry.executor) return;

        const executor = logEntry.executor;
        const isWhitelisted = emoji.client.whitelist.get(executor.id)?.includes('emoji');

        if (!isWhitelisted) {
            sendLog(emoji.guild, 'volta-emoji-log', 'Emoji Silindi', `**Silinen Emoji:** ${emoji.name}\n**Silen Kişi:** ${executor.tag}`, 'Red');
        } else {
            sendLog(emoji.guild, 'volta-emoji-log', 'Whitelist - Emoji Silindi', `**Silinen Emoji:** ${emoji.name}\n**Silen Kişi:** ${executor.tag}\n**Whitelist'te olduğu için işlem yapılmadı.**`, 'Green');
        }
    }
};
