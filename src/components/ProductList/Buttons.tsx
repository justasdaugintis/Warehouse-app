import { Button, Space } from "antd";
import React from "react";

// Components props
interface IProps {
  history: any;
  record: any;
  deleteProduct: any;
  translate: any;
}
/**
 * Form buttons
 * @param history contains router history
 * @param record contains selected row details
 * @param deleteProduct contains function to delete row/product
 * @param translate contains translate function
 */
export const Buttons: React.FC<IProps> = ({ history, record, deleteProduct, translate }) => {
  return (
    <Space size="small">
      <Button
        type="primary"
        onClick={() => {
          history.push(`/products/${record.id}`);
        }}
      >
        {translate({ id: "productListTable.viewButton" })}
      </Button>
      <Button
        type="primary"
        ghost
        onClick={() => {
          history.push(`/products/${record.id}/edit`);
        }}
      >
        {translate({ id: "productListTable.editButton" })}
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => {
          deleteProduct(record);
        }}
      >
        {translate({ id: "productListTable.deleteButton" })}
      </Button>
    </Space>
  );
};
