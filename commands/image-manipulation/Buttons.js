const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                let buttons = {
                    left: this.message.content.split(" ").slice(1).join(" ").split("|")[0] || ' ',
                    right: this.message.content.split(" ").slice(1).join(" ").split("|")[1] || ' '
                }
                Jimp.read("https://imgflip.com/s/meme/Two-Buttons.jpg").then(async (buffer) => {
                    let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
                    buffer.print(font, 110, 120, buttons.left)
                    buffer.print(font, 300, 100, buttons.right)
                    buffer.getBuffer(Jimp.MIME_PNG, sendBuffer)
                }).catch(console.error);
                function sendBuffer(err, buff){
                    message.channel.send("Requested by: " + message.author.tag,new Discord.Attachment(buff, "buttons.png")).catch(console.error);
                }
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
        if (this.commands["image-manipulation"].buttons.status) {
            this._run(this.message);
        }
    }
}