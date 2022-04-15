<template>
  <v-responsive>
    <v-col cols="12" md="12">
      <v-alert v-if="successMessage" type="success" dense>
        {{ successMessage }}
      </v-alert>
      <v-alert v-if="message" type="error" dense>
        {{ message }}
      </v-alert>
    </v-col>
  </v-responsive>
</template>
<script>
export default {
  async fetch() {
    try {
      const response = await this.$axios.post('/webhook/payment', {
        invoice: this.$nuxt.$route.query.invoice,
        status: this.$nuxt.$route.query.status,
      })
      if (response.status === 200) {
        if (response.data.message) {
          this.successMessage = response.data.message
        }
      }
    } catch (error) {
      if (error.response.data) {
        this.message = error.response.data.message
      }
    }
  },
  data() {
    return {
      successMessage: '',
      message: '',
    }
  },
  layout: 'dashboard',
}
</script>
