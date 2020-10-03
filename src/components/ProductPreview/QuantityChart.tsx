import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IQuantityHistory, IQuantityHistoryNode } from "../../sharedInterfaces/IQuantityHistory";
import { useFormatMessage } from "react-intl-hooks";

//Parameter passed down from react router
interface ParamTypes {
  id: string;
}
/**
 *  Component responsible for rendering the quantity history chart
 */
export const QuantityChart: React.FC = () => {
  let { id } = useParams<ParamTypes>();

  const translate = useFormatMessage();

  const { quantityHistory } = useSelector((state: IRootState) => state.productHistoryData);

  const quantity: IQuantityHistory[] = quantityHistory.filter((item: IQuantityHistory) => item.productId === id);

  let chartData: any = [];

  quantity.forEach((element: IQuantityHistory) => {
    element.history.forEach((node: IQuantityHistoryNode) => {
      let date = new Date(node.timeStamp);
      let quantity = node.quantity;
      let nodeInstance = [date, quantity];
      chartData.push(nodeInstance);
    });
  });

  const options = {
    title: {
      text: translate({ id: "quantityHistoryChart.title" }),
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
        text: translate({ id: "quantityHistoryChart.xAxisTitle" }),
      },
    },
    yAxis: {
      title: {
        text: translate({ id: "quantityHistoryChart.yAxisTitle" }),
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
