import Vue from 'vue';
import Vuex from 'vuex';
import works from './works';
import topics from './topics';
import eth from './eth';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    works,
    topics,
    eth
  }
});