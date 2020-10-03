import React, { Fragment } from "react";
import { useFormatMessage } from "react-intl-hooks";
import { Typography } from "antd";

const { Title } = Typography;
/**
 *  Landing page component
 */
export const LandingPage: React.FC = () => {
  const translate = useFormatMessage();

  return (
    <Fragment>
      <Title level={2}>{translate({ id: "landingPage.title" })}</Title>
      <Title level={4}>{translate({ id: "landingPage.subtitle" })}</Title>
    </Fragment>
  );
};
