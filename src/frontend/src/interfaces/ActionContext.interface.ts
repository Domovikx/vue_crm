import { Dispatch, Commit } from 'vuex';

interface ActionContext {
  dispatch?: Dispatch | any;
  commit?: Commit | any;
  state?: any;
  getters?: any;
  rootState?: any;
  rootGetters?: any;
}

export default ActionContext;
