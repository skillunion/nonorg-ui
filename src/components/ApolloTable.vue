<template>
  <v-data-table must-sort :headers="headers" :items="products" :pagination.sync="pagination" class="elevation-1">
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.id }}</td>
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.price }}</td>
    </template>
  </v-data-table>
</template>

<script>
import PRODUCTS_ALL from "../graphql/ProductsAll.gql";

export default {
  name: "su-apollotable",
  data() {
    return {
      products: [],
      headers: [
        {
          text: "id",
          value: "id"
        },
        {
          text: "name",
          value: "name"
        },
        {
          text: "price",
          value: "price"
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    };
  },

  apollo: {
    products: {
      query: PRODUCTS_ALL
    }
  }
};
</script>