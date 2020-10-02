import { PageHeader } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRootState } from "../../reducers/CombinedReducer";
import { IProduct } from "../../sharedInterfaces/IProduct";
import { ProductForm } from "../ProductForm";

interface ParamTypes {
  id: string;
}
/**
 *  Component
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
