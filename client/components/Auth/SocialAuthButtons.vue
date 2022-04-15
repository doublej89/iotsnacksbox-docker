<template>
  <div class="soical-media-logo">
    <div class="wrapper">
      <div class="button" @click="google">
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
  methods: {
    async facebook() {
      await this.$auth.loginWith('facebook')
    },
    async linkedin() {
      await this.$auth.loginWith('linkedin')
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
