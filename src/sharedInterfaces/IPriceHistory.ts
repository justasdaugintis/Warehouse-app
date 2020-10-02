export interface IPriceHistoryNode {
  timeStamp: Date;
  price: string;
}
export interface IPriceHistory {
  productId: string;
  history: IPriceHistoryNode[];
}
