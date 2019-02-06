<template>
  <v-layout>
    <v-combobox
      v-model="select"
      :items="items"
      item-text="title"
      item-value="id"
      label="Select topics to filter works"
      multiple
      chips
      solo
      @input="$emit('filter-changed', select)"
    ></v-combobox>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      select: null
    };
  },
  computed: {
    items() {
      return this.$store.getters.TOPICS;
    }
  },
  mounted() {
    this.$store.dispatch("GET_TOPIC");
  }
};
</script>