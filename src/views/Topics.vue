<template>
  <v-flex>
    <TopicsTable/>
  </v-flex>
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