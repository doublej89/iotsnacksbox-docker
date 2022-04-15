<template>
  <v-responsive>
    <v-container style="margin-top: 100px; margin-bottom: 210px">
      <v-row justify="center" no-gutters class="my-10">
        <v-col sm="6">
          <v-card max-width="600" tile flat :color="color">
            <v-form @submit.prevent="resetpass">
              <v-card-text class="px-16 py-10">
                <v-row>
                  <v-col cols="12">
                    <v-card-title
                      class="font-weight-bold black--text pl-0 justify-center"
                    >
                      Sign in to School of IoT
                    </v-card-title>
                    <v-alert v-if="success" type="success">
                      Please check your email
                    </v-alert>
                    <v-alert v-if="error" type="error">
                      User not found
                    </v-alert>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      :rules="emailRule"
                      type="email"
                      outlined
                      dense
                      height="42px"
                      hide-details="auto"
                      @focus="
                        error = false
                        success = false
                      "
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
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
export default {
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
      loading: false,
      email: '',
      success: false,
      error: false,
      emailRule: [
        (value) => !!value || 'Email address is required.',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
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
        email: this.email,
      }
      this.success = false
      this.error = false
      this.$axios
        .post('/forgot', params)
        .then((responce) => {
          if (responce.status === 200) {
            this.success = true
            this.loading = false
          }
          setTimeout(() => {
            if (this.popup) {
              this.$emit('success', true)
            } else {
              window.location.replace('/')
            }
          }, 5000)
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    },
  },
}
</script>
