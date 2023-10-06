
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
        /*.addFields(
            {
                name: 'Avaible commands',
                value: '/qrcode\n/linkpublished\n/randomlink\n/sendlink\n/removelink',
                inline : true 
            }
        )*/
        .addFields(
            {
                name: '/qrcode',
                value: 'No argument required, receive the qr code of the FT Group',
                inline : false 
            }
        )
        .addFields(
            {
                name: '/linkpublished',
                value: 'Page argument can be added, not required display all the currently avaible links\nExample: /linkpublished page:1',
                inline : false 
            }
        )
        .addFields(
            {
                name: '/randomlink',
                value: 'No argument required, fetch two random links to play with',
                inline : false 
            }
        )
        .addFields(
            {
                name: '/sendlink',
                value: 'Require an argument, copy paste the controllink from your lovense app, should be under this format:\n/sendlink string:[toy] [timer] lovense link',
                inline : false 
            }
        )
        .addFields(
            {
                name: '/removelink',
                value: 'Require an argument, fetch the link you wanna delete and paste it after the command, should be under this format:\n/removelink string:lovense link',
                inline : false 
            }
        )
        await interaction.reply({
            embeds : [embeds],
            ephemeral : true
        })
    }
}