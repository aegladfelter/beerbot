var getJSON = require('get-json')

const forbiddenWords = ['a', 'an', 'the'];

module.exports.run = async (client, msg, args, db) => {
    try {
        var drinkName = "";
        var firstWord = args.shift();

        if (!forbiddenWords.some(word => firstWord === word)) {
            drinkName = firstWord + " ";
        }
        // yes this is dumb because we deconstruct the full message in index.js but im lazy shutup todo change
        args.forEach(function (item, index) {
            drinkName += item.replace(/[!?.]+(?=$|\s)/, '');
            drinkName += " ";
        });

        var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName.trim();

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
                msg.channel.send("Great question! This is how to make: " + name + "\n" + ingredients + " \n" + instructions);
                //console.log(response);
            } else {
                msg.channel.send("Hmm. . . I'm not sure how to make that one.");
            }

        });
    } catch (e) {
        msg.channel.send("Hmm. . . I'm not sure how to make that one.");
    }
};

module.exports.help = {
  name: 'howdoimake'
};