<template>
  <div class="workspace">
    <v-container>
      <v-row>
        <v-col cols="12" offset-md="3" md="6">
          <v-card color="transparent" flat tile>
            <div class="pt-10 pb-5">
              <v-img
                src="/images/logo.png"
                max-width="100px"
                class="mx-auto"
              ></v-img>
            </div>
            <v-card-title class="text-h4 justify-center text-center">
              Enter a workspace name (no spaces or special characters)
            </v-card-title>
            <!-- <v-card-title
              class="font-weight-light py-0 justify-center text-center text-subtitle-1"
            >
              We suggest using the
              <span class="font-weight-medium ml-1"
                >email address you use at work.</span
              >
            </v-card-title> -->
            <v-card-text class="pa-10">
              <v-row>
                <v-col cols="12">
                  <validation-observer
                    ref="wsValidationObserver"
                    v-slot="{ passed, handleSubmit }"
                  >
                    <v-form
                      v-model="valid"
                      @submit.prevent="handleSubmit(createWorkspace)"
                    >
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{ errors }"
                          name="workspace"
                          rules="required|noSpecialCharOrSpace|uniqWorkspace"
                          :debounce="500"
                        >
                          <v-text-field
                            v-model="workspace"
                            :error-messages="errors"
                            placeholder="workspace name"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>

                      <v-col cols="12">
                        <v-btn
                          depressed
                          block
                          color="primary"
                          type="submit"
                          :disabled="!passed"
                          >Create Workspace</v-btn
                        >
                      </v-col>
                    </v-form>
                  </validation-observer>
                </v-col>
                <v-col v-if="workspaces.length > 0" cols="12">
                  <div class="middle-divider"><span>Or</span></div>
                  <!-- <v-checkbox
                    color="primary"
                    label="It’s okay to send me emails about IoTSnackBox."
                    hide-details
                  >
                  </v-checkbox> -->
                  <v-card-title class="text-h4 justify-center text-center">
                    Switch to a different workspace
                  </v-card-title>
                  <v-select
                    v-model="selectedWorkspace"
                    :items="workspaces"
                    label="Switch Workspace"
                    outlined
                    @change="switchWorkspace"
                  ></v-select>
                </v-col>
                <!-- <v-col cols="12">
                  <p class="mb-0">
                    By continuing, you’re agreeing to our
                    <a href="#" class="text-decoration-none font-weight-medium"
                      >Customer Terms of Service</a
                    >,
                    <a href="#" class="text-decoration-none font-weight-medium"
                      >Privacy Policy</a
                    >, and
                    <a href="#" class="text-decoration-none font-weight-medium"
                      >Cookie Policy</a
                    >.
                  </p>
                </v-col> -->
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  async fetch() {
    try {
      const response = await this.$axios.get('/workspace/my-workspaces')

      if (response.data.length > 0) {
        response.data.forEach((workspace) => {
          this.workspaces.push(workspace.name)
        })
      }
    } catch (error) {
      this.$notify.error(error.response.data.message)
      this.workspaces = []
    }
  },
  data() {
    return {
      workspace: '',
      workspaces: [],
      valid: true,
      selectedWorkspace: '',
    }
  },
  methods: {
    async createWorkspace() {
      try {
        const response = await this.$axios.post('/workspace', {
          workspace: this.workspace,
        })

        await this.$auth.setUserToken(
          response.data.access_token,
          response.data.refresh_token
        )

        this.$auth.setUser(response.data.user)
        this.$router.push({
          path: '/dashboard',
        })
      } catch (error) {
        this.$notify.error(error.response.data.message)
      }
    },
    switchWorkspace(workspace) {
      if (
        !this.$auth.user.workspace ||
        (this.$auth.user.workspace &&
          this.$auth.user.workspace.name !== workspace)
      ) {
        this.$axios
          .post('/auth/switch-workspace', {
            workspace,
          })
          .then((res) => {
            this.$auth
              .setUserToken(res.data.access_token, res.data.refresh_token)
              .then(() => {
                this.$auth.setUser(res.data.user)
                this.$router.push({
                  path: '/dashboard',
                })
              })
          })
          .catch((err) => {
            this.$notify.error(err.response.data.message)
          })
      }
    },
  },
}
</script>
