import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "../components/LandingPage";
import { PageNotFound } from "../components/PageNotFound";
import { ProductEdit } from "../components/ProductEdit";
import { ProductList } from "../components/ProductList";
import { ProductNew } from "../components/ProductNew";
import { ProductPreview } from "../components/ProductPreview";

/**
 * Application routes
 */
const Routes: React.FC = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route exact={true} path="/products" component={ProductList} />
        <Route exact={true} path="/products/create" component={ProductNew} />
        <Route exact={true} path="/products/:id/edit" component={ProductEdit} />
        <Route exact={true} path="/products/:id" component={ProductPreview} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
