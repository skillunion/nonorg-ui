<template>
  <v-layout pa-3>
    <v-flex>
      <TopicsFilter @filter-changed="onFilterChanged" />
      <WorksTable/>
      <div>Reactive filtering :)</div>
      <div>SELECTED TOPICS: {{selectedTopics}}</div>
    </v-flex>
  </v-layout>
</template>

<script>
import WorksTable from "@/components/WorksTable";
import TopicsFilter from "@/components/TopicsFilter";

export default {
  name: "su-works",
  components: {
    WorksTable,
    TopicsFilter
  },
  data() {
    return {
      selectedTopics: null
    };
  },
  methods:{
    onFilterChanged(topics) {
      this.selectedTopics = topics;
    }
  }
};

</script>