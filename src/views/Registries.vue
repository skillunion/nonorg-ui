<template>
  <v-flex>
    <RegistriesTable/>
  </v-flex>
</template>

<script>
import RegistriesTable from "@/components/RegistriesTable";

export default {
  name: "su-registries",
  components: {
    RegistriesTable
  }
};
</script>