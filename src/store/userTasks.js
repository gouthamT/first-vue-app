import axios from 'axios';
import { ADD_USER_TASKS } from './mutation-types';
import { setAppStateToLoading, setAppStateToLoaded } from './globalActionsTypes';

const logger = console;

const parseList = (source) => {
  if (!source || !source.data || !source.data.issues || !source.data.issues.length) { return []; }
  const result = source.data.issues.map(i => ({
    key: i.key,
    summary: i.fields.summary,
  }));
  return result;
};

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    [ADD_USER_TASKS](state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async getTasksAction({ dispatch, commit }) {
      try {
        dispatch(setAppStateToLoading, null, { root: true });
        const response = await axios.get('http://localhost:3001/get');
        const heroes = parseList(response);
        commit(ADD_USER_TASKS, heroes);
        return heroes;
      } catch (error) {
        return logger.log(error);
      } finally {
        dispatch(setAppStateToLoaded, null, { root: true });
      }
    },
  },
  getters: {
    tasks: state => state.tasks,
  },
};
