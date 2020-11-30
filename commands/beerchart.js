const { CanvasRenderService } = require("chartjs-node-canvas");
const fs = require("fs");
const firestoreUtils = require("./../firestoreutils");

// sample beer scores
const getJson = fs.readFileSync(`sample-beer-scores.json`);
// const json = JSON.parse(getJson);

// get our labels and data
// const labels = json.map(function (item) {
//   return item.Beer;
// });
// const data = json.map(function (item) {
//   return item.Score;
// });

const width = 600; //px
const height = 600; //px
const canvasRenderService = new CanvasRenderService(
  width,
  height,
  (ChartJS) => {
    // what is in here
    this;
    // ChartJS.defaults.global.backgroundColor = "#3e95cd";
    // ChartJS.defaults.global.defaultColor = "#3e95cd";
    // ChartJS.plugins.register({
    //   colorschemes: {
    //     scheme: 'brewer.Paired12'
    //   }
    // });
    // ChartJS.defaults.global.plugins.colorschemes = {};
    // ChartJS.defaults.global.plugins.colorschemes.scheme = 'brewer.Paired12';
    ChartJS.defaults.global.defaultFontStyle = 'Bold'
    ChartJS.defaults.global.plugins = {};
    ChartJS.defaults.global.plugins.datalabels = {};
    ChartJS.defaults.global.plugins.datalabels.anchor = 'end';
    ChartJS.defaults.global.plugins.datalabels.align = 'end';
  }
);

module.exports.run = async (client, msg, args, db) => {
  
  var json = await firestoreUtils.getBeerRatings(db);

  const labels = json.map(function (item) {
    return item.Beer;
  });
  const data = json.map(function (item) {
    return parseInt(item.Rating);
  });

  const configuration = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Beer Score (out of 10)",
          backgroundColor: "#3e95cd",
          data: data,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Moss Beers",
        fontColor: "white"
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontColor: 'white',
                fontSize: 14
            },
        }],
      xAxes: [{
            ticks: {
                beginAtZero: true,
                fontColor: 'white',
                fontSize: 14
            },
        }]
      },
      gridLines: {
        color: 'white',
        display: true,
        borderWidth: 100,
      }
    },
  };
  const image = await canvasRenderService.renderToBuffer(configuration);
  const dataUrl = await canvasRenderService.renderToDataURL(configuration);
  console.log("Chart created! URL: " + dataUrl);

  msg.channel.send("Here is your bar...er uh beerchart!", {
    files: [image],
  });
};

module.exports.help = {
  name: "beerchart",
};
