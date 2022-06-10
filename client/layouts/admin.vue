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
          <v-list-item nuxt exact to="/admin/" class="listItem">
            <v-list-item-action class="mr-3">
              <span class="icon-dashboard"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Requests List
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            nuxt
            exact
            color="primary"
            to="/admin/users"
            class="listItem"
          >
            <v-list-item-action class="mr-3">
              <span class="icon-registercomponent"></span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="listItem-title">
                Users List
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
        <nuxt-link to="/">
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
    <Confirm ref="confirm" />
  </v-app>
</template>
<script>
import Snackbar from '~/components/common/Snackbar.vue'
import Confirm from '~/components/common/confirm.vue'

export default {
  components: { Snackbar, Confirm },
  middleware: 'auth',
  async fetch() {
    if (!this.$auth.loggedIn || this.$auth.user.role !== 'admin') {
      this.$router.push({
        path: '/',
      })
      return
    }
  },
  data: () => ({
    drawer: true,
    storage: '',
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
    if (!this.$auth.loggedIn || this.$auth.user.role !== 'admin') {
      this.$router.push({
        path: '/',
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
      // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return Boolean(this.storage)
    },
    dialog: {
      get() {
        return this.$store.getters.getStorageAllocationDialog
      },
      set(newVal) {
        this.$store.commit('setStorageAllocationDialog', newVal)
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
