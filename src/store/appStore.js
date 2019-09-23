import { SET_APP_STATE_TO_LOADING, SET_APP_STATE_TO_LOADED } from './mutation-types';
import { setAppStateToLoading, setAppStateToLoaded } from './globalActionsTypes';

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    isLoading: true,
  },
  mutations: {
    [SET_APP_STATE_TO_LOADING](state) {
      state.isLoading = true;
    },
    [SET_APP_STATE_TO_LOADED](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [setAppStateToLoading]: {
      root: true,
      handler({ commit }) {
        commit(SET_APP_STATE_TO_LOADING);
      },
    },
    [setAppStateToLoaded]: {
      root: true,
      handler({ commit }) {
        commit(SET_APP_STATE_TO_LOADED);
      },
    },
  },
  getters: {
    isLoading: state => state.isLoading,
  },
};
