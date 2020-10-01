import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "antd/lib/list/Item";
import { NumberLiteralType } from "typescript";
import { IProduct } from "../sharedInterfaces/IProduct";

export interface IWarehouseState {
  products: IProduct[];
}

export const initialState: IWarehouseState = {
  products: [
    {
      id: "11111",
      name: "Gibson SG",
      ean: 8724104487780,
      type: "Solid body",
      weight: "2kg",
      color: "Blue",
      active: true,
    },
    {
      id: "2222222",
      name: "Fender Stratocaster",
      ean: 5158142776816,
      type: "Solid body",
      weight: "1.5kg",
      color: "Sunburst",
      active: false,
    },
  ],
};

export const warehouseSlice = createSlice({
  initialState: initialState,
  name: "productWarehouse",
  reducers: {
    addProducts: (state: IWarehouseState, { payload }: PayloadAction<IProduct[]>): void => {
      state.products = payload;
    },
    deleteProduct: (state: IWarehouseState, { payload }: PayloadAction<string>): void => {
      state.products = [...state.products.filter((product: IProduct) => product.id !== payload)];
    },
    addProduct: (state: IWarehouseState, { payload }: PayloadAction<IProduct>): void => {
      state.products = [...state.products, payload];
    },
    setProductActive: (state: IWarehouseState, { payload }: PayloadAction<any>): void => {
      state.products = [
        ...state.products.map((product: IProduct) => {
          if (product.id === payload.id) {
            return { ...product, active: payload.isActive };
          }
          return product;
        }),
      ];
    },
  },
});

export const warehouseActions = warehouseSlice.actions;

export const warehouseReducer = warehouseSlice.reducer;
