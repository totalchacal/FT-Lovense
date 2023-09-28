const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("launch a ping"),
    async execute(interaction){
        interaction.reply("pong")
    }
}