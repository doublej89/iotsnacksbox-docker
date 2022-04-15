<template>
  <v-responsive>
    <!-- <v-row v-if="loading" justify="center">
      <v-progress-circular indeterminate color="#122e7e"></v-progress-circular>
    </v-row> -->
  </v-responsive>
</template>
<script>
export default {
  // data() {
  //   return {
  //     loading: true,
  //   }
  // },
  async asyncData({ query, $axios, redirect }) {
    try {
      const response = await $axios.post('/varify-token', {
        token: query.token,
      })
      if (response.data.redirect) {
        redirect(`/${response.data.redirect}?token=${query.token}`)
      }
    } catch (error) {
      redirect('/')
    }
  },
}
</script>
