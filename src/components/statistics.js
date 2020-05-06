import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, points) => {
  const moneyByPointType = [];
  points
    .slice()
    .reduce(function(result, point) {
      const type = point.type.toUpperCase();
      if (!result[type]) {
        result[type] = {type, price: 0};
        moneyByPointType.push(result[type])
      }
      result[type].price += point.price;
      return result;
    }, {});

  const sortedMoneyByPointType = moneyByPointType.sort(function (a, b) {
    return b.price - a.price
  });

  const pointTypes = sortedMoneyByPointType.slice().map((point) => point.type);
  const money = sortedMoneyByPointType.slice().map((point) => point.price);

  moneyCtx.height = BAR_HEIGHT * pointTypes.length;
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes,
      datasets: [{
        data: money,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
}

const renderTransportChart = (transportCtx) => {
  transportCtx.height = BAR_HEIGHT * 4;
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `DRIVE`,  `RIDE`],
      datasets: [{
        data: [4, 2, 1],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
}

const renderTimeSpendChart = (timeSpendCtx) => {
  timeSpendCtx.height = BAR_HEIGHT * 4;
  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `DRIVE`,  `RIDE`],
      datasets: [{
        data: [4, 2, 1],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
}

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2>Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  )
}

export default class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender();
  }

  recoveryListeners() {}

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    const points = this._pointsModel.getPoints();

    this._moneyChart = renderMoneyChart(moneyCtx, points);
    this._transportChart = renderTransportChart(transportCtx, points);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, points);
  }

  _resetCharts() {
    this._resetChart(this._moneyChart);
    this._resetChart(this._transportChart);
    this._resetChart(this._timeSpendChart);
  };

  _resetChart(chart) {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  }
}
