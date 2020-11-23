# beerbot

Beerbot is a free discord bot used to log beer ratings and display various charts based on those ratings.
It also has a few other commands detailed below

- backed by Google Cloud Firestore - a scalable NoSQL database
- node.js runtime 

## Installation

Prerequisite steps:

<ol>
<li>Install git on your machine and pull down this repo</li>
<li>Install the latest version of <a href="https://nodejs.org/en/">Node</a> </li>
<li>create a `.env` file containing the command prefix and discord bot token </li>
<li>download GCP service credentials in a json format - store this somewhere safe and double check the reference in index.js
</ol>

Note: [nvm](https://github.com/coreybutler/nvm-windows) is a great tool to manage node versions - check it out

Start building! 

```
npm install
```

This will install all of the neccessary node modules and create a new "node modules" folder in the base project

```
node index.js
```

This starts up a local node process to run the bot on your machine - feel free to test away in a discord server.

Note: production version will be ran in GCP - some code may need to change for this.


## Commands and Functionality

```
!beer 
// returns a google form link - after completing this form the submission should be forwarded to a discord channel via webhook and the results will then be saved in the firestore database.

!beerchart
// using [chart.js](https://www.chartjs.org) - beer bot will create a chart based on the servers beer ratings.  This chart is created through chart.js and converted to an image in order to post into a discord channel.
// Note: filtering and extra params coming soon!

!randomdrink
// Using the [TheCocktailDB](https://www.thecocktaildb.com) API - beerbot will return a random drink with basic ingredients and directions to create.

!howdoimake or @beerbot How do I make a {drink-here} 
// beerbot will use TheCocktailDB API to attempt to find the recipe for the provded drink

{@discord-user}🍻 
// this will give the mentioned user a cheers! The number of cheers a user has will be stored in firestore and incremented each time a user is given a cheer! 

!cheerlist
// coming soon - returns a readable version of every users cheer score within a server
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
