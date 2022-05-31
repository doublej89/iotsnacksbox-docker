<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mx-auto">
        <div class="text-center">
          <h2 style="padding-top: 30px">Validating...</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'empty',
  loading: true,
  mounted() {
    const params = {
      token: this.$nuxt.$route.query.token,
    }
    this.$axios.post('/verify-email', params).then((responce) => {
      if (responce.status === 200) {
        console.log(responce.data)
        this.$auth
          .setUserToken(responce.data.access_token, responce.data.refresh_token)
          .then(() => {
            this.$auth.setUser(responce.data.user)
            this.$router.push({
              path: '/dashboard',
            })
          })
      }
    })
  },
}
</script>
