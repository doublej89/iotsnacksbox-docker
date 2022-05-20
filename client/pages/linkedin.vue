<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mx-auto p-4">
        <div class="text-center">
          <div
            class="spinner-border"
            style="width: 8rem; height: 8rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
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
    // const formData = new FormData()

    // formData.append('grant_type', 'authorization_code')
    // formData.append('code', code)
    // formData.append('redirect_uri', 'http%3A%2F%2Flocalhost%3A4200%2Flinkedin')
    // formData.append('client_id', '776elowreek2t4')
    // formData.append('client_secret', 'yzXvb6vZ0nyxgUd6')

    const response = await this.$axios.post(
      `/auth/signup/linkedin?code=${code}`,
      null
    )
    console.log(response.data)
  },
  methods: {},
}
</script>
