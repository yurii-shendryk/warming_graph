const ctx = document.querySelector(".js-chart").getContext("2d");
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData()
  .then(parseData)
  .then(getLabelsandData)
  .then(({ years, temps }) => drawChart(years, temps));

function fetchData() {
  return fetch("./data/ZonAnn.Ts+dSST.csv").then((res) => res.text());
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelsandData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
      return acc;
    },
    { years: [], temps: [] }
  );
}

function drawChart(labels, data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "# Середня глобальна температура",
          data: data,
          borderColor: "rgba(255, 99, 132)",
          fill: false,
          borderWidth: 1,
        },
      ],
    },

    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback(value) {
                return value + "°";
              },
            },
          },
        ],
      },
    },
  });
}
