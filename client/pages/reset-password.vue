<template>
  <v-responsive>
    <v-container>
      <v-row justify="center" no-gutters class="my-10">
        <v-col sm="6">
          <v-card max-width="600">
            <ResetPassword />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
import ResetPassword from '../components/Auth/reset-password.vue'

export default {
  components: { ResetPassword },
  layout: 'default',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
