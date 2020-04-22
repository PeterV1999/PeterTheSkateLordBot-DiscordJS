const discord = require("discord.js");

module.exports = async (client,message,oldMember,newMember) => {
    if(newMember.bot) return;

    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel


    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        return message.channel.send(`PONG! (DONT ABUSE THIS COMMAND ${message.author.username})`);

    } else if(newUserChannel === undefined){

      // User leaves a voice channel

    }

   }


module.exports.help = {
    name: "track"

}