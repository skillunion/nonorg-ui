<template>
  <v-layout pa-3 mb-12>
    <v-flex>
      <ApolloTable/>
    </v-flex>
  </v-layout>
</template>

<script>
import ApolloTable from "@/components/ApolloTable";

export default {
  name: "su-apollo",
  components: {
    ApolloTable
  }
};

</script>