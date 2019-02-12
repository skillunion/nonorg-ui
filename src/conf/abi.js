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

export default Abi