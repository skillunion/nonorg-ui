import contract from 'truffle-contract'
import RegistryContract from '@/abi/Registry.json'
import RegistryFactoryContract from '@/abi/RegistryFactory.json'
import config from '@/conf/config.json'


const EthContext = {
    provide : {
       eth : () => this
    },

    contract: null,

    registryFactory: null,
  
    web3 : null,
  
    init: function () {
      let self = this
  
      new Promise(function (resolve, reject) {
        console.log('1.starting EthContext.init')
        self.contract = contract(RegistryFactoryContract)
        self.web3 = window.web3
        self.contract.setProvider(self.web3.currentProvider)
        console.log('self.web3.currentProvider',self.web3.currentProvider)
        console.log('self.contract',self.contract)
        self.contract.deployed().then(instance => {
          console.log('RESOLVED#1 instance')
          self.registryFactory = instance
          resolve(instance)
          console.log('RESOLVED EthContext.init')
        }).catch(err => {
          console.log('err #3>',err)
          reject(err)
          console.log('REJECTED EthContext.init')
        })
        console.log('END EthContext.init')
      }).then(async registryFactory => {
        let n = await registryFactory.registriesLen.call();
        console.log('n>',n)

         let r;
        r = await registryFactory.registries(0)
          console.log('r0>',r)
          r = await registryFactory.registries(1)
            console.log('r1>',r)
            r = await registryFactory.registries(2)
            console.log('r2>',r)
            r = await registryFactory.registries(3)
            console.log('r3>',r)

    /*    
        registryFactory.getPastEvents({
            address: registryFactory.address
        },function(e, data) {
            // do something with data.listingId
            console.log('#5',e,data);
        })
      */
    })
    },

    newRegistry: async function () {
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
