import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPriceHistory } from "../sharedInterfaces/IPriceHistory";
import { IQuantityHistory } from "../sharedInterfaces/IQuantityHistory";

export interface IProductHistoryState {
  quantityHistory: IQuantityHistory[];
  priceHistory: IPriceHistory[];
}

export const initialState: IProductHistoryState = {
  quantityHistory: [],
  priceHistory: [],
};

export const productHistorySlice = createSlice({
  initialState: initialState,
  name: "productWarehouse",
  reducers: {
    setQuantityHistory: (state: IProductHistoryState, { payload }: PayloadAction<any>): void => {
      state.quantityHistory = [
        ...(state.quantityHistory.some((element) => element.productId === payload.productId)
          ? [
              ...state.quantityHistory.map((element: IQuantityHistory) => {
                if (element.productId === payload.productId) {
                  if (element.history.length < 5) {
                    return { ...element, history: [...element.history, payload.quantityNode] };
                  } else {
                    return { ...element, history: [...element.history.slice(1), payload.quantityNode] };
                  }
                } else {
                  return {
                    ...element,
                    history: [{ timeStamp: payload.quantityNode.timeStamp, quantity: payload.quantityNode.quantity }],
                  };
                }
              }),
            ]
          : [
              ...state.quantityHistory,
              {
                productId: payload.productId,
                history: [{ timeStamp: payload.quantityNode.timeStamp, quantity: payload.quantityNode.quantity }],
              },
            ]),
      ];
    },
    setPriceHistory: (state: IProductHistoryState, { payload }: PayloadAction<any>): void => {
      state.priceHistory = [
        ...(state.priceHistory.some((element) => element.productId === payload.productId)
          ? [
              ...state.priceHistory.map((element: IPriceHistory) => {
                if (element.productId === payload.productId) {
                  if (element.history.length < 5) {
                    return { ...element, history: [...element.history, payload.priceNode] };
                  } else {
                    return { ...element, history: [...element.history.slice(1), payload.priceNode] };
                  }
                } else {
                  return {
                    ...element,
                    history: [{ timeStamp: payload.priceNode.timeStamp, price: payload.priceNode.price }],
                  };
                }
              }),
            ]
          : [
              ...state.priceHistory,
              {
                productId: payload.productId,
                history: [{ timeStamp: payload.priceNode.timeStamp, price: payload.priceNode.price }],
              },
            ]),
      ];
    },
  },
});

export const productHistoryActions = productHistorySlice.actions;

export const productHistoryReducer = productHistorySlice.reducer;
