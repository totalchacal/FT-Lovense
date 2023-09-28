const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("get the lovense qrcode to join our group"),
    async execute(interaction){
        interaction.reply({files:[{ attachment: './ressources/qrcode.jpg' }]})
    }
}