const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f  => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
            console.log("No Commands were found...")
            return;
    }

    jsfile.forEach((f,i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
        bot.commands.set(props.help.name, props);
    })
})

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity('WITH BTICHES!', { type: 'PLAYING' })

})


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));;
    if(commandfile) commandfile.run(bot, message, args);
})


bot.on('voiceStateUpdate', async(oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if(oldUserChannel !== undefined && newUserChannel !== undefined) {
  
       // User Joins a voice channel
       console.log("A User Joined Voicechat");

    } else if(newUserChannel === undefined){
  
      // User leaves a voice channel
      console.log("A User Left Voicechat");
  
    }
  })

bot.login(process.env.token);

