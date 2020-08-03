import moment from 'moment';

function momentFilter(value: any, format: string = 'YYYY-MM-DD') {
  return moment(value).format(format);
}

export default momentFilter;
