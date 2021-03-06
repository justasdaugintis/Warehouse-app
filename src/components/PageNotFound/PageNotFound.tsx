import React from "react";
import { PageHeader } from "antd";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useFormatMessage } from "react-intl-hooks";

/**
 *  Component renders when page is not found
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
      <p className="not-found">{translate({ id: "pageNotFound.noPageFound" })}</p>
    </Fragment>
  );
};
