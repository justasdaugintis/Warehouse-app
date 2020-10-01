import React from "react";
import { Form, Input, Tooltip, Checkbox, Button, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./style.scss";
import { useDispatch } from "react-redux";
import { warehouseActions } from "../../reducers/ReduxSlice";
import { formatString, idGenerator } from "./Helpers";

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

export const ProductForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const product = {
      id: idGenerator(),
      name: formatString(values.name),
      ean: values.ean,
      type: formatString(values.type),
      weight: values.weight + "kg",
      color: formatString(values.color),
      active: values.active,
    };
    dispatch(warehouseActions.addProduct(product));
    form.resetFields();
    message.success("Product has been created");
  };

  return (
    <div className="product-list-table">
      <Form
        {...formItemLayout}
        form={form}
        name="productForm"
        onFinish={onFinish}
        initialValues={{
          active: true,
        }}
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
