<template>
  <div class="soical-media-logo">
    <div class="wrapper">
      <div class="button" id="customGoogleBtn" ref="customGoogleBtn">
        <div class="icon">
          <div class="google-logo">
            <img class="img-fluid" src="/logos/google-logo.svg" alt="Google" />
          </div>
        </div>
        <span><a href="#">Sign Up with Google</a></span>
      </div>

      <div class="button" @click="linkedin">
        <div class="icon">
          <div class="linkedin-logo">
            <img
              class="img-fluid"
              src="/logos/linkedin.svg"
              alt="linkedIn"
              style="width: 22px"
            />
          </div>
        </div>
        <span><a href="#">Sign Up with LinkedIn</a></span>
      </div>

      <div class="button" @click="githug">
        <div class="icon">
          <div class="twitter-logo">
            <img class="img-fluid" src="/logos/github.svg" alt="Twitter" />
          </div>
        </div>
        <span><a href="#">Sign Up with Github</a></span>
      </div>

      <div class="button" @click="facebook">
        <div class="icon">
          <div class="facebook-logo">
            <img
              class="img-fluid"
              src="/logos/facebook.svg"
              alt="Twitter"
              style="width: 11px"
            />
          </div>
        </div>
        <span><a href="#">Sign Up with Facebook</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#FFF',
    },
  },
  computed: {},
  created() {},
  mounted() {
    const element = this.$refs.customGoogleBtn
    const axios = this.$axios
    const auth = this.$auth
    const router = this.$router

    setTimeout(() => {
      gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        const auth2 = gapi.auth2.init({
          client_id:
            '502596011364-sjknof9ljs54hhl4rer5tc70m8800n69.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        })
        auth2.attachClickHandler(
          element,
          {},
          function (googleUser) {
            var id_token = googleUser.getAuthResponse().id_token

            const url = `/auth/signup/google?token=${id_token}`

            axios.post(url, null).then(function (res) {
              auth.reset()
              auth.setStrategy('local')
              auth.setUserToken(res.data.access_token, res.data.refresh_token)
              auth.setUser(res.data.user)
              if (!res.data.user.workspace) {
                router.push({
                  path: '/dashboard/workspace',
                })
              }
            })
          },
          function (error) {
            alert(JSON.stringify(error, undefined, 2))
          }
        )
      })
    })
  },
  methods: {
    async facebook() {
      await this.$auth.loginWith('facebook')
    },
    async linkedin() {
      const encodedRedirectUrl = 'http%3A%2F%2Flocalhost%3A4200%2Flinkedin'
      const clientId = '776elowreek2t4'
      const scope = 'r_liteprofile%20r_emailaddress'
      const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=8571925473&scope=${scope}&client_id=${clientId}&redirect_uri=${encodedRedirectUrl}`

      window.location.href = url
    },
    async google() {
      await this.$auth.loginWith('google')
    },
    async githug() {
      await this.$auth.loginWith('github')
    },
  },
}
</script>
<style scoped lang="sass">
@import assets/css/social-media.css
</style>
