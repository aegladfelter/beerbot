module.exports.run = async (client, msg, args, db) => {
    console.log('Begin logging beer. . .');
    this.beerToFind = args[0];

    try {
        // const json = await readJsonFromFile('sample-beer-data.json')
        // var beerVal = JSON.parse(json).beerlist[this.beerToFind];
        // var rating = beerVal.ratings.user1;
        // var description = beerVal.descriptions.user1;
        // this.msg.channel.send(this.beerToFind + ': (user1) ' + rating + " Description: (user1) " + description);
    } catch (e) {
        console.error(e);
    }

    console.log(msg.content);
    // msg.react('✅');
    // msg.react('🚫');
};

module.exports.help = {
  name: 'beer'
};