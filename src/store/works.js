import Axios from 'axios'
import Eth from '@/util/eth'
import Abi from '@/conf/abi'
const ethers = require('ethers')

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
  GET_ITEM: async (context) => { // payload - the second param
    let { data } = await Axios.get('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/works');
    let totalItems = data.length;
    let items = data.slice(0, state.pagination.rowsPerPage); // !!!!!
    context.commit('SET_ITEM', { items, totalItems });
  },

  SAVE_ITEM: async (context, payload) => {
    let { data } = await Axios.post('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/works', payload);
    context.commit('ADD_ITEM', data);
  },

  ADD_WORK_INTO_REGISTRY: async (context, work) => {
    var listingDataString = work.name + ';' + work.link,
      listingData = ethers.utils.toUtf8Bytes(listingDataString),
      listingHash = ethers.utils.sha256(listingData); // !!!!! Add userId, salt ???

    var registry = new ethers.Contract(work.registryAddress, Abi.Registry, Eth.signer)

    var registryReceipt = await registry.apply(
      listingHash,
      ethers.utils.parseEther(work.amount.toString()),
      listingDataString
    );

    console.log('registryReceipt', registryReceipt);
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
};