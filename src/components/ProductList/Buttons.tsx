import { Button, Space } from "antd";
import * as React from "react";

// Components props
interface IProps {
  history: any;
  record: any;
  deleteProduct: any;
}
/**
 * Form buttons
 * @param history contains router history
 * @param record contains selected row details
 * @param deleteProduct contains function to delete row/product
 */
export const Buttons: React.FC<IProps> = ({ history, record, deleteProduct }) => {
  return (
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
          deleteProduct(record);
        }}
      >
        DELETE
      </Button>
    </Space>
  );
};
