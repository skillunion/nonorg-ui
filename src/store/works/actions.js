import { MODULE_ACTIONS, ACTIONS, MUTATIONS, GETTERS } from './consts'
import Axios from 'axios'

const STORE_ACTIONS = {
    async [ACTIONS.GET_ITEM]({ dispatch, commit, getters }, value) { // !!!! rename to FETCH
        let { data } = await Axios.get('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/works');
        let totalItems = data.length;
        let items = data.slice(0, getters[GETTERS.PAGINATION].rowsPerPage); // !!!!!
        commit(MUTATIONS.SET_ITEM, { items, totalItems });
    },

    async [ACTIONS.SAVE_ITEM]({ dispatch, commit }, value) {
        let { data } = await Axios.post('https://my-json-server.typicode.com/skillunion/nonorg-fake-api/works', value);
        commit(MUTATIONS.ADD_ITEM, data);
    },

    [ACTIONS.SET_PAGINATION]({ dispatch, commit }, value) {
        commit(MUTATIONS.SET_PAGINATION, value);
    }
}

export { STORE_ACTIONS, MODULE_ACTIONS, ACTIONS } // MODULE_ACTIONS here also