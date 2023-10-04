const {SlashCommandBuilder} = require('discord.js')
var mysql = require('mysql');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
module.exports = {
    data: new SlashCommandBuilder()
    .setName('removelink')
    .setDescription('allow you to send a control link to the bot some dommes can use it')
    .addStringOption(option2 => option2 
        .setName('link')
        .setDescription(`link to send as a whole, copy paste the whole thing we'll take care of the rest`)
        .setRequired(true)
        ),
    async execute(interaction){
      const text = interaction.options.getString('link')
      var con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        //password: process.env.password,
        database: process.env.DATABASE
      });
      con.connect(function(err) {
          if (err) throw err;
          var sql = "DELETE FROM `links` WHERE `who` LIKE '"+ interaction.user.tag + "' AND `link` LIKE '"+ text +"'";
          con.query(sql, function (err, result) {
            if (err) throw err;
            //interaction.reply("links were deleted")
            interaction.reply({content :"If the link exist it was deleted", ephemeral: true})
          });
          con.end()
        }); 
    }
}