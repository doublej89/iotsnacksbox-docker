<template>
  <div class="members">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="10"
            class="elevation-1"
            item-key="key"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>User Registration Requests</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search users"
                  single-line
                  hide-details
                  outlined
                  dense
                ></v-text-field>
                <v-spacer></v-spacer>
                <!-- <v-btn
                  color="primary"
                  small
                  dark
                  class="mb-2"
                  @click="dialog = true"
                  >Invite People</v-btn
                > -->
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]>
              <v-icon color="error" class="ml-3" small> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { v4 as uuid } from 'uuid'
export default {
  async fetch() {
    const members = []
    try {
      const response = await this.$axios.get('/admin/waiting')
      console.log(response.data)
      if (response.data.users.length > 0) {
        response.data.users.forEach((user) => {
          members.push({
            id: user._id,
            name: user.fullName,
            email: user.email,
            institute: user.institute,
            workspace: user.workspace,
            key: uuid(),
          })
        })
      }
      // return { desserts }
      this.desserts = members
    } catch (error) {
      this.$notify.error(error.response.data.message)
    }
  },
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Workspace', value: 'workspace' },
      { text: 'Institute', value: 'institute' },
    ],
    desserts: [],
  }),
  computed: {
    dialog: {
      get() {
        return this.$store.getters.getWorkspaceInvitationDialog
      },
      set(newVal) {
        this.$store.commit('setWorkspaceInvitationDialog', newVal)
      },
    },
  },
  layout: 'admin',
}
</script>
