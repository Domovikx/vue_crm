export interface PlanningByCategory {
  categoryId?: string | any;
  categoryTitle?: string | any;
  categoryLimit?: number | any;
  typeOutcome?: number | any;
  typeIncome?: number | any;
  typeDifferent?: number | any;
  rate?: number | any;
  bill?: number | any;
  expensePercent?: number | any;
}

export interface PlanningsByCategories extends Array<PlanningByCategory> {}
