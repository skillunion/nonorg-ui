import Eth from '@/util/eth'
import Abi from '@/conf/abi'
const ethers = require('ethers')

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
  INIT_REGISTRY: async (context) => {
    let provider_ro = Eth.provider_ro
    let registryFactory = Eth.registryFactory_ro
    provider_ro.resetEventsBlock()
    registryFactory.on('NewRegistry', async (creator, token, plcr, parameterizer, registryAddress, event) => {

      let registry = new ethers.Contract(registryAddress, Abi.Registry, provider_ro);
      let registryName = await registry.name()

      context.commit('SET_REGISTRY', {
        transactionHash: event.transactionHash,
        address: registryAddress,
        name: registryName
      })
    })
  },

  ADD_REGISTRY: async (context, data) => {
    var registryReceipt = await Eth.registryFactory_rw.newRegistryWithToken(
      //ToDo: use other function to parse tokens in wei, taking precision in account other than 18
      ethers.utils.parseEther(data.registry.token.supply.toString()),
      data.registry.token.name,
      data.registry.token.decimals,
      data.registry.token.symbol,
      [
        ethers.utils.parseEther(data.registry.parameters.minDeposit.toString()),
        ethers.utils.parseEther(data.registry.parameters.pMinDeposit.toString()),
        data.registry.parameters.applyStageLength,
        data.registry.parameters.pApplyStageLength,
        data.registry.parameters.commitStageLength,
        data.registry.parameters.pCommitStageLength,
        data.registry.parameters.revealStageLength,
        data.registry.parameters.pRevealStageLength,
        data.registry.parameters.dispensationPct,
        data.registry.parameters.pDispensationPct,
        data.registry.parameters.voteQuorum,
        data.registry.parameters.pVoteQuorum,
        data.registry.parameters.exitTimeDelay,
        data.registry.parameters.exitPeriodLen
      ],
      data.registry.name
    );

    context.commit('ADD_REGISTRY', {
      transactionHash: registryReceipt.hash,
      address: null,
      name: data.registry.name
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
};