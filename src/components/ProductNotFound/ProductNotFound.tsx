import { PageHeader } from "antd";
import React, { Fragment } from "react";

// Component props
interface IProps {
  productId: string;
  onBack: any;
  translate: Function;
}
/**
 *  Component renders when a product id in not found
 */
export const ProductNotFound: React.FC<IProps> = ({ productId, onBack, translate }) => {
  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={onBack}
        title={translate({ id: "productPreview.noProductTitle" })}
      />
      <p className="not-found">{translate({ id: "productPreview.noProductFound" }, { id: productId })}</p>
    </Fragment>
  );
};
