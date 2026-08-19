export enum SizeType {
  A4 = 0,
  A3 = 1
}

export interface PriceList {
  id: number;
  size: SizeType;
  price: number;
  categoryId: number;
  category?: { id: number; name: string };
}