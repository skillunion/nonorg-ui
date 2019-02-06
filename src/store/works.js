import Axios from 'axios'

const state = {
  pagination: {
    descending: true,
    page: 1,
    rowsPerPage: 16,
    sortBy: 'fat',
    totalItems: 0,
    rowsPerPageItems: [1, 2, 4, 8, 16]
  },
  items: []
}

const getters = {
  LOADING: state => {
    return state.loading
  },

  PAGINATION: state => {
    return state.pagination
  },

  ITEMS: state => {
    return state.items
  }
}

const mutations = {
  SET_PAGINATION: (state, payload) => {
    state.pagination = payload
  },

  SET_ITEM: (state, { items, totalItems }) => {
    state.items = items
    state.pagination.totalItems = totalItems
  },

  ADD_ITEM: (state, payload) => {
    state.items.push(payload);
  }
}

const actions = {
  GET_ITEM: async (context, payload) => {
    let { data } = await Axios.get('https://my-json-server.typicode.com/skillunion/nonorg-myjsonserver/works');
    let totalItems = data.length;
    let items = data.slice(0, state.pagination.rowsPerPage); // !!!!!
    context.commit('SET_ITEM', { items, totalItems });
  },

  SAVE_ITEM: async (context, payload) => {
    let { data } = await Axios.post('https://my-json-server.typicode.com/skillunion/nonorg-myjsonserver/works', payload);
    context.commit('ADD_ITEM', data);
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
};