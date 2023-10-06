
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
                multipletoys = firsttoys.split(" ")
                if(multipletoys.length == 3){
                    switch (multipletoys[0]){
                        case 'Max':
                            multipletoys[0] = "<:max:986091013145763840>"
                            break;
                        case 'Hush':
                            multipletoys[0] = "<:hush:986091004069281842>"
                                break;
                        case 'Edge':
                            multipletoys[0] = "<:edge:986090994816647219>"  
                            break;
                        case 'Gravity':
                            multipletoys[0] = "<:Gravity:1073084351253852221>"
                            break;
                        case 'Gush':
                            multipletoys[0] = "<:gush:986091002139926598>"
                            break;
                        case 'Domi':
                            multipletoys[0] = "<:domi:986090993445138432>"
                                break;
                        case 'Calor':
                            multipletoys[0] = "<:calor:986090987950587904>"
                                break;
                        case 'Ridge':
                            multipletoys[0] = "<:Ridge:1153629725802102794>"
                                break;
                        case 'Nora':
                            multipletoys[0] = "<:nora:986091016618663996>"
                                break;
                        case 'Flexer':
                            multipletoys[0] = "<:Flexer:1073084021753520218>"
                                break;
                    }
                    switch (multipletoys[2]){
                        case 'Max':
                            multipletoys[2] = "<:max:986091013145763840>"
                            break;
                        case 'Hush':
                            multipletoys[2] = "<:hush:986091004069281842>"
                                break;
                        case 'Edge':
                            multipletoys[2] = "<:edge:986090994816647219>"  
                            break;
                        case 'Gravity':
                            multipletoys[2] = "<:Gravity:1073084351253852221>"
                            break;
                        case 'Gush':
                            multipletoys[2] = "<:gush:986091002139926598>"
                            break;
                        case 'Domi':
                            multipletoys[2] = "<:domi:986090993445138432>"
                                break;
                        case 'Calor':
                            multipletoys[2] = "<:calor:986090987950587904>"
                                break;
                        case 'Ridge':
                            multipletoys[2] = "<:Ridge:1153629725802102794>"
                                break;
                        case 'Nora':
                            multipletoys[2] = "<:nora:986091016618663996>"
                                break;
                        case 'Flexer':
                            multipletoys[2] = "<:Flexer:1073084021753520218>"
                                break;
                    }
                    firsttoys = multipletoys[0] + " " + multipletoys[2]
                }
                switch (firsttoys){
                    case 'Max':
                        firsttoys = "<:max:986091013145763840>"
                        break;
                    case 'Hush':
                        firsttoys = "<:hush:986091004069281842>"
                            break;
                    case 'Edge':
                        firsttoys = "<:edge:986090994816647219>"  
                        break;
                    case 'Gravity':
                        firsttoys = "<:Gravity:1073084351253852221>"
                        break;
                    case 'Gush':
                        firsttoys = "<:gush:986091002139926598>"
                        break;
                    case 'Domi':
                        firsttoys = "<:domi:986090993445138432>"
                            break;
                    case 'Calor':
                        firsttoys = "<:calor:986090987950587904>"
                            break;
                    case 'Ridge':
                        firsttoys = "<:Ridge:1153629725802102794>"
                            break;
                    case 'Nora':
                        firsttoys = "<:nora:986091016618663996>"
                            break;
                    case 'Flexer':
                        firsttoys = "<:Flexer:1073084021753520218>"
                            break;
                }
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