const state = {
  currentTopic: null
}

const getters = {
  GET_CURRENT_TOPIC: state => state.currentTopic
}

const mutations = {
  SET_CURRENT_TOPIC: (state, topic) => {
      console.log('topic',topic)
    state.currentTopic = topic
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