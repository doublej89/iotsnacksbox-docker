<template>
  <div class="container-fluid">
    <div class="row" style="margin: 0 -15px 0 -15px">
      <!--Left Content Area Start-->

      <div
        class="col-sm-4 col-md-4 d-md-block d-none"
        style="background-color: #2e86c1; height: 100vh"
      >
        <div class="left-part">
          <div class="logo">
            <nuxt-link to="/"
              ><img class="img-fluid" src="/logos/logo.svg"
            /></nuxt-link>
          </div>
          <div class="leftheader-1">
            <h3>A few clicks away from the future</h3>
          </div>
          <div class="leftheader-2">
            <h5>IoT & Data Science is for young minds</h5>
          </div>

          <div class="img-rocket">
            <img class="img-fluid" src="/logos/rockets.svg" />
          </div>
        </div>
      </div>

      <!--Left Content Area End-->

      <!--Right Content Area Start-->

      <div class="col-sm-8 col-md-8">
        <div class="right-part">
          <div class="member">
            <p>
              Not a member yet?<span1
                ><nuxt-link to="/register">Sign Up Now!</nuxt-link></span1
              >
            </p>
          </div>
          <div class="logo1 d-md-none d-block">
            <nuxt-link to="/"
              ><img class="img-fluid" src="/logos/logo.svg"
            /></nuxt-link>
          </div>
          <div class="right-content">
            <div class="right-top-content">
              <div class="right-header1">
                <h2>Sign In to IoT Snacks Box</h2>
              </div>

              <SocialAuthButtons />
              <div id="orsection" class="text-muted">
                <p>---------------- Or ----------------</p>
              </div>
            </div>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <!--Form Area Start-->

            <div class="sign-in-form">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(login)">
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="email"
                      rules="required|email"
                      :debounce="500"
                    >
                      <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        :class="classes"
                        id="email"
                        placeholder="Enter Email"
                        size="20"
                      />
                      <small id="passwordHelp" class="text-danger">
                        {{ errors[0] }}
                      </small>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <label for="pswd">Password</label
                    ><span1 style="font-weight: 320"
                      ><nuxt-link to="/forget" style="text-decoration: none"
                        >Forget Password?</nuxt-link
                      ></span1
                    >
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="password"
                      rules="required|min:6"
                    >
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        :class="classes"
                        id="pswd"
                        placeholder="Enter Password"
                        size="20"
                      />
                      <small class="text-danger">
                        {{ errors[0] }}
                      </small>
                    </validation-provider>
                  </div>

                  <div class="button-sign-in">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="!disableBtn"
                      :loading="loading"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>

            <!--Form Area Start-->
          </div>
        </div>
      </div>

      <!--Right Part Area End-->
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import SocialAuthButtons from './SocialAuthButtons.vue'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    SocialAuthButtons
  },
  props: {
    popup: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#FFF',
    },
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false,
    }
  },
  computed: {
    disableBtn() {
      return Boolean(this.email && this.password)
    },
  },
  created() {},
  methods: {
    async login() {
      if (this.loading) {
        return
      }
      this.loading = true
      try {
        const res = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })

        this.$auth.setUser(res.data.user)
        this.loading = false
        this.$emit('login')
      } catch (error) {
        this.errorMessage = error.response.data.message
        this.loading = false
        this.password = ''
      }
    },
  },
}
</script>
<style scoped lang="sass">
@import assets/css/auth.css
</style>
