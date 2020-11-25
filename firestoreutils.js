var _ = require('underscore');

var defaults = {
  name: null,
  rating: null,
  company: null,
  image: null,
  description: null
}
// firestoreutils.js
// ========
// All of these fields should be available or nulld
// var dataToSubmit = {
//     name: fields[0].value,
//     company: fields[1].value,
//     rating: fields[2].value,
//     description: fields[3].value,
//     image: fields[4].value
// }
module.exports = {
  setBeerRating: async function (msg, db, beerData) {
    // Add a new document with a generated id.
    db.collection("ratings")
      .add({
        beerData,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        msg.react("✅");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        msg.react("🚫");
      });
  },
  setBeerRatingFromForm: async function (msg, db) {
    var embeds = msg.embeds[0];
    if (embeds) {
      var fields = embeds.fields;
      var beerData = {};

      _.each(fields, function(field) {
        beerData[field.name.toLowerCase()] = field.value;
      });

      _.defaults(beerData, defaults);
      
      this.setBeerRating(msg, db, beerData);
    }
  },
  getBeerRatings: async function (db) {
    const beerCollection = await db.collection("ratings").get();
    const beerCollectionData = beerCollection.docs.map(doc => doc.data()); 
    // parse json
    var ratings = [];
    _.each(beerCollectionData, function(beer) {
      ratings.push({
        "Beer": beer.beerData.name,
        "Rating": beer.beerData.rating
      });
    });

    return ratings;
  }
};
