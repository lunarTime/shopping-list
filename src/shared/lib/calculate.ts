import type { Unit } from '@shared/types';

export const BASE_UNITS = {
    weight: 'кг',
    volume: 'л',
    pieces: 'шт',
} as const;

const CONVERSION_TO_BASE: Record<Unit, number> = {
    гр: 0.001,
    кг: 1,
    мл: 0.001,
    л: 1,
    шт: 1,
};

export function getUnitCategory(unit: Unit): 'weight' | 'volume' | 'pieces' {
    if (unit === 'кг' || unit === 'гр') return 'weight';
    if (unit === 'л' || unit === 'мл') return 'volume';

    return 'pieces';
}

export function getBaseUnit(unit: Unit): Unit {
    const category = getUnitCategory(unit);

    return BASE_UNITS[category] as Unit;
}

export function convertToBaseUnit(quantity: number, unit: Unit): number {
    const factor = CONVERSION_TO_BASE[unit];

    return quantity * factor;
}

export function calculateItemTotal(
    price: number | undefined,
    quantity: number,
    unit: Unit,
    priceMode: 'per_unit' | 'total' | undefined,
): number {
    if (!price) return 0;
    if (priceMode === 'total') {
        return price;
    }

    const quantityInBase = convertToBaseUnit(quantity, unit);

    return price * quantityInBase;
}

export function getPriceLabel(unit: Unit, priceMode: 'per_unit' | 'total' | undefined): string {
    if (priceMode === 'total') {
        return '(всего)';
    }

    const baseUnit = getBaseUnit(unit);

    if (unit !== baseUnit) {
        return `/ ${baseUnit}`;
    }

    return `/ ${baseUnit}`;
}

export function formatQuantityInBaseUnit(quantity: number, unit: Unit): string {
    const baseUnit = getBaseUnit(unit);
    const quantityInBase = convertToBaseUnit(quantity, unit);

    if (unit !== baseUnit) {
        return `${quantity} ${unit} = ${quantityInBase.toFixed(3).replace(/\.?0+$/, '')} ${baseUnit}`;
    }

    return `${quantity} ${unit}`;
}

export function getQuantityConstraints(unit: Unit): {
    min: number;
    precision: number;
    step: number;
} {
    if (unit === 'шт') {
        return { min: 1, precision: 0, step: 1 };
    }

    if (unit === 'гр' || unit === 'мл') {
        return { min: 0.1, precision: 3, step: 10 };
    }

    return { min: 0.01, precision: 3, step: 0.1 };
}
