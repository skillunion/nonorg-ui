import {MUTATIONS} from './consts'

const STORE_MUTATIONS = {
    [MUTATIONS.SET_PAGINATION]: (state, payload) => {
        state.pagination = payload
    },

    [MUTATIONS.SET_ITEM]: (state, { items, totalItems }) => {
        state.items = items
        state.pagination.totalItems = totalItems
    },

    [MUTATIONS.ADD_ITEM]: (state, payload) => {
        state.items.push(payload);
    }
}

export {STORE_MUTATIONS}