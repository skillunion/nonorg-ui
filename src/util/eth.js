import networks from '@/conf/networks.json'
import Abi from '@/conf/abi'
const ethers = require('ethers')

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
  }
}

export default Eth
