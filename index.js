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


bot.on('voiceStateUpdate', (oldMember, newMember) => {
    // Here I'm storing the IDs of their voice channels, if available
    let oldChannel = oldMember.voiceChannel ? oldMember.voiceChannel.id : null;
    let newChannel = newMember.voiceChannel ? newMember.voiceChannel.id : null;
    if (oldChannel == newChannel) return; // If there has been no change, exit
  
    // Here I'm getting the bot's channel (bot.voiceChannel does not exist)
    let botMember = oldMember.guild.member(bot.user),
      botChannel = botMember ? botMember.voiceChannel.id : null;
  
    // Here I'm getting the channel, just replace VVV this VVV with the channel's ID
    let textChannel = oldMember.guild.channels.get('CHANNEL_ID_HERE');
    if (!textChannel) throw new Error("That channel does not exist.");
  
    // Here I don't need to check if they're the same, since it would've exit before
    if (newChannel == botChannel) {
      // console.log("A user joined.");
      textChannel.send(`${newMember} has joined the voice channel.`);
    } else if (oldChannel == botChannel) {
      // console.log("A user left.");
      textChannel.send(`${newMember} has left the voice channel.`);
    }
  });

bot.login(process.env.token);

