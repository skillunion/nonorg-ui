<template>
  <HelloMetamask/>
</template>

<script>
import HelloMetamask from '@/components/HelloMetamask'

export default {
  name: "su-ethereum",
  components: {
    HelloMetamask
  },
  beforeCreate () {
    console.log('REGISTER_WEB3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('REGISTER_WEB3')
  }
};
</script>