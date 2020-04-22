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


bot.on('presenceUpdate', (oldMember, newMember) => {
    // Wasn't in a VC, now is.
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
      // Don't include this if statement if you want it to be in any voice channel
      if (newMember.voiceChannel.id === 697200713171730455) {
        // return message.channel.send(`PONG! (DONT ABUSE THIS COMMAND ${message.author.username})`);
        return bot.channels.get('701644290287206450').send('Test Worked!');
      }
    }
  })
bot.login(process.env.token);

