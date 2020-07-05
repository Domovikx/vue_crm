// eslint-disable-next-line
function dateFilter(value: any, format: string = 'date') {
  const options: Options = {};

  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }

  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
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
