import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IPriceHistory, IPriceHistoryNode } from "../../sharedInterfaces/IPriceHistory";
import { useFormatMessage } from "react-intl-hooks";

//Parameter passed down from react router
interface ParamTypes {
  id: string;
}

/**
 *  Component responsible for rendering the price history chart
 */
export const PriceChart: React.FC = () => {
  let { id } = useParams<ParamTypes>();

  const translate = useFormatMessage();

  const { priceHistory } = useSelector((state: IRootState) => state.productHistoryData);

  const product: IPriceHistory[] = priceHistory.filter((priceHistory: IPriceHistory) => priceHistory.productId === id);

  let chartData: any = [];

  product.forEach((element: IPriceHistory) => {
    element.history.forEach((node: IPriceHistoryNode) => {
      let price = parseInt(node.price.replace("$", ""));
      let date = new Date(node.timeStamp);
      let nodeInstance = [date, price];
      chartData.push(nodeInstance);
    });
  });

  const options = {
    title: {
      text: translate({ id: "priceHistoryChart.title" }),
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        second: "%H:%M:%S",
        minute: "%H:%M",
        hour: "%H:%M",
        day: "%e. %b",
        week: "%e. %b",
        month: "%e. %b",
        year: "%b",
      },
      title: {
        text: translate({ id: "priceHistoryChart.xAxisTitle" }),
      },
    },
    yAxis: {
      title: {
        text: translate({ id: "priceHistoryChart.yAxisTitle" }),
      },
      min: 0,
    },
    series: [
      {
        data: chartData,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            plotOptions: {
              series: {
                marker: {
                  radius: 2.5,
                },
              },
            },
          },
        },
      ],
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
