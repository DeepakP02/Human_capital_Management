import { DollarSign, IndianRupee, Euro } from 'lucide-react';

export const getCurrencySymbol = (defaultCurrency) => {
  if (!defaultCurrency) return '$';
  if (defaultCurrency.includes('₹') || defaultCurrency.includes('INR')) return '₹';
  if (defaultCurrency.includes('€') || defaultCurrency.includes('EUR')) return '€';
  return '$';
};

export const formatCurrency = (amount, defaultCurrency) => {
  const symbol = getCurrencySymbol(defaultCurrency);
  if (amount === undefined || amount === null || isNaN(amount)) return '-';
  
  let formattedVal;
  if (symbol === '₹') {
    formattedVal = Number(amount).toLocaleString('en-IN');
  } else if (symbol === '€') {
    formattedVal = Number(amount).toLocaleString('de-DE');
  } else {
    formattedVal = Number(amount).toLocaleString('en-US');
  }
  return `${symbol}${formattedVal}`;
};

export const getCurrencyIcon = (defaultCurrency) => {
  if (!defaultCurrency) return DollarSign;
  if (defaultCurrency.includes('₹') || defaultCurrency.includes('INR')) return IndianRupee;
  if (defaultCurrency.includes('€') || defaultCurrency.includes('EUR')) return Euro;
  return DollarSign;
};
