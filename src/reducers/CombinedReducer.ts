import { combineReducers, Reducer } from "redux";
import { ILanguageState, languageReducer } from "./LanguageSlice";
import { IProductHistoryState, productHistoryReducer } from "./ProductHistorySlice";
import { IWarehouseState, warehouseReducer } from "./ProductSlice";

export interface IRootState {
  warehouseData: IWarehouseState;
  productHistoryData: IProductHistoryState;
  languageData: ILanguageState;
}

/**
 * Returns the list of reducers
 */
const createRootReducer: () => Reducer<IRootState> = (): Reducer<IRootState> =>
  combineReducers<IRootState>({
    warehouseData: warehouseReducer,
    productHistoryData: productHistoryReducer,
    languageData: languageReducer,
  });

export default createRootReducer;
