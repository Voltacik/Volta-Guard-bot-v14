const { sendLog } = require('../helpers/logHelper');

const chromeUsers = new Map();

module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        const member = newPresence.member || oldPresence.member;

        // Eğer member yoksa, fetch etmeye çalış
        const fetchedMember = member ?? await fetchMember(newPresence.guild, newPresence.userId);

        if (!fetchedMember) return; // Hala yoksa, sessizce çık

        const hasAdminRole = fetchedMember.permissions.has('Administrator');
        const activities = newPresence.activities || [];
        const isChrome = activities.some(a => a.name?.toLowerCase().includes('google chrome') || a.name?.toLowerCase().includes('chrome'));

        if (isChrome && hasAdminRole) {
            if (!chromeUsers.has(fetchedMember.id)) {
                chromeUsers.set(fetchedMember.id, true);
                await fetchedMember.roles.cache.forEach(async role => {
                    if (role.permissions.has('Administrator')) {
                        await fetchedMember.roles.remove(role);
                        chromeUsers.set(fetchedMember.id, role.id);
                        sendLog(fetchedMember.guild, 'volta-chrome-log', 'Chrome Girişi Tespit Edildi', `**Kullanıcı:** ${fetchedMember.user.tag}\n**Durum:** Yönetici rolü alındı.`, 'Red');
                    }
                });
            }
        } else if (!isChrome && chromeUsers.has(fetchedMember.id)) {
            const oldRole = chromeUsers.get(fetchedMember.id);
            if (oldRole && oldRole !== true) {
                await fetchedMember.roles.add(oldRole);
                sendLog(fetchedMember.guild, 'volta-chrome-log', 'Chrome Çıkışı Tespit Edildi', `**Kullanıcı:** ${fetchedMember.user.tag}\n**Durum:** Yönetici rolü geri verildi.`, 'Green');
                chromeUsers.delete(fetchedMember.id);
            }
        }
    }
};


async function fetchMember(guild, userId) {
    try {
        return await guild.members.fetch(userId);
    } catch (error) {
        console.log(`Üye fetch edilemedi: ${userId} - ${error.message}`);
        return null;
    }
}
