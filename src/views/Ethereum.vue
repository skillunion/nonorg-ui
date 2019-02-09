<template>
  <div>
    <HelloMetamask/>
    <v-btn color="primary" @click="onApplyButtonClick">Apply registry</v-btn>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Apply registry</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="itemData.title" label="Title" required></v-text-field>
            <v-text-field v-model="itemData.url" label="URL" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="onCloseButtonClick">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="onSaveButtonClick">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import HelloMetamask from "@/components/HelloMetamask";
import {
  MODULE_ACTIONS,
  ACTIONS,
  MODULE_GETTERS,
  GETTERS
} from "@/store/eth/consts";

export default {
  name: "su-ethereum",
  components: {
    HelloMetamask
  },
  beforeCreate() {
    this.$store.dispatch(MODULE_ACTIONS[ACTIONS.REGISTER_WEB3]);
  },
  data() {
    return {
      itemData: {
        title: '',
        url: ''
      },
      dialog: false
    }
  },
  methods: {
    onApplyButtonClick() {
      this.dialog = true
      console.log('hello')
    },
    onCloseButtonClick() {
      this.itemData.title = ''
      this.itemData.url = ''
      this.dialog = false
    },
    onSaveButtonClick() {
      let web3 = this.$store.getters[MODULE_GETTERS[GETTERS.WEB3]].web3Instance()
      console.log(web3)
      console.log('hello2')
    }
  }
};
</script>