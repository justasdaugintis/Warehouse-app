import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../sharedInterfaces/IProduct";

export interface IWarehouseState {
  products: IProduct[];
}

export const initialState: IWarehouseState = {
  products: [
    {
      id: "product:id:11111",
      name: "Gibson SG",
      ean: 8724104487780,
      type: "Solid body",
      weight: "2kg",
      color: "Blue",
      price: "$1000",
      quantity: 5,
      active: true,
    },
    {
      id: "product:id:2222222",
      name: "Fender Stratocaster",
      ean: 5158142776816,
      type: "Solid body",
      weight: "1.5kg",
      color: "Sunburst",
      price: "$2000",
      quantity: 2,
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
    editProduct: (state: IWarehouseState, { payload }: PayloadAction<IProduct>): void => {
      state.products = [
        ...state.products.map((product: IProduct) => {
          if (product.id === payload.id) {
            return {
              ...product,
              name: payload.name,
              ean: payload.ean,
              type: payload.type,
              weight: payload.weight,
              color: payload.color,
              price: payload.price,
              quantity: payload.quantity,
              active: payload.active,
            };
          }
          return product;
        }),
      ];
    },
  },
});

export const warehouseActions = warehouseSlice.actions;

export const warehouseReducer = warehouseSlice.reducer;
