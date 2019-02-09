import Vue from 'vue';
import Vuex from 'vuex';
import {MODULE_NAME as ETH_MODULE_NAME, MODULE as ETH_MODULE} from './eth/index'
import {MODULE_NAME as WORKS_MODULE_NAME, MODULE as WORKS_MODULE} from './works/index'
import {MODULE_NAME as TOPICS_MODULE_NAME, MODULE as TOPICS_MODULE} from './topics/index'
import {MODULE_NAME as REGISTRY_MODULE_NAME, MODULE as REGISTRY_MODULE} from './registry/index'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [ETH_MODULE_NAME]: ETH_MODULE,
    [WORKS_MODULE_NAME]: WORKS_MODULE,
    [TOPICS_MODULE_NAME]: TOPICS_MODULE,
    [REGISTRY_MODULE_NAME]: REGISTRY_MODULE
  }
})

//store.dispatch(API_ACTIONS.INIT)

export default store