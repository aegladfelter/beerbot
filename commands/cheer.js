module.exports.run = async (client, msg, args, db) => {
    var firstMentionedUser = msg.mentions.members.first().user;
    var username = firstMentionedUser.username;
    var id = firstMentionedUser.id;
    var contentAfterTag = msg.content.substr(id.length + 4).trim();

    if (contentAfterTag.startsWith("🍻")) {
        try {
            const userData = await db.collection('cheers').doc(id.toString());
            const doc = await userData.get();

            // create our data object to be set
            var data = {
                cheerCount: null,
                userId: id.toString(),
                username: username
            }

            if (!doc.exists) {
                console.log('User has not been added to the cheers table, creating . . .');
                // Add a new document in cheers collection for this user
                data.cheerCount = 1;
                const res = await db.collection('cheers').doc(id.toString()).set(data);
                if (res.error) {
                    msg.channel.send("Uh oh! - an error occurred, cheer could not be set.")
                } else {
                    msg.channel.send("Bottoms up - @" + username + " has " + 1 + " cheer!")
                }
            } else {
                console.log('User exists in cheers data - incrementing stored cheer count!')
                var properties = await userData.get();
                data.cheerCount = properties.get("cheerCount") + 1;
                const res = await db.collection('cheers').doc(id.toString()).set(data);
                if (res.error) {
                    msg.channel.send("Uh oh! - an error occurred, cheer could not be set.")
                } else {
                    msg.channel.send("Yee haw - @" + username + " has " + data.cheerCount + " cheers!")
                }
            }
        } catch (e) {
            console.log("error occurred while querying for user - this is unexpected. . .");
            console.error(e)
        }
    }

    console.log(username + " just got a cheer!");
};

module.exports.help = {
  name: 'cheer'
};