#!/bin/bash
export MNEMONIC='raven moment defy autumn unlock fantasy muscle doctor dove cave impose since'
pushd ../tcr
npm run deploy-ganache
npm run deploy-proxies:ganache
popd
cp ../tcr/build/contracts/*.json ./src/abi
