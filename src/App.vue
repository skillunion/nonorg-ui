<template>
  <v-app id="app">
    <SuSideMenu 
      @add-work-button-click="dialog = true"
      v-model="drawer"/>
    <SuHeader @menu-click="drawer = !drawer"/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <NewTopicDialog 
      @close="$router.push('/registries'); dialog = false"
      v-bind:value="dialog"/>
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
    drawer: true,
    dialog: false
  })
};
</script>