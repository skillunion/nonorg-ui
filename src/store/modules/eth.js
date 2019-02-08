import getWeb3 from '@/util/getWeb3'

const state = {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    contractInstance: null
}

const getters = {
    WEB3: state => {
        return state.web3
    },

    CONTRACT_INSTANCE: state => {
        return state.contractInstance
    }
}

const mutations = {
    REGISTER_WEB3_INSTANCE(state, payload) {
        console.log('REGISTER_WEB3_INSTANCE Mutation being executed', payload)
        let result = payload
        let web3Copy = state.web3
        web3Copy.coinbase = result.coinbase
        web3Copy.networkId = result.networkId
        web3Copy.balance = parseInt(result.balance, 10)
        web3Copy.isInjected = result.injectedWeb3
        web3Copy.web3Instance = result.web3
        state.web3 = web3Copy
    }
}


const actions = {
    REGISTER_WEB3({ commit }) {
        console.log('REGISTER_WEB3 Action being executed')
        getWeb3.then(result => {
            console.log('committing result to REGISTER_WEB3_INSTANCE mutation')
            commit('REGISTER_WEB3_INSTANCE', result)
        }).catch(e => {
            console.log('error in action REGISTER_WEB3', e)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
};