
const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('says hello')
    .addUserOption(option =>
      option
      .setName('user')
      .setDescription('user to say hi to')
      .setRequired(false)  
    ),
    async execute(interaction){
      let user = interaction.options.getUser('user')
      if(!user) user = interaction.user;
      interaction.reply(`Hello ${interaction.user.tag}`)
    }
}