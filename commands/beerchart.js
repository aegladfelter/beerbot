const { CanvasRenderService } = require("chartjs-node-canvas");
const fs = require("fs");

// sample beer scores
const getJson = fs.readFileSync(`sample-beer-scores.json`);
const json = JSON.parse(getJson);

// get our labels and data
const labels = json.map(function (item) {
  return item.Beer;
});
const data = json.map(function (item) {
  return item.Score;
});

const width = 2000; //px
const height = 2000; //px
const canvasRenderService = new CanvasRenderService(
  width,
  height,
  (ChartJS) => {}
);

module.exports.run = async (client, msg, args) => {
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
      },
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
