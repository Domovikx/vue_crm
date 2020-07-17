/*

https://www.nbrb.by/api/exrates/rates/rub?parammode=2
{
Cur_ID: 298,
Date: "2020-07-15T00:00:00",
Cur_Abbreviation: "RUB",
Cur_Scale: 100,
Cur_Name: "Российских рублей",
Cur_OfficialRate: 3.4012
} 

*/

import ActionContext from '@/interfaces/ActionContext.interface';

const currency = {
  state: {
    currencyBase: 'BYN',
    currencySymbols: ['USD', 'RUB', 'EUR'],
    currencies: {},
  },

  actions: {
    async currencyFetchAction({ getters, commit }: ActionContext) {
      const symbols: any[] = getters.currencySymbolsGetter;
      const currencies: any = {};

      for (const s of symbols) {
        const URL = `https://www.nbrb.by/api/exrates/rates/${s}?parammode=2`;
        const response = await fetch(URL);
        const json = await response.json();

        currencies[s] = {
          rate: json.Cur_OfficialRate / json.Cur_Scale,
          date: json.Date,
        };
      }

      // Add base currency
      currencies[getters.currencyBaseGetter] = {
        rate: 1,
        date: new Date(),
      };

      commit('setCurrencyMutation', currencies);

      return;
    },
  },

  mutations: {
    setCurrencyMutation(state: any, currencies: any) {
      state.currencies = currencies;
    },
  },

  getters: {
    currencySymbolsGetter: (state: any) => state.currencySymbols,
    currenciesGetter: (state: any) => state.currencies,
    currenciesKeysGetter: (state: any) => Object.keys(state.currencies),
    currencyBaseGetter: (state: any) => state.currencyBase,
  },
};

export default currency;
