<template>
  <v-card class="mx-auto" tile flat :color="color">
    <v-form @submit.prevent="resetpass">
      <v-card-text class="px-16 py-10">
        <v-row>
          <v-col cols="12">
            <v-card-title
              class="font-weight-bold black--text pl-0 justify-center"
            >
              Sign in to School of IoT
            </v-card-title>

            <v-alert v-if="error" type="error"> Token Not valid </v-alert>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              placeholder="Password"
              :rules="passwordRule"
              outlined
              dense
              height="42px"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="conpassword"
              type="password"
              :rules="ConpasswordRule"
              outlined
              dense
              height="42px"
              hide-details="auto"
              label="Confirm Password"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <div class="text-center">
              <v-btn
                color="blue"
                depressed
                class="pr-10 pl-10"
                dark
                type="submit"
                :loading="loading"
                >reset password</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#FFF',
    },
  },
  data() {
    return {
      loading: false,
      password: '',
      conpassword: '',
      success: false,
      error: false,
      passwordRule: [
        (value) => !!value || 'Password is required.',
        (value) =>
          (value && value.length >= 6) || 'Required at least 6 character',
      ],
      ConpasswordRule: [
        (value) => !!value || 'Password is required.',
        (value) => value === this.password || 'confirm password is not valide',
      ],
    }
  },
  computed: {},
  created() {},
  methods: {
    resetpass() {
      if (this.loading) {
        return
      }
      this.loading = true
      const params = {
        password: this.password,
        token: this.$nuxt.$route.query.token,
      }
      this.success = false
      this.$axios
        .post('/reset', params)
        .then((responce) => {
          if (responce.status === 200) {
            this.success = true
            this.loading = false
            window.location.replace('/login')
          }
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
  },
}
</script>
