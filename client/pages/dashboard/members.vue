<template>
  <div class="members">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
            item-key="key"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Manage Members</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search current members"
                  single-line
                  hide-details
                  outlined
                  dense
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  small
                  dark
                  class="mb-2"
                  @click="dialog = true"
                  >Invite People</v-btn
                >
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
      const response = await this.$axios.get('/workspace/members')
      if (response.data.users.users.length > 0) {
        response.data.users.users.forEach((user) => {
          members.push({
            id: user.user._id,
            name: user.user.fullName,
            role: user.role,
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
      { text: 'Role', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false },
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
  layout: 'dashboard',
}
</script>
