import React from "react";
import { PageHeader } from "antd";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useFormatMessage } from "react-intl-hooks";

/**
 *  Component renders when product id is not found
 */
export const PageNotFound: React.FC = () => {
  const translate = useFormatMessage();

  const history = useHistory();

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.push("/");
        }}
        title={translate({ id: "pageNotFound.backToHome" })}
      />
      <p style={{ color: "red", fontSize: "18px", marginLeft: "2.5rem" }}>
        {translate({ id: "pageNotFound.noPageFound" })}
      </p>
    </Fragment>
  );
};
