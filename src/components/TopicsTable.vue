<template>
  <div>
    <v-data-table
      must-sort
      :headers="headers"
      :pagination.sync="pagination"
      :rows-per-page-items="pagination.rowsPerPageItems"
      :total-items="pagination.totalItems"
      :loading="loading"
      :items="items"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.title }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {MODULE_ACTIONS, ACTIONS, MODULE_GETTERS, GETTERS} from '@/store/topics/consts'

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      headers: [{ text: "id", value: "id" }, { text: "title", value: "title" }],
      itemData: {
        title: ""
      }
    };
  },
  watch: {
    pagination: {
      async handler() {
        this.loading = true
        await this.$store.dispatch(MODULE_ACTIONS[ACTIONS.GET_TOPIC])
        this.loading = false
      },
      deep: true
    }
  },
  computed: {
    pagination: {
      get: function() {
        return this.$store.getters[MODULE_GETTERS[GETTERS.PAGINATION_TOPICS]]
      },
      set: function(value) {
        this.$store.dispatch(MODULE_ACTIONS[ACTIONS.SET_PAGINATION_TOPICS], value)
      }
    },
    items() {
      return this.$store.getters[MODULE_GETTERS[GETTERS.TOPICS]]
    }
  }
};
</script>