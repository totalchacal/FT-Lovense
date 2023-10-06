
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
              if (err) throw  con.on('error', function(err) {
                console.log("[mysql error]",err);
              });;
              var normalResults = result.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });

            theFullList = ""
            i = 0
            hasBeenFound  = false
            while(i != Object.keys(normalResults).length ){
                firstWho =  result[i].who
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

                let user = client.users.cache.get(firstWho);
                //console.log(user.username)
                theFullList = theFullList+"♥ <@"+user+"> "+firsttoys+" [Lovense link]("+firstlink+") "+firstTime+"\n"
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
                while (i < 5 && isUdefined === false){
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
                i = 5
                a = 0
                ListToModify = []
                ListToshow = "" 
                isUdefined = false
                while (i < page*5 && isUdefined === false){
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
                i = page*5-5
                a = 0
                ListToModify = []
                ListToshow = "" 
                isUdefined = false
                while (i < page*5 && isUdefined === false){
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