export interface Record {
  id?: string | any;
  categoryId?: string | any;
  categoryType?: string | any;
  categoryTitle?: string | any;
  count?: number | any;
  marker?: string | any;
  description?: string | any;
  date?: string | any;
}

export interface Records extends Array<Record> {}

export enum RecordTypeOrder {
  outcome = 'outcome',
  income = 'income',
}
