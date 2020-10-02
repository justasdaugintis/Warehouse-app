import { Table } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { warehouseActions } from "../../reducers/ProductSlice";
import { ActiveCheckbox } from "./ActiveCheckbox";
import { Buttons } from "./Buttons";

/**
 *  Component responsible for rendering product list
 */
export const ProductList: React.FC = () => {
  const { products } = useSelector((state: IRootState) => state.warehouseData);

  const dispatch = useDispatch();

  const history = useHistory();

  const deleteProduct = (record: any): void => {
    dispatch(warehouseActions.deleteProduct(record.id));
  };

  const tickCheckbox = (e: CheckboxChangeEvent, record: any) => {
    let payload = {
      id: record.id,
      isActive: e.target.checked,
    };
    dispatch(warehouseActions.setProductActive(payload));
  };

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
        <ActiveCheckbox text={text} record={record} tickCheckbox={tickCheckbox} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => <Buttons history={history} record={record} deleteProduct={deleteProduct} />,
    },
  ];

  return <Table dataSource={products} columns={columns} scroll={{ x: 800 }} />;
};
