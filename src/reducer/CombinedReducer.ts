import { combineReducers, Reducer } from "redux";

export interface IRootState {

}

/**
 * Returns the list of reducers
 */
const createRootReducer: () => Reducer<IRootState> = (): Reducer<IRootState> =>
  combineReducers<IRootState>({
      
  });

export default createRootReducer;