import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IPriceHistory, IPriceHistoryNode } from "../../sharedInterfaces/IPriceHistory";

//Parameter passed down from react router
interface ParamTypes {
  id: string;
}
/**
 *  Component responsible for rendering the price history chart
 */
export const PriceChart: React.FC = () => {
  let { id } = useParams<ParamTypes>();

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
      text: "Price points in time",
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
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Price ($)",
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
