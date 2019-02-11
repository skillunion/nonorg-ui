import Eth from '@/util/eth'

// registries are stored as key-value object, to avoid to have 
// more than one instance of object with same id ("transactionHash" in this case)

const state = {
  registries: {},
  loading: true
}

const getters = {
  GET_REGISTRIES: state => Object.values(state.registries),
  IS_REGISTRIES_LOADING: state => state.loading
}

const mutations = {
  SET_REGISTRY: (state, registry) => {
    registry.status = registry.address ? 'published' : 'pending'
    state.registries = { ...state.registries, [registry.transactionHash]: registry }
    state.loading = false
  },

  ADD_REGISTRY: (state, registry) => {
    registry.status = registry.address ? 'published' : 'pending'
    state.registries = { ...state.registries, [registry.transactionHash]: registry }
    state.loading = false
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions,
};