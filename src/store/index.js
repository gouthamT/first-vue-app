import Vue from 'vue';
import Vuex from 'vuex';

import app from './appStore';
import userTasks from './userTasks';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    userTasks,
  },
  state: {},
});
