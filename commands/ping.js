const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // return message.channel.send("Pong!");
    return message.channel.send(`PONG! (DONT ABUSE THIS COMMAND ${message.author.username})`);

}

module.exports.help = {
    name: "ping"

}