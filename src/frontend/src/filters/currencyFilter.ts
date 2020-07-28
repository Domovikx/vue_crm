function currencyFilter(
  value: any,
  currency: string = 'BYN',
  maximumFractionDigits = 2,
) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(value);
}

export default currencyFilter;
