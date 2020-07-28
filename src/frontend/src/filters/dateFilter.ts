// eslint-disable-next-line
function dateFilter(
  value: any,
  format: string = 'date',
  locale: string = 'ru-RU',
) {
  const options: Options = {};

  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = '2-digit';
    options.year = '2-digit';
  }

  if (format.includes('DD')) {
    options.day = '2-digit';
  }
  if (format.includes('-MM')) {
    options.month = '2-digit';
  }
  if (format.includes('-YY')) {
    options.year = '2-digit';
  }
  if (format.includes('-YYYY')) {
    options.year = 'numeric';
  }

  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}

export default dateFilter;

interface Options {
  day?: string;
  month?: string;
  year?: string;

  hour?: string;
  minute?: string;
  second?: string;
}
