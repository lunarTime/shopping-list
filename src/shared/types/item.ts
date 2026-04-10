export const UNITS = ['кг', 'гр', 'л', 'мл', 'шт'] as const;
export type Unit = (typeof UNITS)[number];
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

export type ShoppingItemFormValues = Omit<ShoppingItem, 'id' | 'done'>;
