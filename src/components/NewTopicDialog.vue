<template>
  <v-layout row justify-center>
    <v-dialog v-bind:value="value" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Work</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-container grid-list-md pa-0>
              <!-- WORK -->
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Work Title" v-model="form.work.name" autofocus required></v-text-field>
                </v-flex>
              </v-layout>

              <!-- CURRENT REGISTRY READONLY -->
              <v-layout wrap v-show="!form.useNewRegistry">
                <v-flex xs12>
                  <v-text-field
                    label="Registry Address"
                    v-model="form.currentRegistry.address"
                    readonly
                    disabled
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Registry Name"
                    v-model="form.currentRegistry.name"
                    readonly
                    disabled
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <!-- SWITCH -->
              <v-layout wrap>
                <v-switch v-model="form.useNewRegistry" label="Create new topic"></v-switch>
              </v-layout>

              <!-- NEW REGISTRY -->
              <v-layout wrap v-show="form.useNewRegistry">
                <v-flex xs12>
                  <v-text-field label="Work Title" v-model="form.registry.name" autofocus required></v-text-field>
                </v-flex>
              </v-layout>

              <!-- SWITCH -->
              <v-layout wrap>
                <v-switch v-model="form.advancedOptions" label="Advanced Options"></v-switch>
              </v-layout>

              <!-- ADVANCED OPTIONS -->
              <v-layout wrap v-show="form.advancedOptions">
                <!-- TOKEN -->
                <v-flex xs12>
                  <v-text-field label="Token supply" v-model="form.registry.token.supply" type="number" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Token name" v-model="form.registry.token.name" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Token decimals" v-model="form.registry.token.decimals" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Token symbol" v-model="form.registry.token.symbol" autofocus required></v-text-field>
                </v-flex>

                <!-- PARAMS -->
                <v-flex xs12>
                  <v-text-field label="minDeposit" v-model="form.registry.parameters.minDeposit" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="pMinDeposit" v-model="form.registry.parameters.pMinDeposit" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="applyStageLength" v-model="form.registry.parameters.applyStageLength" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="pApplyStageLength" v-model="form.registry.parameters.pApplyStageLength" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="commitStageLength" v-model="form.registry.parameters.commitStageLength" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="pCommitStageLength" v-model="form.registry.parameters.pCommitStageLength" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="revealStageLength" v-model="form.registry.parameters.revealStageLength" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="pRevealStageLength" v-model="form.registry.parameters.pRevealStageLength" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="dispensationPct" v-model="form.registry.parameters.dispensationPct" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="pDispensationPct" v-model="form.registry.parameters.pDispensationPct" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="voteQuorum" v-model="form.registry.parameters.voteQuorum" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="pVoteQuorum" v-model="form.registry.parameters.pVoteQuorum" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="exitTimeDelay" v-model="form.registry.parameters.exitTimeDelay" autofocus required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="exitPeriodLen" v-model="form.registry.parameters.exitPeriodLen" autofocus required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCloseButtonClick">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSaveButtonClick">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Eth from "@/util/eth";
import config from "@/conf/config.js";
const ethers = require("ethers");

const defaultFormValues = {
  work: {
    name: null,
    link: null
  },
  currentRegistry: {
    name: null,
    address: null
  },
  useNewRegistry: false,
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
      form: JSON.parse(JSON.stringify(defaultFormValues))
    };
  },
  props: ["value"],
  methods: {
    async onSaveButtonClick() {
      if (!this.formData.work.title) return;

      await Eth.newRegistry(
        this.registry.supply,
        this.registry.name,
        this.registry.decimals,
        this.registry.symbol,
        [
          this.registry.parameters.minDeposit,
          this.registry.parameters.pMinDeposit,
          this.registry.parameters.applyStageLength,
          this.registry.parameters.pApplyStageLength,
          this.registry.parameters.commitStageLength,
          this.registry.parameters.pCommitStageLength,
          this.registry.parameters.revealStageLength,
          this.registry.parameters.pRevealStageLength,
          this.registry.parameters.dispensationPct,
          this.registry.parameters.pDispensationPct,
          this.registry.parameters.voteQuorum,
          this.registry.parameters.pVoteQuorum,
          this.registry.parameters.voteQuorum,
          this.registry.parameters.exitTimeDelay,
          this.registry.parameters.exitPeriodLen
        ],
        this.registry.registryName
      );

      this.onCloseButtonClick();
    },
    onCloseButtonClick() {
      this.$emit("close");
    }
  },
  watch: {
    value: function(val) {
      if (val) {
        this.form = JSON.parse(JSON.stringify(defaultFormValues))
        let currentRegistry = this.$store.getters.GET_CURRENT_TOPIC
        this.form.currentRegistry.name = currentRegistry && currentRegistry.name
        this.form.currentRegistry.address = currentRegistry && currentRegistry.address
        this.form.useNewRegistry = !currentRegistry
      } else {
        this.$refs.form.reset();
      }
      console.log("value", val);
    }
  }
};
</script>