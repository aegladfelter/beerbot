module.exports.run = async (client, msg, args) => {
    // (async () => {
    //     try {
    //         const snapshot = await db.collection('cheers').get();
    //         snapshot.forEach((doc) => {
    //             this.msg.channel.send(doc.data().username + ": " + doc.data().cheerCount + " 🍻");
    //             console.log(doc.id, '=>', doc.data());
    //         });
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }).bind(this)();
};

module.exports.help = {
  name: 'cheerlist'
};