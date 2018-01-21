const bot = require("../Bot.js");
const Bot = new bot();
const fs = require("fs");

module.exports = class extends bot {
    /**
     * @param  {string} command Command (one of <bot>.commands)
     * @returns {boolean} 
     */
    constructor(){
        super();
    }
    static checkCommand(command) {
        if(Object.keys(Bot.commands.fun).includes(command) || 
        Object.keys(Bot.commands.owner).includes(command) || 
        Object.keys(Bot.commands.moderation).includes(command) ||
        Object.keys(Bot.commands.miscellaneous).includes(command)) return true;
        else return false;
    }
    /**
     * @param  {string} command Command (one of <bot>.commands)
     * @param  {object} message Message object
     */
    static runCommand(command, message) {
        let __command = command;
        command += ".js";
        command = command.toLowerCase();
        command = command.charAt(0).toUpperCase() + command.substr(1).toLowerCase();
        let _command;
        if(fs.existsSync(`./commands/fun/${command}`)){
            _command = require(`./fun/${command}`);
        }else if(fs.existsSync(`./commands/miscellaneous/${command}`)){
            _command = require(`./miscellaneous/${command}`);
        }else if(fs.existsSync(`./commands/moderation/${command}`)){
            _command = require(`./moderation/${command}`);
        }else if(fs.existsSync(`./commands/owner/${command}`)){
            _command = require(`./owner/${command}`);
        }
        if(Object.keys(Bot.commands.owner).includes(__command)){
            if(message.author.id != Bot.owner) return message.react("389090190506852353");
        }
        // Hardcode
        if(__command == "clear" || __command == "mute" || __command == "unmute"){
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.react("389090190506852353");
        }
        if(__command == "ban" || __command == "softban" || __command == "unban"){
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.react("389090190506852353");
        }
        new _command(message).run();
    }
}