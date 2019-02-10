import networks from '@/conf/networks.json'
import config from '@/conf/config.js'
const ethers = require('ethers')

const Abi = {
  Registry : [
    "function name() public view returns (string)"
  ],
  
  RegistryFactory : [
    "event NewRegistry(address creator, address token, address plcr, address parameterizer, address registry)",
    "function newRegistryBYOToken(address _token, uint[] _parameters, string _name) public returns (address)",
    "function newRegistryWithToken(uint _supply, string _tokenName, uint8 _decimals, string _symbol, uint[] _parameters, string _registryName) public returns (address)",
  ]
}

const Eth = {

    provider : null,
    registryFactory: null,
  
    init: function () {
      //ToDo: need to be rewritten for other providers and configurations
      this.provider = new ethers.providers.InfuraProvider("rinkeby", networks.rinkeby.apiKey)
      this.registryFactory = new ethers.Contract(networks.RegistryFactory.rinkeby.address, Abi.RegistryFactory, this.provider);
      return this;
    },

    loadRegistries : async function () {
      let provider = this.provider;
      let registryFactory = this.registryFactory;
      provider.resetEventsBlock()
      registryFactory.on('NewRegistry', async (creator, token, plcr, parameterizer, registryAddress, event) => {
        console.log('ethers registry>',registryAddress, event);
        let registry = new ethers.Contract(registryAddress, Abi.Registry, provider);
        console.log('registry.name>',await registry.name())
      })
    },

    newRegistry: async function () {
        const paramConfig = config.paramDefaults
        var registryReceipt = await this.registryFactory.newRegistryWithToken(
            ethers.utils.parseEther(config.token.supply.toString()),
            config.token.name,
            config.token.decimals,
            config.token.symbol,
            [
              ethers.utils.parseEther(paramConfig.minDeposit.toString()),
              ethers.utils.parseEther(paramConfig.pMinDeposit.toString()),
              paramConfig.applyStageLength,
              paramConfig.pApplyStageLength,
              paramConfig.commitStageLength,
              paramConfig.pCommitStageLength,
              paramConfig.revealStageLength,
              paramConfig.pRevealStageLength,
              paramConfig.dispensationPct,
              paramConfig.pDispensationPct,
              paramConfig.voteQuorum,
              paramConfig.pVoteQuorum,
              paramConfig.exitTimeDelay,
              paramConfig.exitPeriodLen,
            ],
            config.name,
          );
        console.log(registryReceipt)  
    }
}

export default Eth
