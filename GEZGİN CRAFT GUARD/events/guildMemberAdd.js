const { sendLog } = require('../helpers/logHelper');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const accountAge = Date.now() - member.user.createdTimestamp;
        const isNewAccount = accountAge < (1000 * 60 * 60 * 24 * 7); // 7 günden yeni hesap

        if (isNewAccount) {
            await member.kick('Yeni hesap girişi yasak.');
            sendLog(member.guild, 'volta-yenihesap-log', 'Yeni Hesap Girişi Engellendi', `**Kullanıcı:** ${member.user.tag}\n**Hesap Açılış Tarihi:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>\n**Durum:** Sunucudan atıldı.`, 'Red');
            return;
        }

        if (!member.user.username || member.user.username === '᲼') {
            await member.kick('Görünmez isimle giriş yasak.');
            sendLog(member.guild, 'volta-gorunmezhesap-log', 'Görünmez Hesap Girişi Engellendi', `**Kullanıcı:** ${member.user.tag}\n**Durum:** Sunucudan atıldı.`, 'Red');
        }
    }
};
