<template>
  <div>
    <v-data-table
      must-sort
      :headers="headers"
      :loading="loading"
      :items="items"
      :pagination.sync="pagination.sync"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">
          <v-chip v-if="props.item.status == 'published'" color="green" text-color="white">{{ props.item.status }}</v-chip>
          <v-chip v-else color="orange" text-color="white">{{ props.item.status }}</v-chip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "address", value: "address" },
        { text: "name", value: "name" },
        { text: "status", value: "status" }
      ],
      pagination: {
        sync: {
          rowsPerPage: -1
        }
      }
    };
  },
  computed: {
    items() {
      return this.$store.getters.GET_REGISTRIES;
    },
    loading() {
      return this.$store.getters.IS_REGISTRIES_LOADING;
    }
  }
};
</script>