module.exports = {
     name: 'interactionCreate',
     execute: async (client, interaction) => {
         if (!interaction.isStringSelectMenu()) return;
 
         if (interaction.customId === 'whitelistMenu') {
             const member = interaction.message.mentions.members.first();
             if (!member) return;
 
             client.whitelist.set(member.id, interaction.values);
             interaction.reply({ content: `${member} kullanıcısı için muafiyet ayarlandı: ${interaction.values.join(', ')}`, ephemeral: true });
         }
     }
 };
 