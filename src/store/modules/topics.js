import Axios from 'axios'

const state = {
  pagination: {
    descending: true,
    page: 1,
    rowsPerPage: 8,
    sortBy: 'fat',
    totalItems: 0,
    rowsPerPageItems: [1, 2, 4, 8, 16]
  },
  items: []
}

const getters = {
  LOADING_TOPICS: state => {
    return state.loading
  },

  PAGINATION_TOPICS: state => {
    return state.pagination
  },

  TOPICS: state => {
    return state.items
  }
}

const mutations = {
  SET_PAGINATION_TOPICS: (state, payload) => {
    state.pagination = payload
  },

  SET_TOPIC: (state, { items, totalItems }) => {
    state.items = items
    state.pagination.totalItems = totalItems
  },

  ADD_TOPIC: (state, payload) => {
    state.items.push(payload);
  }
}

const actions = {
  GET_TOPIC: async (context) => { // , payload
    let { data } = await Axios.get('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/topics');
    let totalItems = data.length;
    let items = data.slice(0, state.pagination.rowsPerPage); // !!!!!
    context.commit('SET_TOPIC', { items, totalItems });
  },

  SAVE_TOPIC: async (context, payload) => {
    let { data } = await Axios.post('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/topics', payload);
    context.commit('ADD_TOPIC', data);
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
};