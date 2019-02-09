#!/bin/bash
export MNEMONIC='raven moment defy autumn unlock fantasy muscle doctor dove cave impose since'
pushd ../tcr
npm run deploy-rinkeby
npm run deploy-proxies:rinkeby
popd
cp ../tcr/build/contracts/*.json ./src/abi
