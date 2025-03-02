module.exports = {
     name: 'messageCreate',
     execute: async (client, message) => {
         if (message.author.bot || !message.guild) return;
         if (!message.content.startsWith(client.config.prefix)) return;
 
         const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
         const commandName = args.shift().toLowerCase();
 
         const command = client.commands.get(commandName);
         if (command) command.execute(client, message, args);
     }
 };
 
