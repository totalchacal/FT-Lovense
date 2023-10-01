
const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder,ButtonStyle,ActionRowBuilder} = require('discord.js')
var mysql = require('mysql');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('linkpubished')
    .setDescription('show all the link that got published')
    .addStringOption(option2 => option2 
        .setName('page')
        .setDescription(`the page you want (default page is the first one)`)
        .setRequired(false)
        ),
    async execute(interaction){
        const page = interaction.options.getString('page');

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
                firstWho =  result[i].who
                firsttoys = result[i].toys
                firstTime = result[i].linktime
                firstlink = result[i].link
                theFullList = theFullList+""+firstWho+" "+firsttoys+" "+firstlink+" "+firstTime+"\n"
                i++;
            }
            theFullestList = theFullList.split('\n')
            theFullestList.pop()
            if(page == null){
                i = 0
                ListToModify = []
                ListToshow = "" 
                isUdefined = false
                while (i < 10 && isUdefined === false){
                    if(theFullestList[i] === undefined){
                        isUdefined = true
                    }else{
                        ListToModify.push(theFullestList[i])
                        ListToshow = ListToshow + ListToModify[i] +"\n"
                        i++
                    }
                }
                interaction.reply({content :ListToshow, ephemeral: true})
            }
            else if(page == "2"){
                i = page*5
                a = 0
                ListToModify = []
                ListToshow = "" 
                isUdefined = false
                while (i < page*10 && isUdefined === false){
                    if(theFullestList[i] === undefined){
                        isUdefined = true
                    }else{
                        ListToModify.push(theFullestList[i])
                        ListToshow = ListToshow + ListToModify[a] +"\n"
                        i++
                        a++
                    }

                }
                if(!ListToshow){
                    ListToshow = "Nothing to see here go back a page"
                    interaction.reply({content :ListToshow, ephemeral: true})
                }else{
                    interaction.reply({content :ListToshow, ephemeral: true})
                }
            }
            else{
                i = page*10-10
                a = 0
                ListToModify = []
                ListToshow = "" 
                isUdefined = false
                while (i < page*10 && isUdefined === false){
                    if(theFullestList[i] === undefined){
                        isUdefined = true
                    }else{
                        ListToModify.push(theFullestList[i])
                        ListToshow = ListToshow + ListToModify[a] +"\n"
                        i++
                        a++
                    }
                }
                if(!ListToshow){
                    ListToshow = "Nothing to see here go back a page"
                    interaction.reply({content :ListToshow, ephemeral: true})
                }else{
                    interaction.reply({content :ListToshow, ephemeral: true})
                }
            }







            i = 0
            tiddiedupList = []
            while(i < theFullestList.length-1) {
                temp = theFullestList[i]
                temp2 = temp.split(" ")
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
            /*const embeds = new EmbedBuilder()
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
                })*/
            //console.log(theFullestList)
            //interaction.reply({content :theFullList, ephemeral: true})
            });
            con.end()
          });    
    }
}