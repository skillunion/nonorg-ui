<template>
  <div>
    <v-data-table
      must-sort
      :headers="headers"
      :loading="loading"
      :items="items"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [{ text: "address", value: "address" }, { text: "name", value: "name" }, { text: "status", value: "status"}]
    };
  },
  computed: {
    items() {
      return this.$store.getters.GET_REGISTRIES
    },
    loading() {
      return this.$store.getters.IS_REGISTRIES_LOADING
    }
  }
};
</script>