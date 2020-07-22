export interface HistoryRecord {
  id?: string | any;
  categoryId?: string | any;
  categoryType?: string | any;
  categoryTitle?: string | any;
  count?: number | any;
  description?: string | any;
  date?: string | any;
}

export interface HistoryByRecords extends Array<HistoryRecord> {}
