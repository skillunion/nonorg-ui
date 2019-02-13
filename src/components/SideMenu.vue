<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.mdAndUp"
    mobile-break-point="960"
    v-bind:value="value"
    fixed
    app
  >
    <v-toolbar flat>
      <TopicsFilter/>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense>
      <template v-for="item in items">
        <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item.iconAlt"
          append-icon
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i" :to="i.path">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ child.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>

    <v-layout row wrap align-center pl-3 pr-3 pt-3>
      <v-flex class="text-xs-center">
        <v-btn color="primary" block @click="$router.push('/registries/create')">
          <v-icon dark left>add</v-icon>
          Add new work
        </v-btn>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import TopicsFilter from "@/components/TopicsFilter"

export default {
  name: "SuSideMenu",
  components: {
    TopicsFilter
  },
  props: ["value"],
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "group_work", text: "Works", path: "/works" },
      { icon: "group_work", text: "Apollo", path: "/apollo" },
      { icon: "group_work", text: "Topics", path: "/topics" },
      { icon: "group_work", text: "Registries", path: "/registries" },
      { icon: "insert_chart", text: "My Dashboard", path: "/dashboard" },
      { icon: "settings", text: "Governance", path: "/governance" },
      {
        icon: "help",
        iconAlt: "help_outline",
        text: "Help",
        model: false,
        children: [
          { text: "Welcome", path: "/help/welcome" },
          { text: "View guides" },
          { text: "Help center" },
          { text: "Submeet feedback" }
        ]
      }
    ]
  })
};
</script>