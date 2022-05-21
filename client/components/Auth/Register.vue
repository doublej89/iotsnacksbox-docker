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
              Already a member?
              <span1><nuxt-link to="/login">Sign In Now!</nuxt-link></span1>
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
                <h2>Sign Up to IoT Snacks Box</h2>
              </div>

              <SocialAuthButtons />
              <div id="orsection" class="text-muted">
                <p>---------------- Or ----------------</p>
              </div>
            </div>

            <!--Form Area Start-->
            <validation-observer
              ref="observer"
              v-slot="{ passed, handleSubmit }"
            >
              <form ref="form" @submit.prevent="handleSubmit(creataccount)">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="name">First Name</label>
                    <input
                      v-model="firstName"
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="Enter First Name"
                      size="20"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="name">Last Name</label>
                    <input
                      v-model="lastName"
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder="Enter Last Name"
                      size="20"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="email"
                      rules="required|email|uniqueEmail"
                      :debounce="500"
                    >
                      <input
                        v-model.trim="email"
                        type="email"
                        class="form-control"
                        :class="classes"
                        id="inputEmail4"
                        placeholder="Enter Email"
                      />
                      <small class="text-danger">
                        {{ errors[0] }}
                      </small>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="workspace">Workspace</label>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="workspace"
                      rules="required|noSpecialCharOrSpace|uniqWorkspace"
                      :debounce="500"
                    >
                      <input
                        v-model="workspace"
                        type="text"
                        class="form-control"
                        :class="classes"
                        id="workspace"
                        placeholder="Enter Workspace"
                      />
                      <small class="text-danger">
                        {{ errors[0] }}
                      </small>
                    </validation-provider>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="password">Password</label>
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
                      />
                      <small class="text-danger">
                        {{ errors[0] }}
                      </small>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="phone">Confirm Password</label>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="passwordConfirm"
                      rules="required|passwordConfirmation:@password"
                    >
                      <input
                        v-model.lazy="confirmPassword"
                        type="password"
                        class="form-control"
                        :class="classes"
                        id="cpswd"
                        placeholder="Confirm Password"
                      />
                      <small class="text-danger">
                        {{ errors[0] }}
                      </small>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="institute">Institute</label>

                      <input
                        v-model="institute"
                        type="institute"
                        class="form-control"
                        :class="classes"
                        id="pswd"
                        placeholder="Enter Institute"
                      />


                  </div>

                </div>

                <div class="form-group">
                  <div class="form-check">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="checkbox"
                    >
                      <input
                        v-model.lazy="terms"
                        class="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                      />
                      <small class="text-danger">
                        {{ errors[0] }}
                      </small>
                    </validation-provider>
                    <div class="terms-condition-accept">
                      <span3>
                        Creating an account means you’re okay with our<span2
                          ><a href="#"> Terms of Service</a>,<a href="#">
                            Privacy Policy,
                          </a></span2
                        >
                        and our default
                        <span2
                          ><a href="#">Notification Settings.</a></span2
                        ></span3
                      >
                    </div>
                  </div>
                </div>
                <div class="form-row" v-if="loading">
                  <v-progress-circular
                    indeterminate
                    color="#122e7e"
                  ></v-progress-circular>
                </div>
                <div class="button-create-account">
                  <button
                    :disabled="!passed || loading"
                    type="submit"
                    class="btn btn-primary"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </validation-observer>

            <!--Form Area End-->
          </div>
        </div>
      </div>

      <!--Right Content Area End-->
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import SocialAuthButtons from './SocialAuthButtons.vue'

// const touchMap = new WeakMap()

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
      terms: false,
      firstName: '',
      lastName: '',
      workspace: '',
      email: '',
      loading: false,
      password: '',
      confirmPassword: '',
      errorMessage: '',
      institute: '',
      valid: true,
    }
  },
  methods: {
    async creataccount() {
      try {
        const {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          workspace,
          institute,
        } = this

        this.errorMessage = ''
        this.loading = true

        const res = await this.$axios.post('/signup', {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          workspace,
          institute,
        })
        await this.$auth.setUserToken(
          res.data.access_token,
          res.data.refresh_token
        )
        this.$auth.setUser(res.data.user)
        this.loading = false
        this.$router.push({
          path: '/dashboard',
        })
        // this.$emit('signup')
        this.$refs.observer.reset()
        this.$notify.success(
          'A registration confirmation email has been sent to your given email address'
        )
      } catch (error) {
        //  this.errorMessage = err.response.data.message
        this.password = ''
        this.confirmPassword = ''
        this.loading = false
        this.$refs.observer.reset()
        this.$notify.error(error.response.data.message)
      }
    },
  },
}
</script>
<style scoped lang="sass">
@import assets/css/auth.css
</style>
