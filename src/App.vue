<template>
  <v-app id="app">
    <SuSideMenu v-model="drawer"/>
    <SuHeader @menu-click="drawer = !drawer"/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SuHeader from "@/components/TheHeader";
import SuSideMenu from "@/components/SideMenu";

export default {
  name: "App",
  components: {
    SuHeader,
    SuSideMenu
  },
  data: () => ({
    drawer: true
  })
};
</script>