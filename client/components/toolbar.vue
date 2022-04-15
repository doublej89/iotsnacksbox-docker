<template>
  <v-card flat tile color="transparent" class="navigation-drawer-card">
    <v-btn
      color="#122f7f"
      link
      nuxt
      to="/"
      :block="block"
      dark
      class="nav-link text-capitalize"
      elevation="0"
    >
      About
    </v-btn>
    <v-btn
      color="#122f7f"
      link
      nuxt
      to="/"
      :block="block"
      dark
      class="nav-link text-capitalize"
      elevation="0"
    >
      Services
    </v-btn>
    <v-btn
      color="#122f7f"
      link
      nuxt
      to="/"
      :block="block"
      dark
      class="nav-link text-capitalize"
      elevation="0"
    >
      Devices
    </v-btn>
    <v-btn
      color="#122f7f"
      link
      nuxt
      to="/"
      :block="block"
      dark
      class="nav-link text-capitalize"
      elevation="0"
    >
      Resources
    </v-btn>
    <v-btn
      color="#122f7f"
      link
      nuxt
      to="/"
      :block="block"
      dark
      class="nav-link text-capitalize"
      elevation="0"
    >
      Pricing
    </v-btn>
    <!-- <v-btn text link nuxt to="/contact-us" :block="block"> contact </v-btn> -->
  </v-card>
</template>
<script>
export default {
  props: {
    block: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
}
</script>
