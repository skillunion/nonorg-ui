<template >
    <v-combobox 
      v-model="select"
      :items="items"
      item-text="title"
      item-value="id"
      label="Select topic"
      solo
      @input="onFilterChanged(select)"
      hide-details
    ></v-combobox>
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
  },
  methods: {
    onFilterChanged(topics) {
      //this.$store.dispatch("SET_FILTER_CATEGORY_WORKS", topics.id)
    }
  }
};
</script>