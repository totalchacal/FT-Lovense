
const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder} = require('discord.js')
var mysql = require('mysql');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
module.exports = {
    data: new SlashCommandBuilder()
    .setName('randomlink')
    .setDescription('give you 2 random link to use'),
    
    async execute(interaction,client){
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
          var con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            //password: process.env.PASSWORD,
            database: process.env.DATABASE
          });
          con.connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * FROM `links`";
            con.query(sql, function (err, result) {
              if (err) throw err;
              var normalResults = result.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });
            if(normalResults.length == 0){
                interaction.reply({content :"There are no link currently avaible, come back later sorry", ephemeral: true})
                return("")
            }
            theFullList = ""
            i = 0

            while(i != Object.keys(normalResults).length ){
                //console.log(result[i])

                firstWho =  result[i].who
                //const User = client.users.cache.get(firstWho);
                firsttoys = result[i].toys
                firstTime = result[i].linktime
                firstlink = result[i].link
                theFullList = theFullList+"<@"+firstWho+"> "+firsttoys+" [Lovense link]("+firstlink+") "+firstTime+"\n"
                i++;
            }
            theFullestList = theFullList.split('\n')
            theFullestList.pop()
            random = getRandomInt(theFullestList.length)
            random2 = getRandomInt(theFullestList.length)
            const embeds = new EmbedBuilder()
            .setTitle("Here's our selection:")
            .setColor('Green')
            .addFields(
                {
                    name: "Choice 1",
                    value: theFullestList[random],
                    inline : true 
                },
                {
                    name: "Choice 2",
                    value: theFullestList[random2],
                    inline : true 
                })
            interaction.reply({
                embeds : [embeds],
                ephemeral : true
            })
            });
            con.end()
          });    
    }
}