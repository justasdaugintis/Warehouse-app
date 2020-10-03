import React from "react";
import { PageHeader, Table, Tabs } from "antd";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { PriceChart } from "./PriceChart";
import { QuantityChart } from "./QuantityChart";
import { useFormatMessage } from "react-intl-hooks";

//Parameter passed down from react router
interface ParamTypes {
  id: string;
}
/**
 *  Component responsible for rendering the product detailed view component
 */
export const ProductPreview: React.FC = () => {
  const { TabPane } = Tabs;

  const translate = useFormatMessage();

  let { id } = useParams<ParamTypes>();

  const { products } = useSelector((state: IRootState) => state.warehouseData);

  //finds a product from the redux store where the id is matching with the url param
  const product: IProduct[] = products.filter((product: IProduct) => product.id === id);

  const history = useHistory();

  const columns = [
    {
      title: translate({ id: "productListTable.name" }),
      dataIndex: "name",
      key: "name",
    },
    {
      title: translate({ id: "productListTable.ean" }),
      dataIndex: "ean",
      key: "ean",
    },
    {
      title: translate({ id: "productListTable.type" }),
      dataIndex: "type",
      key: "type",
    },
    {
      title: translate({ id: "productListTable.weight" }),
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: translate({ id: "productListTable.color" }),
      dataIndex: "color",
      key: "color",
    },
    {
      title: translate({ id: "productListTable.price" }),
      dataIndex: "price",
      key: "price",
    },
    {
      title: translate({ id: "productListTable.quantity" }),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: translate({ id: "productListTable.active" }),
      dataIndex: "active",
      key: "active",
      render: (text: boolean, record: any) =>
        text ? translate({ id: "productListTable.active" }) : translate({ id: "productListTable.disabled" }),
    },
  ];

  return product.length > 0 ? (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack();
        }}
        title={translate({ id: "productPreview.pageHeaderTitle" })}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab={translate({ id: "productPreview.detailsTab" })} key="1">
          <Table dataSource={product} columns={columns} scroll={{ x: 800 }} />
        </TabPane>
        <TabPane tab={translate({ id: "productPreview.priceHistoryTab" })} key="2">
          <PriceChart />
        </TabPane>
        <TabPane tab={translate({ id: "productPreview.quantityHistoryTab" })} key="3">
          <QuantityChart />
        </TabPane>
      </Tabs>
    </Fragment>
  ) : (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.push("/products");
        }}
        title={translate({ id: "productPreview.noProductTitle" })}
      />
      <p style={{ color: "red", fontSize: "18px", marginLeft: "2.5rem" }}>
        {translate({ id: "productPreview.noProductFound" }, { id: id })}
      </p>
    </Fragment>
  );
};
