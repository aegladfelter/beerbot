module.exports.run = async (client, msg, args, db) => {
    if (msg.mentions.users.size) {
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
        msg.reply('Please tag a valid user!');
    }
};

module.exports.help = {
  name: 'kick'
};