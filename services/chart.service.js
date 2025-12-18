const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const fs = require("fs");

const canvas = new ChartJSNodeCanvas({ width: 500, height: 500 });

exports.generateChart = async (data, path) => {
  const image = await canvas.renderToBuffer({
    type: "pie",
    data: {
      labels: data.map(d => d.category),
      datasets: [{ data: data.map(d => d.total) }]
    }
  });
  fs.writeFileSync(path, image);
};
