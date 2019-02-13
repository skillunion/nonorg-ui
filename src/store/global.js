const state = {
  currentTopic: null,
  createRegistryVisibility: false
}

const getters = {
  GET_CURRENT_TOPIC: state => state.currentTopic,
  GET_CREATE_REGISTRY_VISIBILITY: state => state.createRegistryVisibility
}

const mutations = {
  SET_CURRENT_TOPIC: (state, topic) => {
    state.currentTopic = topic;
  },
  SET_CREATE_REGISTRY_VISIBILITY: (state, value) => {
    state.createRegistryVisibility = value;
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
};