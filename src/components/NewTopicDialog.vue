<template>
  <v-layout row justify-center>
    <v-dialog v-bind:value="value" scrollable persistent lazy max-width="600px">
      <!-- FORM -->
      <v-card v-show="!isLoading">
        <v-card-title>
          <span class="headline">Add New Work</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
          <v-form ref="form" lazy-validation>
            <!-- <v-container grid-list-md pa-0> -->
            <!-- WORK -->
            <v-layout column>
              <v-text-field
                v-model="form.work.name"
                :rules="[rules.required]"
                label="Work Title"
                counter
                maxlength="30"
                autofocus
                required
              ></v-text-field>
              <v-text-field
                v-model="form.work.link"
                :rules="[rules.required]"
                label="Work Link"
                required
              ></v-text-field>
            </v-layout>

            <!-- SWITCH -->
            <v-layout column>
              <v-switch v-model="form.useNewRegistry" color="primary" label="Create new topic"></v-switch>
            </v-layout>

            <!-- CURRENT REGISTRY READONLY -->
            <v-layout column v-show="!form.useNewRegistry">
              <v-text-field
                label="Registry Name"
                v-model="form.currentRegistry.name"
                :rules="[rules.requiredIfCurrent]"
                readonly
                disabled
                required
              ></v-text-field>

              <v-text-field
                label="Registry Address"
                v-model="form.currentRegistry.address"
                :rules="[rules.requiredIfCurrent]"
                readonly
                disabled
                required
              ></v-text-field>
            </v-layout>

            <!-- NEW REGISTRY -->
            <v-layout column v-show="form.useNewRegistry">
              <v-text-field label="Topic Title" v-model="form.registry.name" autofocus required></v-text-field>
              <v-switch v-model="form.advancedOptions" color="primary" label="Advanced Options"></v-switch>
            </v-layout>

            <!-- ADVANCED OPTIONS -->
            <v-layout column v-show="form.advancedOptions">
              <!-- TOKEN -->
              <v-text-field
                label="Token supply"
                v-model="form.registry.token.supply"
                :rules="[rules.requiredIfNew]"
                type="number"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="Token name"
                v-model="form.registry.token.name"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="Token decimals"
                v-model="form.registry.token.decimals"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="Token symbol"
                v-model="form.registry.token.symbol"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <!-- PARAMS -->
              <v-text-field
                label="minDeposit"
                v-model="form.registry.parameters.minDeposit"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="pMinDeposit"
                v-model="form.registry.parameters.pMinDeposit"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="applyStageLength"
                v-model="form.registry.parameters.applyStageLength"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="pApplyStageLength"
                v-model="form.registry.parameters.pApplyStageLength"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="commitStageLength"
                v-model="form.registry.parameters.commitStageLength"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="pCommitStageLength"
                v-model="form.registry.parameters.pCommitStageLength"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="revealStageLength"
                v-model="form.registry.parameters.revealStageLength"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="pRevealStageLength"
                v-model="form.registry.parameters.pRevealStageLength"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="dispensationPct"
                v-model="form.registry.parameters.dispensationPct"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="pDispensationPct"
                v-model="form.registry.parameters.pDispensationPct"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="voteQuorum"
                v-model="form.registry.parameters.voteQuorum"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="pVoteQuorum"
                v-model="form.registry.parameters.pVoteQuorum"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>

              <v-text-field
                label="exitTimeDelay"
                v-model="form.registry.parameters.exitTimeDelay"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>
              <v-text-field
                label="exitPeriodLen"
                v-model="form.registry.parameters.exitPeriodLen"
                :rules="[rules.requiredIfNew]"
                autofocus
                required
              ></v-text-field>
            </v-layout>
            <!-- </v-container> -->
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCloseButtonClick">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSaveButtonClick">Save</v-btn>
        </v-card-actions>
      </v-card>

      <!-- LOADER -->
      <v-card color="primary" v-show="isLoading" dark>
        <v-card-text>Connecting to the MetaMask
          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import config from "@/conf/config.js";

const defaultFormValues = {
  work: {
    name: null,
    link: null
  },
  currentRegistry: {
    name: null,
    address: null
  },
  useNewRegistry: true,
  advancedOptions: false,
  registry: {
    name: config.name,
    token: {
      supply: config.token.supply, // ethers.utils.parseEther(.toString())
      name: config.token.name,
      decimals: config.token.decimals,
      symbol: config.token.symbol
    },
    parameters: {
      minDeposit: config.paramDefaults.minDeposit, // ethers.utils.parseEther(.toString())
      pMinDeposit: config.paramDefaults.pMinDeposit, // ethers.utils.parseEther(.toString())
      applyStageLength: config.paramDefaults.applyStageLength,
      pApplyStageLength: config.paramDefaults.pApplyStageLength,
      commitStageLength: config.paramDefaults.commitStageLength,
      pCommitStageLength: config.paramDefaults.pCommitStageLength,
      revealStageLength: config.paramDefaults.revealStageLength,
      pRevealStageLength: config.paramDefaults.pRevealStageLength,
      dispensationPct: config.paramDefaults.dispensationPct,
      pDispensationPct: config.paramDefaults.pDispensationPct,
      voteQuorum: config.paramDefaults.voteQuorum,
      pVoteQuorum: config.paramDefaults.pVoteQuorum,
      exitTimeDelay: config.paramDefaults.exitTimeDelay,
      exitPeriodLen: config.paramDefaults.exitPeriodLen
    }
  }
};

export default {
  data() {
    return {
      form: JSON.parse(JSON.stringify(defaultFormValues)),
      isLoading: false,
      rules: {
        required: value => !!value || "Required",
        requiredIfNew: value =>
          !this.form.useNewRegistry ||
          !!value ||
          "Required when adding to a new topic",
        requiredIfCurrent: value =>
          this.form.useNewRegistry ||
          !!value ||
          "Required when adding existing topic"
      }
    };
  },
  props: ["value"],
  methods: {
    async onSaveButtonClick() {
      if (!this.$refs.form.validate()) return;

      this.isLoading = true;

      await this.$store.dispatch(
        "ADD_REGISTRY",
        JSON.parse(JSON.stringify(this.form))
      );

      this.isLoading = false;

      this.onCloseButtonClick();
    },
    onCloseButtonClick() {
      this.$emit("close");
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        this.form = JSON.parse(JSON.stringify(defaultFormValues));
        let currentRegistry = this.$store.getters.GET_CURRENT_TOPIC;
        this.form.currentRegistry.name =
          currentRegistry && currentRegistry.name;
        this.form.currentRegistry.address =
          currentRegistry && currentRegistry.address;
        this.form.useNewRegistry = !currentRegistry;
        this.$refs.form && this.$refs.form.resetValidation();
      } else {
        this.$refs.form.reset();
      }
    },
    $route: function() {
      this.form.work.name = this.$route.query.title || "";
      this.form.work.link = this.$route.query.link || "";
    }
  }
};
</script>