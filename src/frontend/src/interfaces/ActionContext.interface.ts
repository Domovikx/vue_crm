import { Dispatch, Commit } from 'vuex';

export interface ActionContext {
  dispatch?: Dispatch | any;
  commit?: Commit | any;
  state?: any;
  getters?: any;
  rootState?: any;
  rootGetters?: any;
}
