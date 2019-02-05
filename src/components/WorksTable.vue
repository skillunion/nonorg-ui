<template>
  <v-list two-line>
    <template v-for="(item, index) in TODOS">
      <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

      <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

      <v-list-tile v-else :key="item.title" avatar @click>

        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WorksTable",
  created: function() {
    console.log("table component: ", this);
  },
  computed: {
    ...mapGetters(["TODOS"])
  },
  mounted() {
    console.log('store', this.$store);
    this.$store.dispatch("GET_TODO");
  }
};
</script>