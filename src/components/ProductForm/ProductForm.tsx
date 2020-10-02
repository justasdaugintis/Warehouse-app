import React, { useState } from "react";
import { Form, Input, Tooltip, Checkbox, Button, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./style.scss";
import { useDispatch } from "react-redux";
import { warehouseActions } from "../../reducers/ReduxSlice";
import { formatString, idGenerator } from "./Helpers";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { useHistory } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
interface IProps {
  productToEdit?: IProduct;
}

export const ProductForm: React.FC<IProps> = ({ productToEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const createNewProduct = (product: any): void => {
    dispatch(warehouseActions.addProduct(product));
    form.resetFields();
    message.success("Product has been created");
  };
  const updateExistingProduct = (product: any): void => {
    dispatch(warehouseActions.editProduct(product));
    history.goBack();
    message.success("Product has been updated");
  };
  const onFinish = (values: any): void => {
    const product = {
      id: productToEdit ? productToEdit.id : idGenerator(),
      name: formatString(values.name),
      ean: values.ean,
      type: formatString(values.type),
      weight: values.weight + "kg",
      color: formatString(values.color),
      price: "$" + values.price,
      quantity: values.quantity,
      active: values.active,
    };
    productToEdit ? updateExistingProduct(product) : createNewProduct(product);
  };

  return (
    <div className="product-list-table">
      <Form
        {...formItemLayout}
        form={form}
        name="productForm"
        onFinish={onFinish}
        initialValues={
          productToEdit
            ? {
                name: productToEdit.name,
                ean: productToEdit.ean,
                type: productToEdit.type,
                weight: productToEdit.weight.replace("kg", ""),
                color: productToEdit.color,
                price: productToEdit.price.replace("$", ""),
                quantity: productToEdit.quantity,
                active: productToEdit.active,
              }
            : {}
        }
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Product name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ean"
          label={
            <span>
              EAN&nbsp;
              <Tooltip title="European Article Number - 13 digit product identifier">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "EAN is required",
            },
            {
              pattern: /^$|^\d{13}$/,
              message: "Please enter a valid EAN",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Product type is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Weight in kg"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Product weight is required",
            },
            {
              pattern: /^\d+(\.\d+)*$/,
              message: "Please enter a valid weight",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="color"
          label="Color"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Color description is required",
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Color should not contain any special characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price in dollars"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Price is required",
            },
            {
              pattern: /^\d+(\.\d+)*$/,
              message: "Price should not contain any special characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Quantity is required",
            },
            {
              pattern: /^(0|[1-9][0-9]*)$/,
              message: "Quantity should only contain whole numbers or zero",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="active" label="Active" valuePropName="checked">
          <Checkbox />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
