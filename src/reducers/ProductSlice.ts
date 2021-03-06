import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../sharedInterfaces/IProduct";

export interface IWarehouseState {
  products: IProduct[];
}

export const initialState: IWarehouseState = {
  products: [
    {
      key: "product:id:123456789",
      id: "product:id:123456789",
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
      key: "product:id:987654321",
      id: "product:id:987654321",
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

/**
 *  Contains the reducer and actions for products
 */
export const productSlice = createSlice({
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

export const warehouseActions = productSlice.actions;

export const warehouseReducer = productSlice.reducer;
