import React, { Fragment } from "react";
import { useFormatMessage } from "react-intl-hooks";

/**
 *  Component responsible for rendering a product form for a new product
 */
export const LandingPage: React.FC = () => {
  const translate = useFormatMessage();

  return (
    <Fragment>
      <h1>{translate({ id: "landingPage.title" })}</h1>
      <p>{translate({ id: "landingPage.subtitle" })}</p>
    </Fragment>
  );
};
