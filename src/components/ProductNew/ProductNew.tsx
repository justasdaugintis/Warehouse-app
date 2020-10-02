import PageHeader from "antd/lib/page-header";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { ProductForm } from "../ProductForm";

/**
 *  Component responsible for rendering a product form for a new product
 */
export const ProductNew: React.FC = () => {
  const history = useHistory();

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack();
        }}
        title="Add new product"
      />
      <ProductForm />
    </Fragment>
  );
};
