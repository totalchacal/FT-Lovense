
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Menu for the bot'),
    
    async execute(interaction){
        const embeds = new EmbedBuilder()
        .setTitle('help')
        .setDescription("bot help menu")
        .setColor('Green')
        .setAuthor({name:interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        .addFields(
            {
                name: 'FAQ',
                value: 'example text',
                inline : true 
            },
            {
                name: 'zob',
                value: 'example text',
                inline : true 
            }
            //inline true cote a cote  false over under
        )
        await interaction.reply({
            embeds : [embeds],
            ephemeral : true
        })
    }
}