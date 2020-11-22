const Discord = require('discord.js');

module.exports.run = async (client, msg, args, db) => {
    console.log('Begin logging beer. . .');
    if (args.length === 0) {
        try {
            msg.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    fields: [
                        {
                            name: "Form: ",
                            value: "Fill out this [form](https://docs.google.com/forms/d/e/1FAIpQLSdl6DmkipMGtfg61lhY4bEMK5ewTrYCfaWlwbXcGH3LEUgGQg/viewform?vc=0&c=0&w=1&flr=0&gxids=7628) to log your drink!"
                        }
                    ]
                }
            });
        } catch (e) {
            console.log(e);
        }
        
        // try {
        //     const embed = new Discord.MessageEmbed();
        //     embed.addFields("Fill out this [form](https://docs.google.com/forms/d/e/1FAIpQLSdl6DmkipMGtfg61lhY4bEMK5ewTrYCfaWlwbXcGH3LEUgGQg/viewform?vc=0&c=0&w=1&flr=0&gxids=7628) to log your drink!");
        //     msg.channel.send(embed);
        //     return;
        // } catch (e) {
        //     console.log(e);
        // }
        
    }
    
    this.beerToFind = args[0];

    try {
        // const json = await readJsonFromFile('sample-beer-data.json')
        // var beerVal = JSON.parse(json).beerlist[this.beerToFind];
        // var rating = beerVal.ratings.user1;
        // var description = beerVal.descriptions.user1;
        // this.msg.channel.send(this.beerToFind + ': (user1) ' + rating + " Description: (user1) " + description);
    } catch (e) {
        console.error(e)
    }

    console.log(msg.content);
    // msg.react('✅');
    // msg.react('🚫');
};

module.exports.help = {
  name: 'beer'
};