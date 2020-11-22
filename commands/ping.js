module.exports.run = async (client, msg, args, db) => {
  msg.channel.send("Pong.");
};

module.exports.help = {
  name: "ping",
};
