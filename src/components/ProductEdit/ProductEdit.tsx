import React from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}
/**
 *  Component
 */
export const ProductEdit: React.FC = () => {
  let { id } = useParams<ParamTypes>();
  return <Fragment>Edit: {id}</Fragment>;
};
