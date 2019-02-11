<template>
  <v-layout row justify-center>
      <v-dialog v-bind:value="value" persistent max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">New topic</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="formData.name" label="Title*" required></v-text-field>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="onCloseButtonClick">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="onSaveButtonClick">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: ""
      }
    };
  },
  props: ["value"],
  methods: {
    async onSaveButtonClick() {
      
    },
    onCloseButtonClick() {
      this.value = false
    }
  }
};
</script>