<template>
  <div>
    <v-layout>
      <v-combobox
        v-model="topicFilter.select"
        :items="topicFilter.items"
        label="Select topics to filter works"
        multiple
        chips
        solo
      ></v-combobox>
      <v-btn large @click="dialog = !dialog" color="primary" dark class="my-0">
        <v-icon dark>add</v-icon>Add new work
      </v-btn>
    </v-layout>

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
        <v-card>
          <v-card-title>
            <span class="headline">New work</span>
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
        title: ""
      },
      topicFilter: {
        select: null,
        items: [
          "Sharding",
          "Plasma",
          "Casper",
          "Uncategorized",
          "Economics",
          "Applications",
          "zk-s[nt]arks",
          "Better ICOs",
          "State channels",
          "Security",
          "EVM/eWASM",
          "meta-innovation",
          "Decentralized exchanges",
          "Multiparty Computation",
          "Administrivia",
          "UI/UX",
          "Miscellaneous",
          "mining",
          "Data Science"
        ]
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
      await this.$store.dispatch("SAVE_ITEM", this.itemData);
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