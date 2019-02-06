<template>
  <v-layout pa-3>
    <v-flex>
      <TopicsTable/>
    </v-flex>
  </v-layout>
</template>

<script>
import TopicsTable from "@/components/TopicsTable";

export default {
  name: "su-topics",
  components: {
    TopicsTable
  }
};

</script>