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
                <v-toolbar-title>Approved users</v-toolbar-title>
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
                <v-dialog v-model="dialogRemoveApproval" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to withdraw approval for this user?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeRemoveApproval"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="removeApprovalConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon color="red" @click="removeApproval(item)"> mdi-close </v-icon>
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
  created() {
    this.initialize()
  },
  data: () => ({
    dialogRemoveApproval: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Workspace', value: 'workspace' },
      { text: 'Institute', value: 'institute' },
      { text: 'Storage', value: 'storage' },
      { text: 'Withdraw Approval', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedItem: {
      id: '',
      name: '',
      email: '',
      institute: '',
      workspace: null,
      key: '',
    },
  }),
  methods: {
    async initialize() {
      const members = []
      try {
        const response = await this.$axios.get('/admin/approved')

        if (response.data.users.length > 0) {
          response.data.users.forEach((user) => {
            members.push({
              id: user._id,
              name: user.fullName,
              email: user.email,
              institute: user.institute,
              workspace: user.workspace ? user.workspace.name : null,
              storage : user.workspace ? `${user.workspace.features.storage} MB` : null,
              key: uuid(),
            })
          })
        }
        this.desserts = members
      } catch (error) {
        this.$notify.error(error.response.data.message)
      }
    },
    removeApproval(item) {
      this.editedItem = Object.assign({}, item)
      this.dialogRemoveApproval = true
    },
    removeApprovalConfirm() {
      const params = {
        userId: this.editedItem.id,
        storage: this.storage,
      }
      this.$axios.put('/admin/user/disapprove', params).then((responce) => {
        console.log(responce.data.user)
        if (responce.data.user) {
          this.initialize()
        }
        this.closeRemoveApproval()
      })
      .catch((error) => {
        this.closeRemoveApproval()
        this.$notify.error(error.response.data.message)
      })
    },
    closeRemoveApproval() {
      this.dialogRemoveApproval = false
      this.$nextTick(() => {
        this.editedItem = Object.assign(
          {},
          {
            id: '',
            name: '',
            email: '',
            institute: '',
            workspace: null,
            key: '',
          }
        )
      })
    },
  },
  layout: 'admin',
}
</script>
