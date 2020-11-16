require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

// GCP SETUP

const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucket = storage.bucket('moss-gaming-beer')

// The function that returns a JSON string
const readJsonFromFile = async remoteFilePath => new Promise((resolve, reject) => {
let buf = ''
bucket.file(remoteFilePath)
    .createReadStream()
    .on('data', d => (buf += d))
    .on('end', () => resolve(buf))
    .on('error', e => reject(e))
});
// END GCP SETUP

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    this.msg = msg;
    if (msg.content.startsWith(PREFIX+'beer')) {
        //msg.channel.send('Beer successfully logged!');
        // get the beer list
        const args = msg.content.slice(PREFIX.length).trim().split(' ');
        this.beerToFind;
        if (args[1]) {
            this.beerToFind = args[1];
        } else {
           // msg.channel.send('Please provide a beer to search for!');
           return;
        }
        
        (async () => {
            try {
                const json = await readJsonFromFile('sample-beer-data.json')
                var beerVal = JSON.parse(json).beerlist[this.beerToFind];
                var rating = beerVal.ratings.user1;
                var description = beerVal.descriptions.user1;
                this.msg.channel.send(this.beerToFind + ': (user1) ' + rating + " Description: (user1) " + description);
            } catch (e) {
                console.error(e)
            }
        }).bind(this)();

        console.log(msg.content);
        //msg.react('✅');
        //msg.react('🚫');
    } else if (msg.content === PREFIX+'ping') {
		msg.channel.send('Pong.');
	} else if (msg.content.startsWith(PREFIX+'kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            msg.reply('Please tag a valid user!');
        }
  }
})