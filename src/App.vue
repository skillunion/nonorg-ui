<template>
  <v-app id="app">
    <SuSideMenu v-model="drawer"/>
    <SuHeader @menu-click="drawer = !drawer"/>
    <router-view></router-view>
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