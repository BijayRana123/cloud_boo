/**
 * Financial calculation utilities for the accounting system
 */

export const VAT_RATE = 13; // Nepal's standard VAT rate

export interface CalculationResult {
  subtotal: number;
  vatAmount: number;
  total: number;
}

export const calculateVAT = (amount: number, vatRate: number = VAT_RATE): number => {
  return (amount * vatRate) / 100;
};

export const calculateTotals = (items: Array<{ amount: number; vatRate?: number }>): CalculationResult => {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const vatAmount = items.reduce((sum, item) => {
    const rate = item.vatRate ?? VAT_RATE;
    return sum + calculateVAT(item.amount, rate);
  }, 0);

  return {
    subtotal,
    vatAmount,
    total: subtotal + vatAmount,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
  }).format(amount);
};

export const calculateTDS = (amount: number, tdsRate: number): number => {
  return (amount * tdsRate) / 100;
};

export const roundToTwo = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const calculateNetAmount = ({
  amount,
  vatRate = VAT_RATE,
  tdsRate = 0,
  discountRate = 0,
}: {
  amount: number;
  vatRate?: number;
  tdsRate?: number;
  discountRate?: number;
}): {
  originalAmount: number;
  vatAmount: number;
  tdsAmount: number;
  discountAmount: number;
  netAmount: number;
} => {
  const discountAmount = (amount * discountRate) / 100;
  const amountAfterDiscount = amount - discountAmount;
  const vatAmount = calculateVAT(amountAfterDiscount, vatRate);
  const tdsAmount = calculateTDS(amountAfterDiscount, tdsRate);
  const netAmount = amountAfterDiscount + vatAmount - tdsAmount;

  return {
    originalAmount: amount,
    vatAmount: roundToTwo(vatAmount),
    tdsAmount: roundToTwo(tdsAmount),
    discountAmount: roundToTwo(discountAmount),
    netAmount: roundToTwo(netAmount),
  };
};