<template>
  <v-app class="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.mdAndUp"
      class="custom-navigation-drawer"
    >
      <v-sheet color="transparent">
        <v-list nav dense flat class="mt-2 navigation-list pr-5 pl-3">
          <v-menu
            transition="slide-y-transition"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-list-item nuxt exact class="listItem firstListItem">
                <!-- <v-list-item-action class="mr-3">
                    <span class="icon-dashboard white--text"></span>
                </v-list-item-action> -->
                <v-list-item-content v-bind="attrs" v-on="on">
                  <v-list-item-title class="listItem-title">
                    {{ $auth.user ? $auth.user.workspace.name : null }}
                    <v-icon small right>mdi-chevron-down</v-icon>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-card class="mx-auto" width="300" color="transparent" dark>
              <v-list color="#0b131d" dark>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <v-icon x-large color="#70a9dc"
                        >mdi-alpha-i-circle</v-icon
                      >
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>IoTSnacksBox</v-list-item-title>
                      <v-list-item-subtitle
                        >iotsnacksbox.com</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click.stop="dialog = true">
                    <v-list-item-icon>
                      <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        >Invite people to {{ $auth.user.workspace.name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="$auth.logout()">
                    <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Sign out of
                        {{ $auth.user.workspace.name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item to="/dashboard/workspace" nuxt exact>
                    <v-list-item-icon>
                      <v-icon>mdi-folder-plus-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        >Create new workspace</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-group
                    prepend-icon="mdi-nintendo-switch"
                    value="true"
                    no-action
                  >
                    <template v-slot:activator>
                      <v-list-item-title>Switch workspace</v-list-item-title>
                    </template>

                    <v-list-item
                      v-for="(workspace, i) in workspaces"
                      :key="i"
                      exact-active-class="workspace-active"
                      @click="switchWorkspace(workspace.name)"
                    >
                      <v-list-item-title
                        v-text="workspace.name"
                      ></v-list-item-title>

                      <!-- <v-list-item-icon>
                          <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon> -->
                    </v-list-item>

                    <!-- <v-list-group sub-group no-action>
                      <template v-slot:activator>
                        <v-list-item-content>
                          <v-list-item-title>Actions</v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-group> -->
                  </v-list-group>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-menu>
          <v-list-item nuxt exact to="/dashboard/" class="listItem">
            <v-list-item-action class="mr-3">
              <span class="icon-dashboard"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Dashboard
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            nuxt
            exact
            color="primary"
            to="/dashboard/my-components"
            class="listItem"
          >
            <v-list-item-action class="mr-3">
              <span class="icon-registercomponent"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Register Equipment
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/dashboard/equipments" class="listItem">
            <v-list-item-action class="mr-3">
              <span class="icon-mycomponent"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Equipments
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt exact to="/dashboard/members/" class="listItem">
            <v-list-item-action class="mr-3">
              <v-icon>mdi-wallet-membership</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Members
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt exact to="/dashboard/payments" class="listItem">
            <v-list-item-action class="mr-3">
              <span class="icon-Payment"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Payment
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt exact to="/dashboard/profile" class="listItem">
            <v-list-item-action class="mr-3">
              <span class="icon-Settings"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Profile
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            nuxt
            exact
            to="/dashboard/workspace-profile"
            class="listItem"
          >
            <v-list-item-action class="mr-3">
              <span class="icon-Settings"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Workspace Profile
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-navigation-drawer>
    <v-app-bar
      app
      flat
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      color="#0B131D"
      dark
      class="align-center"
    >
      <v-toolbar-title>
        <nuxt-link to="/dashboard">
          <v-img src="/images/logo.png" contain max-width="100" />
        </nuxt-link>
      </v-toolbar-title>
      <v-row no-gutters>
        <v-col cols="6">
          <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
            solo
            hide-details
            dense
            class="ml-16"
            background-color="#171E2A"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>

      <!-- <v-img src="/images/flag.svg" max-width="24px" class="mr-5"></v-img> -->
      <v-img src="/images/batch.svg" max-width="24px" class="mr-5"></v-img>
      <v-img
        src="/images/notification.svg"
        max-width="18px"
        class="mr-5"
      ></v-img>
      <v-menu
        v-if="$auth.loggedIn"
        bottom
        origin="center center"
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="ma-2" v-bind="attrs" v-on="on">
            {{ $auth.user.fullName }}
            <v-avatar right size="16">
              <img :src="$auth.user.avatar" />
            </v-avatar>
          </v-chip>
        </template>

        <v-list>
          <v-list-item nuxt to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$auth.logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-if="!$vuetify.theme.dark"
        icon
        color="white"
        @click="changeThemeMode"
      >
        <v-icon>mdi-brightness-2</v-icon>
      </v-btn>
      <v-btn v-else icon color="white" @click="changeThemeMode">
        <v-icon>mdi-brightness-5</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-app-bar-nav-icon
          color="#858EA7"
          light
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </template>
    </v-app-bar>

    <v-main>
      <Snackbar></Snackbar>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer color="transparent">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card color="transparent" flat>
            <v-card-subtitle class="pb-1">
              Made with <v-icon dark color="#F16347">mdi-heart</v-icon> in
              Dhaka, Bangladesh.
            </v-card-subtitle>
            <v-card-subtitle class="pt-1">
              © Copyright ANTT Robotics Ltd. ANTT Robotics and the ANTT Robotics
              logo are trademarks of ANTT Robotics Ltd.
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-footer>
    <v-dialog v-model="dialog" max-width="420">
      <v-card>
        <v-card-title class="headline text-h6 py-5"
          >Request invitations to
          {{ $auth.user ? $auth.user.workspace.name : null }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="To:"
                placeholder="name@gmail.com"
                outlined
                :rules="emailRule"
                dense
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12">
              <v-text-field
                label="Reason for request (optional)"
                placeholder="Add a note for your admin"
                outlined
                dense
                hint="Your request will be sent to your admins, and you’ll be notified when it’s approved or denied."
              ></v-text-field>
            </v-col> -->
            <v-col cols="12">
              <v-select
                v-model="role"
                :items="roles"
                label="Select a role"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12">
              <div class="text-right">
                <v-btn
                  depressed
                  color="#eee"
                  class="rounded-md"
                  :disabled="!disableBtn"
                  @click="sendRequest"
                >
                  Send Request
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <Confirm ref="confirm"/>
  </v-app>
</template>
<script>
import Snackbar from '~/components/common/Snackbar.vue'
import Confirm from '~/components/common/confirm.vue'

export default {
  components: { Snackbar, Confirm },
  middleware: 'auth',
  async fetch() {
    if (!this.$auth.user.workspace) {
      this.$router.push({
        path: '/dashboard/workspace',
      })
      return
    }
    try {
      const response = await this.$axios.get('/workspace/my-workspaces')
      if (response.data.length > 0) {
        this.workspaces = [...response.data]
      }
    } catch (error) {
      this.$notify.error(error.response.data.message)
      this.workspaces = []
    }
  },
  data: () => ({
    drawer: true,
    email: '',
    roles: ['member', 'admin'],
    role: '',
    emailRule: [
      (value) => !!value || 'Email address is required.',
      (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    ],
    requestSentMessage: '',
    errorMessage: '',
    loading: false,
    workspaces: [],
  }),
  mounted() {
    if (!this.$auth.user.workspace) {
      this.$router.push({
        path: '/dashboard/workspace',
      })
    }
  },
  computed: {
    breadcrumbs() {
      const pathArray = this.$route.path.split('/')
      pathArray.shift()
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path,
          href: breadcrumbArray[idx - 1]
            ? '/' + breadcrumbArray[idx - 1].path + '/' + path
            : '/' + path,
          text: path,
          disabled: idx + 1 >= pathArray.length,
        })
        return breadcrumbArray
      }, [])
      return breadcrumbs
    },
    disableBtn() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return Boolean(this.email && pattern.test(this.email) && this.role)
    },
    dialog: {
      get() {
        return this.$store.getters.getWorkspaceInvitationDialog
      },
      set(newVal) {
        this.$store.commit('setWorkspaceInvitationDialog', newVal)
      },
    },
  },
  methods: {
    changeThemeMode() {
      this.$vuetify.theme.default =
        this.$vuetify.theme.default === 'light' ? 'dark' : 'light'
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    async sendRequest() {
      this.requestSentMessage = ''
      this.errorMessage = ''

      // if (this.loading) {
      //   return
      // }
      // this.loading = true

      try {
        const res = await this.$axios.post('workspace-invitation', {
          email: this.email,
          workspace: this.$auth.user.workspace.name,
          role: this.role,
        })

        if (res && res.data) {
          this.$notify.success(res.data.message)
          this.dialog = false
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.$notify.error(error.response.data.message)
        }
        this.dialog = false
      }
    },
    switchWorkspace(workspace) {
      this.$axios
        .post('/auth/switch-workspace', {
          workspace,
        })
        .then((res) => {
          this.$auth
            .setUserToken(res.data.access_token, res.data.refresh_token)
            .then(() => {
              this.$auth.setUser(res.data.user)
              window.location.reload()
            })
        })
        .catch((err) => {
          this.$notify.error(err.response.data.message)
        })
    },
  },
}
</script>

<style scoped>
.workspace-active {
  color: rgb(167, 167, 136);
}

.container--fluid {
  max-width: 100%;
}

@media (min-width: 960px) {
  .container {
    max-width: 900px;
  }
}

@media (min-width: 1264px) {
  .container {
    max-width: 1185px;
  }
}

@media (min-width: 1904px) {
  .container {
    max-width: 1785px;
  }
}

.container {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
</style>
