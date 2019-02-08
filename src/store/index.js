import Vue from 'vue';
import Vuex from 'vuex';
import works from './modules/works';
import topics from './modules/topics';
import eth from './modules/eth';
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