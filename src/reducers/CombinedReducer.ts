import { combineReducers, Reducer } from "redux";
import { IProductHistoryState, productHistoryReducer } from "./ProductHistorySlice";
import { IWarehouseState, warehouseReducer } from "./ProductSlice";

export interface IRootState {
  warehouseData: IWarehouseState;
  productHistoryData: IProductHistoryState;
}

/**
 * Returns the list of reducers
 */
const createRootReducer: () => Reducer<IRootState> = (): Reducer<IRootState> =>
  combineReducers<IRootState>({
    warehouseData: warehouseReducer,
    productHistoryData: productHistoryReducer,
  });

export default createRootReducer;
