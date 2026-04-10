export type Unit = 'кг' | 'гр' | 'л' | 'мл' | 'шт';
export type PriceMode = 'per_unit' | 'total';

export interface ShoppingItem {
  id: string;
  title: string;
  quantity: number;
  unit: Unit;
  price?: number;
  priceMode?: PriceMode;
  done: boolean;
  comment?: string;
}
