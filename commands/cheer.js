module.exports.run = async (client, msg, args, db) => {
    var firstMentionedUser = msg.mentions.members.first().user;
    var username = firstMentionedUser.username;
    var id = firstMentionedUser.id;

    // attempt to update firestore / user existence check
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
        } else {
            // 🤮
            // user already exists - grab the current count and increment
            console.log('User exists in cheers data - incrementing stored cheer count!')
            var properties = await userData.get();
            data.cheerCount = properties.get("cheerCount") + 1;
        }
        // actually update firestore
        setCheerCount(data, msg, userData);
    } catch (e) {
        console.log("error occurred while querying for user - this is unexpected. . .");
        console.error(e)
    }

    console.log(username + " just got a cheer!");
};

module.exports.help = {
  name: 'cheer'
};

var messagePrefix = [
    "Bottoms up!",
    "Yee haw",
    "Woo-hoo",
    "!לחיים",
    "Prost!",
    "¡Salud!",
    "Cheers!",
    "Wassail!",
    "Big whoop",
    "Yipeee!"
]

async function setCheerCount(data, msg, userData) {
    var randomQuote = messagePrefix[Math.floor(Math.random() * Math.floor(messagePrefix.length))];
    const res = await userData.set(data);
    if (res.error) {
        msg.channel.send("Uh oh! - an error occurred, cheer could not be set.")
    } else {
        var suffixStr = data.cheerCount === 1 ? " cheer!" : " cheers!"
        msg.channel.send(randomQuote + " - " + msg.mentions.members.first().user.toString() + " has " + data.cheerCount + suffixStr);
    }
}
