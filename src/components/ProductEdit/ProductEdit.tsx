import { PageHeader } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { ProductForm } from "../ProductForm";

//Parameter passed down from react router
interface ParamTypes {
  id: string;
}
/**
 *  Component which allows user to edit a product entry
 */
export const ProductEdit: React.FC = () => {
  let { id } = useParams<ParamTypes>();

  const { products } = useSelector((state: IRootState) => state.warehouseData);

  const product: IProduct | undefined = products.find((product: IProduct) => product.id === id);

  const history = useHistory();

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack();
        }}
        title="Edit product"
      />
      <ProductForm productToEdit={product} />
    </Fragment>
  );
};
