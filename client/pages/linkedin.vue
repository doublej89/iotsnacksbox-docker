<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mx-auto">
        <div class="text-center">
          <!-- <div
            class="spinner-border"
            style="width: 8rem; height: 8rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div> -->
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
  async created() {
    const { code, state } = this.$route.query

    const res = await this.$axios.post(
      `/auth/signup/linkedin?code=${code}`,
      null
    )
    console.log(res.data)
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
