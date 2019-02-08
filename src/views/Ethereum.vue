<template>
  <HelloMetamask/>
</template>

<script>
import HelloMetamask from '@/components/HelloMetamask'
import {MODULE_ACTIONS, ACTIONS, MODULE_GETTERS, GETTERS} from '@/store/eth/consts'

export default {
  name: "su-ethereum",
  components: {
    HelloMetamask
  },
  beforeCreate () {
    this.$store.dispatch(MODULE_ACTIONS[ACTIONS.REGISTER_WEB3])
  }
};
</script>