var fs = require('fs');
var mysql = require('mysql');
const { Client, Events,  GatewayIntentBits, SlashCommandBuilder} = require('discord.js');
const { token } = require('./config.json');
const { stringify } = require('querystring');
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, c => {
    console.log(`logged in as ${c.user.tag}`);
    const qrcode = new SlashCommandBuilder()
        .setName('qr_code')
        .setDescription('get the lovense qrcode to join our group')    


    const sendLink = new SlashCommandBuilder()
        .setName('sendlink')
        .setDescription('allow you to send a control link to the bot some dommes can use it')
        .addStringOption(option2 => option2 
            .setName('string')
            .setDescription(`link to send as a whole, copy paste the whole thing we'll take care of the rest`)
            .setRequired(true)
            );
    
    
    const removeLink = new SlashCommandBuilder()
            .setName('removelink')
            .setDescription('allow you to remove your unwanted links')
            .addStringOption(option2 => option2 
                .setName('link')
                .setDescription(`link to send as a whole, copy paste the whole thing we'll take care of the rest`)
                .setRequired(true)
                );
            
    const getLink = new SlashCommandBuilder()
            .setName('getlink')
            .setDescription('allow you get all the links that a person put to use')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('The user you want the link from')
                    .setRequired(true)
            );
    const onlinepeople = new SlashCommandBuilder()
            .setName('onlinepeople')
            .setDescription('See who posted a link that you may use')
        client.application.commands.create(sendLink)
        client.application.commands.create(getLink)
        client.application.commands.create(removeLink)
        client.application.commands.create(onlinepeople)
        client.application.commands.create(qrcode)

})

client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName === 'qrcode'){
     interaction.reply({files:[{ attachment: 'ressources/qrcode.jpg' }]});
  }
    if(interaction.commandName === 'set_intensity'){
        const text = interaction.options.getString('number');
        if ((parseInt(text)> 100 || parseInt(text)<0) || isNaN(text)){
            interaction.reply("what has been sent is not a number between 0 and 100")
        }else{
            interaction.reply(text);
        }
    }

    if(interaction.commandName === 'sendlink'){
        const text = interaction.options.getString('string');
        splitted = text.split("[")
        toys = splitted[1].split("]")
        linkTime = splitted[2].split("]")
        link = linkTime[1]
        toyToSave = toys[0]
        linkTimeToSave = linkTime[0]
        linkToSave = link
        
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
              //interaction.deferReply()
              interaction.reply("link has been saved");
        }


    }

    if(interaction.commandName === 'getlink'){
        const text = interaction.options.getMember('user')
        stringifylmao = JSON.stringify(text)
        sbeve = stringifylmao.split('userId')
        sbeve2 = JSON.stringify(sbeve[1])
        sbeve3 = sbeve2.split(`\"`)
        perfect = sbeve3[3].slice(0,-1)

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "lovsense"
          });
        con.connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * FROM `links` WHERE `who` LIKE '"+perfect+"'";
            con.query(sql, function (err, result) {
              if (err) throw err;
              var normalResults = result.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });
            theFullList = "here are the toys and links:\n\n"
            i = 0
            while(i != Object.keys(normalResults).length ){
                firsttoys = result[i].toys
                firstTime = result[i].linktime
                firstlink = result[i].link
                theFullList = theFullList+"Toy(s): "+firsttoys+"\nLink: "+firstlink+"\nLink time: "+firstTime+"\n\n"
                i++;
            }
            interaction.reply(theFullList)
            });
            con.end()
          });    
    }

    if(interaction.commandName === 'removelink'){
        const text = interaction.options.getString('link')
        console.log(text)
        console.log(interaction.user.id)
        //interaction.reply(text)
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "lovsense"
          });
        con.connect(function(err) {
            if (err) throw err;
            var sql = "DELETE FROM `links` WHERE `who` LIKE '"+ interaction.user.id + "' AND `link` LIKE ' "+ text +"'";
            con.query(sql, function (err, result) {
              if (err) throw err;
              interaction.reply("links were deleted")
            });
            con.end()
          }); 
    }
    if(interaction.commandName === 'onlinepeople'){
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
                const User = client.users.cache.get(firstWho);
                firsttoys = result[i].toys
                firstTime = result[i].linktime
                firstlink = result[i].link
                theFullList = theFullList+"who: "+User.tag+"\nToy(s): "+firsttoys+"\nLink: "+firstlink+"\nLink time: "+firstTime+"\n\n"
                i++;
            }
            interaction.reply(theFullList)
            });
            con.end()
          });    
    }

    

})

client.login(token);

//TODO

//API
//safeword
// up
//down
//stop
//protect safeword for users 
//see what to put with safword (cooldown so user can get toy out and things)
//get lovsense develloper token

//V0.1
//get link dirctly
//check paint image for v2
//remove link of people who left (timer check used / left link)