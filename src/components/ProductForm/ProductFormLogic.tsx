import React from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { warehouseActions } from "../../reducers/ProductSlice";
import { formatString, idGenerator } from "./Helpers";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { useHistory } from "react-router-dom";
import { productHistoryActions } from "../../reducers/ProductHistorySlice";
import { ProductFormView } from "./ProductFormView";
import { useFormatMessage } from "react-intl-hooks";

// Components props
interface IProps {
  productToEdit?: IProduct;
}
/**
 * Component responsible for passing logic to the form component
 * @param productToEdit contains a product object which is to be edited
 */
export const ProductFormLogic: React.FC<IProps> = ({ productToEdit }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const history = useHistory();

  const translate = useFormatMessage();

  /**
   *  Function to create a new product
   * @param product contains the product object
   */
  const createNewProduct = (product: any): void => {
    dispatch(warehouseActions.addProduct(product));
    form.resetFields();
    history.goBack();
    message.success(translate({ id: "productForm.productSaved" }));
  };

  /**
   *  Function to update existing product
   * @param product contains the product object
   */
  const updateExistingProduct = (product: any): void => {
    dispatch(warehouseActions.editProduct(product));
    history.goBack();
    message.success(translate({ id: "productForm.productEdited" }));
  };

  /**
   *  Function to update products price history
   * @param product contains the product object
   */
  const updatePriceHistory = (product: IProduct): void => {
    let priceInstance = {
      productId: product.id,
      priceNode: { timeStamp: new Date(), price: product.price },
    };
    dispatch(productHistoryActions.setPriceHistory(priceInstance));
  };

  /**
   *  Function to update products quantity history
   * @param product contains the product object
   */
  const updateQuantityHistory = (product: IProduct): void => {
    let quantityInstance = {
      productId: product.id,
      quantityNode: { timeStamp: new Date(), quantity: product.quantity },
    };
    dispatch(productHistoryActions.setQuantityHistory(quantityInstance));
  };

  /**
   *  Function called when user clicks submit on the form
   * @param values contains values from the form inputs
   */
  const onSubmit = (values: any): void => {
    const id = idGenerator();
    const product: IProduct = {
      key: productToEdit ? productToEdit.key : id,
      id: productToEdit ? productToEdit.id : id,
      name: formatString(values.name),
      ean: values.ean,
      type: formatString(values.type),
      weight: values.weight + "kg",
      color: formatString(values.color),
      price: "$" + values.price,
      quantity: parseInt(values.quantity),
      active: values.active,
    };

    // If products price has been edited
    if (productToEdit && productToEdit.price !== product.price) {
      updatePriceHistory(product);
    }
    // If products quantity has been edited
    if (productToEdit && productToEdit.quantity !== product.quantity) {
      updateQuantityHistory(product);
    }
    // If component received a product to edit, then will update existing product, else will create a new one
    productToEdit ? updateExistingProduct(product) : createNewProduct(product);
  };

  return <ProductFormView translate={translate} onSubmit={onSubmit} productToEdit={productToEdit} form={form} />;
};
