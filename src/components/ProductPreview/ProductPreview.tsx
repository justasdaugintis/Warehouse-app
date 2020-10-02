import React from "react";
import { PageHeader, Table, Tabs } from "antd";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { PriceChart } from "./PriceChart";
import { QuantityChart } from "./QuantityChart";

//Parameter passed down from react router
interface ParamTypes {
  id: string;
}
/**
 *  Component responsible for rendering the product detailed view component
 */
export const ProductPreview: React.FC = () => {
  const { TabPane } = Tabs;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EAN",
      dataIndex: "ean",
      key: "ean",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text: boolean, record: any) => (text ? "Active" : "Disabled"),
    },
  ];

  let { id } = useParams<ParamTypes>();

  const { products } = useSelector((state: IRootState) => state.warehouseData);

  const product: IProduct[] = products.filter((product: IProduct) => product.id === id);

  const history = useHistory();

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack();
        }}
        title="Product detailed view"
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Product details" key="1">
          <Table dataSource={product} columns={columns} scroll={{ x: 800 }} />
        </TabPane>
        <TabPane tab="Price history" key="2">
          <PriceChart />
        </TabPane>
        <TabPane tab="Quantity history" key="3">
          <QuantityChart />
        </TabPane>
      </Tabs>
    </Fragment>
  );
};
