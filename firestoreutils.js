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
      this.setBeerRating(msg, db, {
        name: fields[0].value,
        company: fields[1] ? fields[1].value : null,
        rating: fields[2].value,
        description: fields[3] ? fields[3].value : null,
        image: fields[4] ? fields[4].value : null,
      });
    }
  },
};
