const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('repeat what you wrote')
    .addStringOption(option =>
      option
      .setName('text')
      .setDescription('repeat text to repeat')
      .setRequired(true)  
    ),
    async execute(interaction){
      const text = interaction.options.getString('text')
      interaction.reply(`${text}`)
    }
}