
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
var mysql = require('mysql');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
module.exports = {
    data: new SlashCommandBuilder()
    .setName('linkpubished')
    .setDescription('show all the link that got published')
    .addStringOption(option2 => option2 
        .setName('page')
        .setDescription(`the page you want (default page is the first one)`)
        .setRequired(false)
        ),
    async execute(interaction,client){
        const page = interaction.options.getString('page');
        let user = client.users.cache.get("133255249560338432");
        console.log(user.username)
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
            theFullList = ""
            i = 0

            while(i != Object.keys(normalResults).length ){
                firstWho =  result[i].who
                firsttoys = result[i].toys
                firstTime = result[i].linktime
                firstlink = result[i].link
                theFullList = theFullList+"♥ <@"+/*firstWho*/user+"> "+firsttoys+" [Lovense link]("+firstlink+") "+firstTime+"\n"
                i++;
            }
            theFullestList = theFullList.split('\n')
            theFullestList.pop()
            if(page == null){
                i = 0
                a = 0
                ListToModify = []
                ListToshow = "" 
                isUdefined = false
                while (i < 10 && isUdefined === false){
                    if(theFullestList[i] === undefined){
                        isUdefined = true
                    }else{
                        ListToModify.push(theFullestList[i])
                        ListToshow = ListToshow + ListToModify[a] +"\n\n"
                        i++
                        a++
                    }

                }
                if(!ListToshow){
                    ListToshow = "Nothing to see here go back a page"
                    interaction.reply({content :ListToshow, ephemeral: true})
                }else{
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .addFields(
                        { name: 'here are the links', value: ListToshow },
                    )
                    //interaction.reply({content :ListToshow, ephemeral: true})
                    interaction.reply({embeds : [exampleEmbed], ephemeral: true})
                }
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
                        ListToshow = ListToshow + ListToModify[a] +"\n\n"
                        i++
                        a++
                    }

                }
                if(!ListToshow){
                    ListToshow = "Nothing to see here go back a page"
                    interaction.reply({content :ListToshow, ephemeral: true})
                }else{
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .addFields(
                        { name: 'here are the links', value: ListToshow },
                    )
                    //interaction.reply({content :ListToshow, ephemeral: true})
                    interaction.reply({embeds : [exampleEmbed], ephemeral: true})
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
                        ListToshow = ListToshow + ListToModify[a] +"\n\n"
                        i++
                        a++
                    }
                }
                if(!ListToshow){
                    ListToshow = "Nothing to see here go back a page"
                    interaction.reply({content :ListToshow, ephemeral: true})
                }else{
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .addFields(
                        { name: 'here are the links', value: ListToshow },
                    )
                    //interaction.reply({content :ListToshow, ephemeral: true})
                    interaction.reply({embeds : [exampleEmbed], ephemeral: true})
                }
            }
            });
            con.end()
          });    
    }
}