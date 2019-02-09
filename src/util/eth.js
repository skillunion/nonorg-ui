import contract from 'truffle-contract'
import RegistryContract from '@/abi/Registry.json'
import RegistryFactoryContract from '@/abi/RegistryFactory.json'
import config from '@/conf/config.json'
const ethers = require('ethers')

const EthContext = {

    contract: null,

    registryFactory: null,
  
    init: async function () {
      let abi_Factory = [
        "event NewRegistry(address creator, address token, address plcr, address parameterizer, address registry)",
        "function newRegistryBYOToken(address _token, uint[] _parameters, string _name) public returns (address)",
        "function newRegistryWithToken(uint _supply, string _tokenName, uint8 _decimals, string _symbol, uint[] _parameters, string _registryName) public returns (address)",
      ]
      let abi_Registry = [
        "function name() public view returns (string)"
      ]
      console.log('1.starting EthContext.init')
      let provider = new ethers.providers.InfuraProvider("rinkeby", "52bd875c563a4d6abff4d396bac8a8a5")
      provider.resetEventsBlock(3838900)
      let registryFactory = new ethers.Contract("0xbab4bd488a2c489b04bd867e26293ab88ab87392", abi_Factory, provider);
      registryFactory.on('NewRegistry', async (creator, token, plcr, parameterizer, registryAddress, event) => {
        console.log('ethers registry>',registryAddress, event);
        let registry = new ethers.Contract(registryAddress, abi_Registry, provider);
        console.log('registry.name>',await registry.name())
      })
    },

    newRegistry: async function () {
        let self = this
        const paramConfig = config.paramDefaults

        var registryReceipt = await self.registryFactory.newRegistryWithToken(
            config.token.supply,
            config.token.name,
            config.token.decimals,
            config.token.symbol,
            [
              paramConfig.minDeposit,
              paramConfig.pMinDeposit,
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
    },
    Registry
}

const Registry = {

  contract: null,

  instance: null,

  web3 : null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(RegistryContract)
      self.web3 = window.web3
      self.contract.setProvider(self.web3.currentProvider)
      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  name: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.name.call(
        {from: self.web3.eth.accounts[0]}
      ).then(name => {
        resolve(self.web3.toUtf8(name))
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default EthContext
