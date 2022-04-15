<template>
  <v-responsive> </v-responsive>
</template>
<script>
export default {
  loading: true,
  mounted() {
    const params = {
      token: this.$nuxt.$route.query.token,
    }
    this.$axios.post('/verify-email', params).then((responce) => {
      if (responce.status === 200) {
        this.$auth
          .setUserToken(responce.data.access_token, responce.data.refresh_token)
          .then(() => {
            this.$auth.setUser(responce.data.user)
            window.location.replace('/')
          })
      }
    })
  },
}
</script>
