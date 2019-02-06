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
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="400px">
        <v-btn slot="activator" color="primary" dark>Create new item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Work</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="itemData.title" label="Title*" required></v-text-field>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="onCloseButtonClick">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="onSaveButtonClick">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      headers: [{ text: "id", value: "id" }, { text: "title", value: "title" }],
      itemData: {
        'title': ""
      }
    };
  },
  watch: {
    pagination: {
      handler() {
        this.loading = true;
        this.$store.dispatch("GET_ITEM").then(result => {
          this.loading = false;
        });
      },
      deep: true
    }
  },
  computed: {
    pagination: {
      get: function() {
        return this.$store.getters.PAGINATION;
      },
      set: function(value) {
        this.$store.commit("SET_PAGINATION", value);
      }
    },
    items() {
      return this.$store.getters.ITEMS;
    }
  },
  methods: {
    async onSaveButtonClick() {
      await this.$store.dispatch("SAVE_ITEM", this.itemData)
      this.itemData.title = "";
      this.dialog = false;
    },
    onCloseButtonClick() {
      this.itemData.title = "";
      this.dialog = false;
    }
  }
};
</script>