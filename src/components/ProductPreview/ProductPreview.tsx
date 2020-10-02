import React from "react";
import { PageHeader, Table, Tabs } from "antd";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { PriceChart } from "./PriceChart";
import { QuantityChart } from "./QuantityChart";

const { TabPane } = Tabs;

interface ParamTypes {
  id: string;
}
/**
 *  Component
 */
export const ProductPreview: React.FC = () => {
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
      render: (text: boolean, record: any) => (text ? <p>Active</p> : <p>Disabled</p>),
    },
  ];
  let { id } = useParams<ParamTypes>();
  const { products } = useSelector((state: IRootState) => state.warehouseData);
  const product: IProduct[] = products.filter((product: IProduct) => product.id === id);
  const history = useHistory();
  function callback(key: any) {
    console.log(key);
  }
  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack();
        }}
        title="View product"
      />
      <Tabs defaultActiveKey="1" onChange={callback}>
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
