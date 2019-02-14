const Abi = {
  Registry: [
    "event _Application(bytes32 indexed listingHash, uint deposit, uint appEndDate, string data, address indexed applicant)",
    "function name() public view returns (string)",
    "function apply(bytes32 _listingHash, uint _amount, string _data) external"
  ],

  RegistryFactory: [
    "event NewRegistry(address creator, address token, address plcr, address parameterizer, address registry)",
    "function newRegistryBYOToken(address _token, uint[] _parameters, string _name) public returns (address)",
    "function newRegistryWithToken(uint _supply, string _tokenName, uint8 _decimals, string _symbol, uint[] _parameters, string _registryName) public returns (address)",
    "function newRegistryWithToken_ThenApply(uint _supply, string _tokenName, uint8 _decimals, string _symbol, bytes32 _listingHash, uint _amount, string _data, uint[] _parameters, string _registryName) public returns (address)"
  ]
}

export default Abi