import React from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}
/**
 *  Component
 */
export const ProductPreview: React.FC = () => {
  let { id } = useParams<ParamTypes>();
  return <Fragment>Preview id: {id}</Fragment>;
};
