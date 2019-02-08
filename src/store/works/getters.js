import { MODULE_GETTERS, GETTERS } from './consts'

const STORE_GETTERS = {
    [GETTERS.LOADING](state) {
        return state.loading
    },

    [GETTERS.PAGINATION](state) {
        return state.pagination
    },

    [GETTERS.ITEMS](state) {
        return state.items
    }
}

export { STORE_GETTERS, MODULE_GETTERS, GETTERS }