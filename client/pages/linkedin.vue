<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mx-auto">
        <div class="text-center">
          <h2 style="padding-top: 30px">Sigining in...</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {}
  },
  computed: {},
  async mounted() {
    const { code, state } = this.$route.query

    const res = await this.$axios.post(
      `/auth/signup/linkedin?code=${code}`,
      null
    )
    this.$auth.reset()
    this.$auth.setStrategy('local')
    this.$auth.setUserToken(res.data.access_token, res.data.refresh_token)
    this.$auth.setUser(res.data.user)
    if (!res.data.user.workspace) {
      this.$router.push({
        path: '/dashboard/workspace',
      })
    } else {
      this.$router.push({
        path: '/dashboard',
      })
    }
  },
  methods: {},
}
</script>
