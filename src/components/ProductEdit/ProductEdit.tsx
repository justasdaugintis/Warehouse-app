import { PageHeader } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { ProductForm } from "../ProductForm";
import { useFormatMessage } from "react-intl-hooks";
import { ProductNotFound } from "../ProductNotFound";

//Parameter passed down from react router
interface ParamTypes {
  id: string;
}
/**
 *  Component which allows user to edit a product entry
 */
export const ProductEdit: React.FC = () => {
  const translate = useFormatMessage();

  let { id } = useParams<ParamTypes>();

  const { products } = useSelector((state: IRootState) => state.warehouseData);

  //finds a product from the redux store where the id from the url is matching
  const product: IProduct | undefined = products.find((product: IProduct) => product.id === id);

  const history = useHistory();

  return product ? (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack();
        }}
        title={translate({ id: "productEdit.title" })}
      />
      <ProductForm productToEdit={product} />
    </Fragment>
  ) : (
    <ProductNotFound
      productId={id}
      onBack={() => {
        history.push("/products");
      }}
      translate={translate}
    />
  );
};
