const { sendLog } = require('../helpers/logHelper');

module.exports = {
    name: 'webhookUpdate',
    async execute(channel) {
        const auditLogs = await channel.guild.fetchAuditLogs({ type: 50 });
        const logEntry = auditLogs.entries.first();

        if (!logEntry || !logEntry.executor) return;

        const executor = logEntry.executor;
        const isWhitelisted = channel.client.whitelist.get(executor.id)?.includes('webhook');

        if (!isWhitelisted) {
            sendLog(channel.guild, 'volta-webhook-log', 'Webhook Güncellendi', `**Kanal:** ${channel.name}\n**İşlem Yapan:** ${executor.tag}`, 'Red');
        } else {
            sendLog(channel.guild, 'volta-webhook-log', 'Whitelist - Webhook Güncellendi', `**Kanal:** ${channel.name}\n**İşlem Yapan:** ${executor.tag}\n**Whitelist'te olduğu için işlem yapılmadı.**`, 'Green');
        }
    }
};
