<template>
  <v-app id="app">
    <SuSideMenu v-model="drawer"/>
    <SuHeader @menu-click="drawer = !drawer"/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <NewTopicDialog @close="onNewTopicDialogClose" v-bind:value="createRegistryVisibility"/>
  </v-app>
</template>

<script>
import SuHeader from "@/components/TheHeader"
import SuSideMenu from "@/components/SideMenu"
import NewTopicDialog from "@/components/NewTopicDialog"

export default {
  name: "App",
  components: {
    SuHeader,
    SuSideMenu,
    NewTopicDialog
  },
  data: () => ({
    drawer: true
  }),
  methods: {
    onNewTopicDialogClose() {
      this.$store.commit('SET_CREATE_REGISTRY_VISIBILITY', false)
      this.$router.push('/registries')
    }
  },
  computed: {
    createRegistryVisibility() {
      return this.$store.getters.GET_CREATE_REGISTRY_VISIBILITY;
    }
  }
};
</script>