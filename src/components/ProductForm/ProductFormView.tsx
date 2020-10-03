import React from "react";
import { Form, Input, Tooltip, Checkbox, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./style.scss";
import { IProduct } from "../../sharedInterfaces/IProduct";

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
  onSubmit: any;
  form: any;
  translate: any;
}
/**
 * Component responsible for drawing the product form component
 * @param productToEdit contains a product object which is to be edited
 * @param onSubmit contains the form submit function
 * @param form contains the form instance
 */
export const ProductFormView: React.FC<IProps> = ({ productToEdit, onSubmit, form, translate }) => {
  return (
    <div className="product-list-table">
      <Form
        {...formItemLayout}
        form={form}
        name="productForm"
        onFinish={onSubmit}
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
          label={translate({ id: "productForm.name" })}
          hasFeedback
          rules={[
            {
              required: true,
              message: translate({ id: "productForm.nameRequired" }),
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
              <Tooltip title={translate({ id: "productForm.eanTooltip" })}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: translate({ id: "productForm.eanRequired" }),
            },
            {
              pattern: /^$|^\d{13}$/,
              message: translate({ id: "productForm.eanWrong" }),
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label={translate({ id: "productForm.type" })}
          hasFeedback
          rules={[
            {
              required: true,
              message: translate({ id: "productForm.typeRequired" }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weight"
          label={translate({ id: "productForm.weight" })}
          hasFeedback
          rules={[
            {
              required: true,
              message: translate({ id: "productForm.weightRequired" }),
            },
            {
              pattern: /^\d+(\.\d+)*$/,
              message: translate({ id: "productForm.weightWrong" }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="color"
          label={translate({ id: "productForm.color" })}
          hasFeedback
          rules={[
            {
              required: true,
              message: translate({ id: "productForm.colorRequired" }),
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: translate({ id: "productForm.colorWrong" }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label={translate({ id: "productForm.price" })}
          hasFeedback
          rules={[
            {
              required: true,
              message: translate({ id: "productForm.priceRequired" }),
            },
            {
              pattern: /^\d+(\.\d+)*$/,
              message: translate({ id: "productForm.priceWrong" }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="quantity"
          label={translate({ id: "productForm.quantity" })}
          hasFeedback
          rules={[
            {
              required: true,
              message: translate({ id: "productForm.quantityRequired" }),
            },
            {
              pattern: /^(0|[1-9][0-9]*)$/,
              message: translate({ id: "productForm.quantityWrong" }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="active" label={translate({ id: "productForm.active" })} valuePropName="checked">
          <Checkbox />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {translate({ id: "productForm.saveButton" })}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
