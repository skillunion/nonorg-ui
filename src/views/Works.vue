<template>
  <v-layout pa-3>
    <v-flex>
      <WorksTable/>
    </v-flex>
  </v-layout>
</template>

<script>
import WorksTable from "@/components/WorksTable";

export default {
  name: "su-works",
  components: {
    WorksTable
  }
};

</script>