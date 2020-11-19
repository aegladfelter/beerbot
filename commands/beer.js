module.exports.run = async (client, msg, args) => {
    // msg.channel.send('Beer successfully logged!');
    // this.beerToFind;
    // if (args[1]) {
    //     this.beerToFind = args[1];
    // } else {
    //     // msg.channel.send('Please provide a beer to search for!');
    //     return;
    // }
    
    // (async () => {
    //     try {
    //         const json = await readJsonFromFile('sample-beer-data.json')
    //         var beerVal = JSON.parse(json).beerlist[this.beerToFind];
    //         var rating = beerVal.ratings.user1;
    //         var description = beerVal.descriptions.user1;
    //         this.msg.channel.send(this.beerToFind + ': (user1) ' + rating + " Description: (user1) " + description);
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }).bind(this)();

    // console.log(msg.content);
    // msg.react('✅');
    // msg.react('🚫');
};

module.exports.help = {
  name: 'beer'
};