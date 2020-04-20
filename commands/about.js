const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send(`YOUR INFO:\n
                                Your Username: ${message.author.username}\n
                                Your ID: ${message.author.id}\n
                                \n
                                SERVER INFO:\n
                                Server Name: ${message.guild.name}\n
                                Total Members: ${message.guild.memberCount} 
                                `);
}

module.exports.help = {
    name: "about"

}