<template>
  <div class="container-fluid">
    <div class="row" style="margin-top: 80px">
      <div class="col-sm-12 col-md-6 mx-auto p-4">
        <!-- <div class="logo">
          <img class="img-fluid" src="/logos/logo.svg" />
        </div> -->

        <div class="right-header1">
          <h2>Enter a workspace name (no spaces or special characters)</h2>
        </div>
        <ValidationObserver ref="observer" v-slot="{ passed, handleSubmit }">
          <form ref="form" @submit.prevent="handleSubmit(createWorkspace)">
            <div class="form-row">
              <div class="form-group col-12">
                <label for="workspace">Workspace</label>
                <ValidationProvider
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
                </ValidationProvider>
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
                Create Workspace
              </button>
            </div>
          </form>
        </ValidationObserver>
        <div
          style="margin-top: 20px; margin-bottom: 20px"
          v-if="workspaces.length > 0"
        >
          <div id="orsection" class="text-muted">
            <p>---------------- Or ----------------</p>
          </div>
          <div class="right-header1">
            <h2>Switch to a different workspace</h2>
          </div>
          <form>
            <div class="form-row">
              <div class="form-group col-12">
                <label for="exampleFormControlSelect2">Switch Workspace</label>
                <select
                  v-model="selectedWorkspace"
                  class="form-control"
                  id="exampleFormControlSelect2"
                  @change="switchWorkspace($event)"
                >
                  <option v-for="workspace in workspaces" :key="workspace._id">
                    {{ workspace }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      workspace: '',
      workspaces: [],
      valid: true,
      selectedWorkspace: '',
    }
  },
  created() {
    this.$axios
      .get('/workspace/my-workspaces')
      .then((response) => {
        if (response.data.length > 0) {
          response.data.forEach((workspace) => {
            this.workspaces.push(workspace.name)
          })
        }
      })
      .catch((error) => {
        this.$notify.error(error.response.data.message)
        this.workspaces = []
      })
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
    switchWorkspace(e) {
      const workspace = e.target.options[e.target.options.selectedIndex].text
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
<style scoped lang="sass">
@import assets/css/auth.css
</style>
