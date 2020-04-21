const discord = require("discord.js");




module.exports.run = async (bot, message, args) => {

    return message.channel.send({embed: {
        color: 3447003,
        description: "A very simple Embed!"
      }});
}


module.exports.help = {
    name: "about"

}