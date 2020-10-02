export interface IQuantityHistoryNode {
  timeStamp: Date;
  quantity: number;
}
export interface IQuantityHistory {
  productId: string;
  history: IQuantityHistoryNode[];
}
