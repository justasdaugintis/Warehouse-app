import { combineReducers, Reducer } from "redux";
import { IWarehouseState, warehouseReducer } from "./ReduxSlice";

export interface IRootState {
  warehouseData: IWarehouseState;
}

/**
 * Returns the list of reducers
 */
const createRootReducer: () => Reducer<IRootState> = (): Reducer<IRootState> =>
  combineReducers<IRootState>({
    warehouseData: warehouseReducer,
  });

export default createRootReducer;
