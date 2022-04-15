<template>
  <div id="front-end" dark :class="applicationClass">
    <div class="header-top fixed-top container-fluid">
      <nav
        class="navbar navbar-expand-lg navbar-light container-fluid px-0 mx-0 affix"
      >
        <nuxt-link class="navbar-brand d-lg-none" to="/"
          ><img src="/images/iotlogo.png" class="nav-img-sm"
        /></nuxt-link>

        <button
          class="navbar-toggler mr-3 nav-tog-btn"
          type="button"
          data-toggle="collapse"
          data-target="#myNavbarToggler7"
          aria-controls="myNavbarToggler7"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse nav-middle-sm"
          id="myNavbarToggler7"
        >
          <div class="top-menu container-fluid d-lg-block px-0 mx-0">
            <div class="navbar-nav nav-start">
              <nuxt-link class="d-none d-lg-block" to="/"
                ><img src="/images/iotlogo.png" alt="logo" class="nav-img"
              /></nuxt-link>

              <ul class="nav navbar-nav ml-auto nav-menu">
                <li class="nav-item">
                  <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Services</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Resources</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
                <li v-if="$auth.loggedIn" class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span style="font-weight: normal; color: black">{{
                      $auth.user.fullName
                    }}</span>
                    <img
                      :src="$auth.user.avatar"
                      width="40"
                      height="40"
                      class="rounded-circle"
                      style="margin-right: -4px"
                    />
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <nuxt-link
                      class="dropdown-item"
                      style="font-weight: normal"
                      to="/dashboard"
                      >Dashboard</nuxt-link
                    >
                    <a
                      class="dropdown-item"
                      style="font-weight: normal"
                      @click="$auth.logout()"
                      >Log Out</a
                    >
                  </div>
                </li>
                <template v-else>
                  <li class="d-none d-lg-block">
                    <nuxt-link
                      to="/register"
                      class="btn btn-light btn-sm2"
                      style="color: #1676aa; margin: 12px 0 0 60px"
                      >Join Us</nuxt-link
                    >
                  </li>
                  <li class="d-none d-lg-block">
                    <nuxt-link
                      to="/login"
                      class="btn btn-light btn-sm2"
                      style="color: #1676aa; margin: 12px 0 0 10px"
                      >Login</nuxt-link
                    >
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="nav-bottom-bar-sm d-lg-none">
        <div v-if="$auth.loggedIn" class="d-flex justify-content-center p-2">
          <div class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span style="font-weight: normal; color: black">{{
                $auth.user.fullName
              }}</span>
              <img
                :src="$auth.user.avatar"
                width="40"
                height="40"
                class="rounded-circle"
                style="margin-right: -10px"
              />
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <nuxt-link
                class="dropdown-item"
                style="font-weight: normal"
                to="/dashboard"
                >Dashboard</nuxt-link
              >
              <a
                class="dropdown-item"
                style="font-weight: normal"
                @click="$auth.logout()"
                >Log Out</a
              >
            </div>
          </div>
        </div>
        <template v-else>
          <div class="d-flex justify-content-around p-2">
            <nuxt-link
              to="/register"
              class="btn btn-light btn-sm"
              style="color: #1676aa"
              >Join Us</nuxt-link
            >
            <nuxt-link
              to="/login"
              class="btn btn-light btn-sm"
              style="color: #1676aa"
              >Login</nuxt-link
            >
          </div>
        </template>
      </div>
    </div>

    <v-main>
      <Snackbar></Snackbar>
      <nuxt />
    </v-main>

    <div class="container-fluid mt-md-0 mt-5" style="background-color: #439ad5">
      <div class="container pt-md-5 pt-0">
        <!-- text-md-left text-center -->
        <div class="iotlogo pt-5"><img src="/images/logofooter.png" /></div>
        <div class="row mt-4 text-white">
          <div class="col-md-6 col-12">
            <h5>Office</h5>
            <div class="row">
              <div class="col-md-6 col-12">
                <p style="margin-bottom: 0px">Bangladesh</p>
                <p style="font-size: 12px; color: #d6d6d6">
                  iDEA, E-14/X, ICT Tower (14th Floor), Agargaon, Dhaka- 1207,
                  Bangladesh.
                </p>
              </div>
              <div class="col-md-6 col-12">
                <p style="margin-bottom: 0px">South korea</p>
                <p style="font-size: 12px; color: #d6d6d6">
                  311, Gangnam-daero, Seocho-gu Seoul, South Korea 06628
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="row">
              <div class="col-md-8 col-12">
                <div class="ml-md-5 ml-0">
                  <h5>Start a conversation</h5>
                  <p
                    style="font-size: 12px; color: #d6d6d6; margin-bottom: 0px"
                  >
                    E-mail: anttrobotics@gmail.com
                  </p>
                  <div class="d-flex">
                    <i class="fab fa-whatsapp" style="margin-top: 2px"></i>
                    <p
                      style="font-size: 12px; color: #d6d6d6; margin-left: 5px"
                    >
                      +880 1925770036
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-12">
                <h5>Useful Links</h5>
                <p style="font-size: 12px; color: #d6d6d6; margin-bottom: 0px">
                  School of IoT
                </p>
                <p style="font-size: 12px; color: #d6d6d6; margin-bottom: 0px">
                  Login
                </p>
                <nuxt-link
                  style="font-size: 12px; color: #d6d6d6; margin-bottom: 0px"
                  to="/terms/terms"
                  >Terms of Use</nuxt-link
                >
                <nuxt-link
                  style="font-size: 12px; color: #d6d6d6; margin-bottom: 0px"
                  to="/terms/privacy-policy"
                  >Privacy Policy</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="hline-bottom"></div>
        <div class="row">
          <div class="col-md-6 col-12 text-left">
            <p style="font-size: 12px; color: #d6d6d6">
              &copy; Copyright 2021 by
              <strong class="text-white">IoT SnacksBox</strong> All rights
              Reserved.
            </p>
          </div>
          <div class="col-md-6 col-12 text-md-right text-left">
            <div class="rounded-social-buttons text-md-right text-left">
              <a
                class="social-button facebook"
                href="https://www.facebook.com/"
                target="_blank"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a
                class="social-button linkedin"
                href="https://www.linkedin.com/"
                target="_blank"
                ><i class="fab fa-linkedin"></i
              ></a>
              <a
                class="social-button twitter"
                href="https://www.twitter.com/"
                target="_blank"
                ><i class="fab fa-twitter"></i
              ></a>
              <a
                class="social-button instagram"
                href="https://www.instagram.com/"
                target="_blank"
                ><i class="fab fa-instagram"></i
              ></a>
              <a
                class="social-button youtube"
                href="https://www.youtube.com/"
                target="_blank"
                ><i class="fab fa-youtube"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="signIn" max-width="590">
      <login @login="afterLogin" />
    </v-dialog>
  </div>
</template>

<script>
import Snackbar from '~/components/common/Snackbar.vue'
export default {
  // head() {
  //   return {
  //     link: [
  //       { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
  //       { rel: 'stylesheet', href: '/css/frontend.css' },
  //     ],
  //   }
  // },
  components: { Snackbar },
  data() {
    return {
      signIn: false,
      forgotPassword: false,
      drawer: false,
    }
  },
  computed: {
    applicationClass() {
      const classes = []

      if (this.$nuxt.$route.name) {
        classes.push(this.$nuxt.$route.name.toLowerCase())
      }

      return classes
    },
    showDeower() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  created() {},
  mounted() {
    this.$vuetify.theme.default = 'light'
    this.$vuetify.theme.dark = false
  },
  methods: {
    afterLogin() {
      this.signIn = false
      this.$router.push({
        path: '/dashboard',
      })
    },
  },
}
</script>
<style lang="sass">
@import assets/css/bootstrap.min.css
@import assets/css/frontend.css
</style>
