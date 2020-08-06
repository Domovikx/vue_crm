import { CurrencyOptions } from '@/interfaces/CurrencyOptions.interface';

function currencyFilter(value: any, currencyOptions: CurrencyOptions) {
  return new Intl.NumberFormat('ru-RU', currencyOptions).format(value);
}

export default currencyFilter;
