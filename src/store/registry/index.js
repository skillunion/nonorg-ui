import getWeb3 from '@/util/getWeb3'
import { MODULE_NAME, GETTERS, MODULE_GETTERS, MUTATIONS, ACTIONS, MODULE_ACTIONS } from './consts'
import { MODULE_ACTIONS as ETH_ACTIONS } from '../eth/index'

const MODULE = {
    namespaced: true,

    state: {

    },

    getters: {

    },

    mutations: {

    },

    actions: {
        [ACTIONS.APPLY_REGISTER]: async ({ dispatch, commit, getters }, value) => { // , payload
            
            //commit(MUTATIONS.SET_TOPIC, { items, totalItems });
        },
    }
}

export { MODULE_NAME, MODULE, MODULE_ACTIONS, MODULE_GETTERS }