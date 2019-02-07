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
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Topic not found. Suggest a topic <router-link tag="a" to="/topics/new">here</router-link>.</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
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
    onFilterChanged() { //topics - input var
      //this.$store.dispatch("SET_FILTER_CATEGORY_WORKS", topics.id)
    }
  }
};
</script>