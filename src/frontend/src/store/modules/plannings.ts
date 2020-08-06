import ActionContext from '@/interfaces/ActionContext.interface';
import { Record, Records } from '@/interfaces/Record.interface';
import { UserCategory, Categories } from '@/interfaces/Category.interface';
import {
  PlanningByCategory,
  PlanningsByCategories,
} from '@/interfaces/PlanningByCategory.interface';

const plannings = {
  state: {
    categories: null,
  },

  actions: {
    async getPlanningsAction({ dispatch, getters, commit }: ActionContext) {
      try {
        if (!getters.categoriesGetter) {
          await dispatch('fetchCategoriesAction');
        }

        if (!getters.recordsGetter) {
          await dispatch('fetchRecordsAction');
        }

        const categories: Categories = getters.categoriesGetter;
        const records: Records = getters.recordsGetter;
        const bill: number = getters.infoBillGetter;

        const planningsByCategories: PlanningsByCategories = await categories.map(
          (category: UserCategory) => {
            const planningByCategory: PlanningByCategory = {
              categoryId: String(category.id),
              categoryTitle: String(category.title),
              categoryLimit: Number(category.limit),
              typeOutcome: 0,
              typeIncome: 0,
              typeDifferent: 0,
              bill: Number(bill),
              rate: 0,
              expensePercent: 0,
              percentIncome: 0,
              percentOutcome: 0,
            };

            records.forEach((record: Record) => {
              if (record.categoryId === category.id) {
                if (record.categoryType === 'outcome') {
                  planningByCategory.typeOutcome += Number(record.count);
                }
                if (record.categoryType === 'income') {
                  planningByCategory.typeIncome += Number(record.count);
                }
                planningByCategory.typeDifferent =
                  planningByCategory.categoryLimit +
                  planningByCategory.typeIncome -
                  planningByCategory.typeOutcome;

                planningByCategory.rate =
                  planningByCategory.typeIncome -
                  planningByCategory.typeOutcome;

                planningByCategory.expensePercent = Math.abs(
                  Math.round(
                    ((planningByCategory.rate * 100) /
                      planningByCategory.categoryLimit) *
                      100,
                  ) / 100,
                );

                planningByCategory.percentIncome =
                  Math.round(
                    ((planningByCategory.typeIncome * 100) /
                      planningByCategory.categoryLimit) *
                      100,
                  ) / 100;

                planningByCategory.percentOutcome =
                  Math.round(
                    ((planningByCategory.typeOutcome * 100) /
                      planningByCategory.categoryLimit) *
                      100,
                  ) / 100;
              }
            });

            return planningByCategory;
          },
        );

        commit('planningsByCategoriesMutation', planningsByCategories);
      } catch (error) {
        throw error;
      }
    },
  },

  mutations: {
    planningsByCategoriesMutation: (
      state: any,
      categories: PlanningsByCategories,
    ) => {
      state.categories = categories;
    },
  },

  getters: {
    planningsByCategoriesGetter: (state: any): PlanningsByCategories =>
      state.categories,
  },
};

export default plannings;
