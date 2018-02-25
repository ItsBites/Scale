const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                    let user = this.message.guild.members.filter(m => new RegExp(this.message.content.split(" ").slice(1).join(" ")).test(m.user.username)).first();
                    if(!user) return this.message.reply("User not found!");
                    user = user.user;
                    this.message.channel.send(new Discord.RichEmbed()
                        .setTitle("User Info")
                        .setColor("RANDOM")
                        .setDescription("Here are some information about " + user.tag)
                        .addField("Tag", user.tag)
                        .setThumbnail(user.displayAvatarURL)
                        .addField("Registered", new Date(user.createdAt).toLocaleDateString())
                        .addField("Joined", new Date(this.message.guild.member(user).joinedAt).toLocaleDateString())
                        .addField("Roles", this.message.guild.member(user).roles.map(r => r.name).join(", "))
                        .addField("Nickname", this.message.guild.member(user).nickname || '/')
                        .addField("Playing", user.presence.game ? user.presence.game.name : "/")
                        .addField("Highest Role", this.message.guild.member(user).highestRole.name)
                    ).catch(e => console.log(e));
            } catch (e) {
            }
        }
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands.miscellaneous.u.status) {
            this._run(this.message);
        }
    }
}