import { Checkbox, Space } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";

// Components props
interface IProps {
  text: any;
  record: any;
  tickCheckbox: any;
}
/**
 * Checkbox component rendered in the product list component
 * @param text contains input value
 * @param record contains selected row details
 * @param tickCheckbox contains function to set product activity state
 */
export const ActiveCheckbox: React.FC<IProps> = ({ text, record, tickCheckbox }) => {
  return (
    <Space size="middle">
      <Checkbox
        defaultChecked={text ? true : false}
        onChange={(e: CheckboxChangeEvent) => {
          tickCheckbox(e, record);
        }}
      >
        Active
      </Checkbox>
    </Space>
  );
};
