
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
var mysql = require('mysql');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('linkpubished')
    .setDescription('show all the link that got published'),
    
    async execute(interaction){

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "lovsense"
          });
          con.connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * FROM `links`";
            con.query(sql, function (err, result) {
              if (err) throw err;
              var normalResults = result.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });
            theFullList = "here are the people online who sent a link:\n\n"
            i = 0

            while(i != Object.keys(normalResults).length ){
                console.log(result[i])

                firstWho =  result[i].who
                //const User = client.users.cache.get(firstWho);
                firsttoys = result[i].toys
                firstTime = result[i].linktime
                firstlink = result[i].link
                theFullList = theFullList+"who: "+firstWho+"\nToy(s): "+firsttoys+"\nLink: "+firstlink+"\nLink time: "+firstTime+"\n\n"
                i++;
            }

            const embeds = new EmbedBuilder()
            .setTitle('help')
            .setDescription("bot help menu")
            .setColor('Green')
            .setAuthor({name:interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
            .addFields(
                {
                    name: theFullList,
                    value: 'here is everything',
                    inline : true 
                },)
           // interaction.reply(theFullList)
            interaction.reply({
                embeds : [embeds],
                ephemeral : true
            })
            });
            //console.log(theFullList)
            con.end()
          });    
    }
}