function currencyFilter(value: any, currency: string = 'BYN') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(value);
}

export default currencyFilter;
