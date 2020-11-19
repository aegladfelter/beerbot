require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
client.commands = new Map();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

// Cloud Storage SETUP
// const { Storage } = require('@google-cloud/storage')
// const storage = new Storage()
// const bucket = storage.bucket('moss-gaming-beer')

// // The function that returns a JSON string
// const readJsonFromFile = async remoteFilePath => new Promise((resolve, reject) => {
// let buf = ''
// bucket.file(remoteFilePath)
//     .createReadStream()
//     .on('data', d => (buf += d))
//     .on('end', () => resolve(buf))
//     .on('error', e => reject(e))
// });
// END Cloud Storage SETUP

// FIRESTORE SETUP
const admin = require('firebase-admin');

const serviceAccount = require('./../beerbot-295821-f6a45f63797f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// END FIRESTORE SETUP

client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
  // register all our chat commands from the /commands folder
  readdir('./commands/', (error, files) => {
    if (error) throw error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return; // make sure the file is what you are looking for
      try {
        const properties = require(`./commands/${file}`);
        client.commands.set(properties.help.name, properties);
      } catch (err) {
        throw err;
      }  
    });
  });
});

client.on('message', msg => {
    if (!msg.guild) return; // exit if the message does not have a guild
    if (msg.author.bot) return; // exit if the message author is a bot

    // remove the prefix and map each arg to an array
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/g).map(Function.prototype.call, String.prototype.trim);
    
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) { // the message is not a command we know of
        if (msg.mentions.members.first() && args[0] === '🍻') { // there's at least one mentioned user and a cheers emoji
            const func = client.commands.get("cheer");
            func.run(client, msg, args, db);
        }   
    } else { // run the command 
        cmd.run(client, msg, args); 
    }
});