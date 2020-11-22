var getJSON = require('get-json');

module.exports.run = async (client, msg, args, db) => {

    var url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    getJSON(url, function(error, response) {

        if (response.drinks && !error) {
            var drink = response.drinks[0];
            var name = drink.strDrink;
            var image = drink.strDrinkThumb;
            var instructions = "Instructions: " + drink.strInstructions;
            var video = drink.strVideo;
            var ingredients = "Ingredients: \n";

            for (var i=1;i<=15;i++) {
                var potentialIngredient = drink["strIngredient" + i];
                var potentialMeasurement = drink["strMeasure" + i];

                if (potentialIngredient) {
                    ingredients += potentialIngredient;

                    if (potentialMeasurement) {
                        ingredients = ingredients + " - " + potentialMeasurement;
                    }

                    ingredients += "\n";
                }
                
            }
            msg.channel.send("Why not try this? 😋 \n" + "Name: " + name + "\n\n" + ingredients + " \n" + instructions);
            console.log(response);
        } else {
            msg.channel.send("Oops - not sure how this happened. . .");
        }

    });
};

module.exports.help = {
  name: 'randomdrink'
};