import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: null,
  },

  getters: {
    TODOS: state => {
      return state.todos;
    }
  },

  mutations: {
    SET_TODO: (state, payload) => {
      state.todos = payload;
    },

    ADD_TODO: (state, payload) => {
      state.todos.push(payload);
    },
  },

  actions: {
    GET_TODO: async (context, payload) => {
      let {data} = await Axios.get('https://my-json-server.typicode.com/skillunion/nonorg-myjsonserver/works');
      context.commit('SET_TODO', data);
    },

    SAVE_TODO: async (context, payload) => {
      let {data} = await Axios.post('https://my-json-server.typicode.com/skillunion/nonorg-myjsonserver/works', payload);
      context.commit('ADD_TODO', data);
    },
  },
});