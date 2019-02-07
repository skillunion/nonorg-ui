<template>
  <div class='metamask-info'>
    <p>Metamask: {{ web3.isInjected }}</p>
    <p>Network: {{ web3.networkId }}</p>
    <p>Account: {{ web3.coinbase }}</p>
    <p>Balance: {{ web3.balance }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloMetamask',
  computed: {
    web3 () {
      return this.$store.getters.WEB3
    }
  }
}
</script>

<style scoped></style>