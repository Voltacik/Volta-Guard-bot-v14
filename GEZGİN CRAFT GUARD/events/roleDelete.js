const { sendLog } = require('../helpers/logHelper');

module.exports = {
    name: 'roleDelete',
    async execute(role) {
        const auditLogs = await role.guild.fetchAuditLogs({ type: 32 });
        const logEntry = auditLogs.entries.first();

        if (!logEntry || !logEntry.executor) return;

        const executor = logEntry.executor;
        const isWhitelisted = role.client.whitelist.get(executor.id)?.includes('rol');

        if (!isWhitelisted) {
            const newRole = await role.guild.roles.create({
                name: role.name,
                color: role.color,
                permissions: role.permissions
            });

            sendLog(role.guild, 'volta-rol-log', 'Rol Silindi', `**Silinen Rol:** ${role.name}\n**Silen Kişi:** ${executor.tag}\n**Rol Geri Açıldı.**`, 'Red');
        } else {
            sendLog(role.guild, 'volta-rol-log', 'Whitelist - Rol Silindi', `**Silinen Rol:** ${role.name}\n**Silen Kişi:** ${executor.tag}\n**Whitelist'te olduğu için işlem yapılmadı.**`, 'Green');
        }
    }
};
