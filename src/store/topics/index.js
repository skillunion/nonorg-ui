import { MODULE_NAME, GETTERS, MODULE_GETTERS, MUTATIONS, ACTIONS, MODULE_ACTIONS } from './consts'
import Axios from 'axios'

const MODULE = {
  namespaced: true,
  state: {
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 8,
      sortBy: 'fat',
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16]
    },
    items: []
  },

  getters: {
    [GETTERS.LOADING_TOPICS]: state => {
      return state.loading
    },

    [GETTERS.PAGINATION_TOPICS]: state => {
      return state.pagination
    },

    [GETTERS.TOPICS]: state => {
      return state.items
    }
  },

  mutations: {
    [MUTATIONS.SET_PAGINATION_TOPICS]: (state, payload) => {
      state.pagination = payload
    },

    [MUTATIONS.SET_TOPIC]: (state, { items, totalItems }) => {
      state.items = items
      state.pagination.totalItems = totalItems
    },

    [MUTATIONS.ADD_TOPIC]: (state, payload) => {
      state.items.push(payload);
    }
  },

  actions: {
    [ACTIONS.GET_TOPIC]: async ({ dispatch, commit, getters }, value) => { // , payload
      let { data } = await Axios.get('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/topics');
      let totalItems = data.length;
      let items = data.slice(0, getters[GETTERS.PAGINATION_TOPICS].rowsPerPage); // !!!!!
      commit(MUTATIONS.SET_TOPIC, { items, totalItems });
    },

    [ACTIONS.SAVE_TOPIC]: async ({ dispatch, commit }, value) => {
      let { data } = await Axios.post('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/topics', value);
      commit(MUTATIONS.ADD_TOPIC, data);
    },

    [ACTIONS.SET_PAGINATION_TOPICS]({ dispatch, commit }, value) {
        commit(MUTATIONS.SET_PAGINATION_TOPICS, value);
    }
  }
}

export { MODULE_NAME, MODULE, MODULE_ACTIONS, MODULE_GETTERS }