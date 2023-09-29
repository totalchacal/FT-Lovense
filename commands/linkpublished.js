
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
            theFullList = ""
            i = 0

            while(i != Object.keys(normalResults).length ){
                //console.log(result[i])

                firstWho =  result[i].who
                //const User = client.users.cache.get(firstWho);
                firsttoys = result[i].toys
                firstTime = result[i].linktime
                firstlink = result[i].link
                theFullList = theFullList+firstWho+" "+firsttoys+" "+firstlink+" "+firstTime+"\n"
                i++;
            }
            theFullestList = theFullList.split('\n')
            i = 0
            tiddiedupList = []
            while(i < theFullestList.length-1) {
                temp = theFullestList[i]
                temp2 = temp.split(" ")
                //console.log(temp2.length)
                if(temp2.length == 6){
                    tiddiedupList.push(temp2[0])
                    tiddiedupList.push(temp2[1] +" " +temp2[3])
                    tiddiedupList.push(temp2[4])
                    tiddiedupList.push(temp2[5])
                }
                else{
                    tiddiedupList.push(temp2[0])
                    tiddiedupList.push(temp2[1])
                    tiddiedupList.push(temp2[2])
                    tiddiedupList.push(temp2[3])
                }
                i++
            }
            const embeds = new EmbedBuilder()
            .setTitle('Published link so far...')
            .setColor('Green')
            .addFields(
                {
                    name: tiddiedupList[0],
                    value: tiddiedupList[1] +'\n'+tiddiedupList[2]+"\n"+tiddiedupList[3],
                    inline : true 
                },
                {
                    name: tiddiedupList[4],
                    value: tiddiedupList[5] +'\n'+tiddiedupList[6]+"\n"+tiddiedupList[7],
                    inline : true 
                })
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