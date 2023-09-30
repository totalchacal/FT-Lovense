
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Menu for the bot'),
    
    async execute(interaction){
        const embeds = new EmbedBuilder()
        .setTitle('Help me')
        .setDescription("Here you'll see every avaible command for the bot")
        .setColor('Green')
        .addFields(
            {
                name: 'Avaible commands',
                value: '/qrcode\n/linkpublished\n/randomlink\n/sendlink\n/removelink',
                inline : true 
            }
        )
        await interaction.reply({
            embeds : [embeds],
            ephemeral : true
        })
    }
}