const {SlashCommandBuilder} = require('discord.js')
var mysql = require('mysql');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sendlink')
    .setDescription('allow you to send a control link to the bot some dommes can use it')
    .addStringOption(option2 => option2 
        .setName('string')
        .setDescription(`link to send as a whole, copy paste the whole thing we'll take care of the rest`)
        .setRequired(true)
        ),
    async execute(interaction){
        const text = interaction.options.getString('string');
        splitted = text.split("[")
        toys = splitted[1].split("]")
        linkTime = splitted[2].split("]")
        link = linkTime[1]
        toyToSave = toys[0]
        linkTimeToSave = linkTime[0]
        linkToSave = link.trim()
        
        if(toyToSave.search(",") != -1){
            toyParsing = toyToSave.split(',')
            toyToSave1 = toyParsing[0]
            toyToSave2 = toyParsing[1]

            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                database: "lovsense"
              });
            con.connect(function(err) {
                if (err) throw err;
                var sql = "INSERT INTO `links` (`id`, `who`, `toys`, `linktime`, `link`) VALUES (NULL,'"+ interaction.user.id + "','"+toyToSave1+ " " + toyToSave2 +"','"+linkTimeToSave+ "', '"+linkToSave+"')";
                console.log(sql)
                con.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log(result);
                });
                con.end()
              });
              interaction.reply("link has been saved");
        }else{
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                database: "lovsense"
              });
            con.connect(function(err) {
                if (err) throw err;
                var sql = "INSERT INTO `links` (`id`, `who`, `toys`, `linktime`, `link`) VALUES (NULL,'"+ interaction.user.id + "','"+toyToSave+"','"+linkTimeToSave+ "', '"+linkToSave+"')";
                con.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log(result);
                });
                con.end()
              });
              interaction.reply("link has been saved");
        }
    }
}