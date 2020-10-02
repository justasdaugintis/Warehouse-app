import { Button, Checkbox, Space, Table } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { warehouseActions } from "../../reducers/ReduxSlice";

/**
 *  Component responsible for passing business logic into the the templates table
 */
export const ProductList: React.FC = () => {
  const { products } = useSelector((state: IRootState) => state.warehouseData);
  const dispatch = useDispatch();
  const history = useHistory();

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
      render: (text: boolean, record: any) => (
        <Space size="middle">
          <Checkbox
            defaultChecked={text ? true : false}
            onChange={(e: CheckboxChangeEvent) => {
              let payload = {
                id: record.id,
                isActive: e.target.checked,
              };
              dispatch(warehouseActions.setProductActive(payload));
            }}
          >
            Active
          </Checkbox>
        </Space>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => (
        <Space size="small">
          <Button
            type="primary"
            onClick={() => {
              history.push(`/products/${record.id}`);
            }}
          >
            VIEW
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() => {
              history.push(`/products/${record.id}/edit`);
            }}
          >
            EDIT
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              dispatch(warehouseActions.deleteProduct(record.id));
            }}
          >
            DELETE
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={products} columns={columns} scroll={{ x: 800 }} />;
};
