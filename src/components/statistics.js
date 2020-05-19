import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getFormattedMilliseconds} from "../utils/date";

const BAR_HEIGHT = 55;

const getSortedPointTypesByMoney = (points) => {
  const pointTypesByMoney = [];
  points
    .slice()
    .reduce(function (result, point) {
      const type = point.type.toUpperCase();
      if (!result[type]) {
        result[type] = {type, price: 0};
        pointTypesByMoney.push(result[type]);
      }
      result[type].price += point.price;
      return result;
    }, {});

  const sortedPointTypesByMoney = pointTypesByMoney.sort(function (a, b) {
    return b.price - a.price;
  });

  return sortedPointTypesByMoney;
};

const getSortedTransportByCount = (points, transportOfferTypes) => {
  const transportByCount = [];
  points
    .slice()
    .filter((point) => transportOfferTypes.includes(point.type))
    .reduce(function (result, point) {
      const type = point.type.toUpperCase();
      if (!result[type]) {
        result[type] = {type, count: 0};
        transportByCount.push(result[type]);
      }
      result[type].count++;
      return result;
    }, {});

  const sortedTransportByCount = transportByCount.sort(function (a, b) {
    return b.count - a.count;
  });

  return sortedTransportByCount;
};

const getSortedPointTypesByTimeSpend = (points, transportOfferTypes) => {
  const pointTypesByTimeSpend = [];
  points
    .slice()
    .filter((point) => transportOfferTypes.includes(point.type))
    .reduce(function (result, point) {
      const type = point.type.toUpperCase();
      if (!result[type]) {
        result[type] = {type, timeSpend: 0};
        pointTypesByTimeSpend.push(result[type]);
      }
      result[type].timeSpend += point.getInterval();
      return result;
    }, {});

  const sortedPointTypesByTimeSpend = pointTypesByTimeSpend.sort(function (a, b) {
    return b.timeSpend - a.timeSpend;
  });

  return sortedPointTypesByTimeSpend;
};

const renderMoneyChart = (moneyCtx, points) => {
  const sortedMoneyByPointType = getSortedPointTypesByMoney(points);

  const pointTypes = sortedMoneyByPointType.slice().map((point) => point.type);
  const money = sortedMoneyByPointType.slice().map((point) => point.price);
  const getFormattedValue = (val) => `€ ${val}`;

  return renderChart(moneyCtx, pointTypes, money, getFormattedValue, `MONEY`);
};

const renderTransportChart = (transportCtx, points, transportOfferTypes) => {
  const sortedTransportByCount = getSortedTransportByCount(points, transportOfferTypes);

  const transport = sortedTransportByCount.slice().map((point) => point.type);
  const counts = sortedTransportByCount.slice().map((point) => point.count);
  const getFormattedValue = (val) => `${val}x`;

  return renderChart(transportCtx, transport, counts, getFormattedValue, `TRANSPORT`);
};

const renderTimeSpendChart = (timeSpendCtx, points, transportOfferTypes) => {
  const sortedPointTypesByTimeSpend = getSortedPointTypesByTimeSpend(points, transportOfferTypes);

  const pointTypes = sortedPointTypesByTimeSpend.slice().map((point) => point.type);
  const timeSpends = sortedPointTypesByTimeSpend.slice().map((point) => point.timeSpend);
  const getFormattedValue = (val) => `${getFormattedMilliseconds(val)}`;

  return renderChart(timeSpendCtx, pointTypes, timeSpends, getFormattedValue, `TIME SPENT`);
};

const renderChart = (ctx, labels, data, formatter, title) => {
  ctx.height = BAR_HEIGHT * labels.length;
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
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
          anchor: `end`,
          align: `start`,
          formatter
        }
      },
      title: {
        display: true,
        text: title,
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
};

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
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(pointsModel, offersModel) {
    super();

    this._pointsModel = pointsModel;
    this.__offersModel = offersModel;

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
    const transportOfferTypes = this.__offersModel.getTransportOfferTypes();

    this._moneyChart = renderMoneyChart(moneyCtx, points);
    this._transportChart = renderTransportChart(transportCtx, points, transportOfferTypes);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, points, transportOfferTypes);
  }

  _resetCharts() {
    this._resetChart(this._moneyChart);
    this._resetChart(this._transportChart);
    this._resetChart(this._timeSpendChart);
  }

  _resetChart(chart) {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  }
}
