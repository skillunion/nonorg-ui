import networks from '@/conf/networks.json'
//import config from '@/conf/config.js'
import store from '@/store/index'; 
const ethers = require('ethers')

const Abi = {
  Registry: [
    "function name() public view returns (string)"
  ],

  RegistryFactory: [
    "event NewRegistry(address creator, address token, address plcr, address parameterizer, address registry)",
    "function newRegistryBYOToken(address _token, uint[] _parameters, string _name) public returns (address)",
    "function newRegistryWithToken(uint _supply, string _tokenName, uint8 _decimals, string _symbol, uint[] _parameters, string _registryName) public returns (address)",
  ]
}

const Eth = {

  provider_ro: null,
  provider_rw: null,
  signer: null,
  registryFactory_rw: null,
  registryFactory_ro: null,

  init: function () {
    //ToDo: need to be rewritten for other providers and configurations
    this.provider_ro = new ethers.providers.InfuraProvider("rinkeby", networks.rinkeby.apiKey)
    //ToDo: check web3 undefined
    if (typeof window.web3 !== 'undefined') {
      this.provider_rw = new ethers.providers.Web3Provider(window.web3.currentProvider)
      this.signer = this.provider_rw.getSigner()
      this.registryFactory_rw = new ethers.Contract(networks.RegistryFactory.rinkeby.address, Abi.RegistryFactory, this.signer)
    }
    this.registryFactory_ro = new ethers.Contract(networks.RegistryFactory.rinkeby.address, Abi.RegistryFactory, this.provider_ro)
    return this;
  },

  loadRegistries: async function () {
    let provider_ro = this.provider_ro
    let registryFactory = this.registryFactory_ro
    provider_ro.resetEventsBlock()
    registryFactory.on('NewRegistry', async (creator, token, plcr, parameterizer, registryAddress, event) => {
      console.log('ethers registry>', registryAddress, event);
      let registry = new ethers.Contract(registryAddress, Abi.Registry, provider_ro);
      let registryName = await registry.name()

      console.log('ethers name>', registryAddress, registryName);

      store.commit('SET_REGISTRY', {
        transactionHash: event.transactionHash,
        address: registryAddress,
        name: registryName
      })
    })
  },

  // newRegistry: async function () {
  //   const paramConfig = config.paramDefaults
  //   var registryReceipt = await this.registryFactory_rw.newRegistryWithToken(
  //     //ToDo: use other function to parse tokens in wei, taking precision in account other than 18 
  //     ethers.utils.parseEther(config.token.supply.toString()),
  //     config.token.name,
  //     config.token.decimals,
  //     config.token.symbol,
  //     [
  //       ethers.utils.parseEther(paramConfig.minDeposit.toString()),
  //       ethers.utils.parseEther(paramConfig.pMinDeposit.toString()),
  //       paramConfig.applyStageLength,
  //       paramConfig.pApplyStageLength,
  //       paramConfig.commitStageLength,
  //       paramConfig.pCommitStageLength,
  //       paramConfig.revealStageLength,
  //       paramConfig.pRevealStageLength,
  //       paramConfig.dispensationPct,
  //       paramConfig.pDispensationPct,
  //       paramConfig.voteQuorum,
  //       paramConfig.pVoteQuorum,
  //       paramConfig.exitTimeDelay,
  //       paramConfig.exitPeriodLen,
  //     ],
  //     config.name,
  //   );

  //   console.log('registryReceipt>', registryReceipt)

  //   store.commit('ADD_REGISTRY', {
  //     transactionHash: registryReceipt.hash,
  //     address: null,
  //     name: config.name
  //   })
  // }
}

export default Eth
