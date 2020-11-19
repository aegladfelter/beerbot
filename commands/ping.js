module.exports.run = async (client, msg, args) => {
    msg.channel.send('Pong.');
};
    
module.exports.help = {
    name: 'ping'
};