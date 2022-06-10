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
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Allocate storage</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-if="editedItem.workspace"
                              v-model="storage"
                              label="Allocate"
                              type="number"
                              placeholder="10000"
                              suffix="MB"
                              outlined
                              dense
                            ></v-text-field>
                            <v-card-text v-else>
                              Cannot allocate storage to a user without a
                              workspace
                            </v-card-text>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        :disabled="!storage"
                        @click="save"
                      >
                        Ok
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
  async created() {
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
            workspace: user.workspace ? user.workspace.name : null,
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
    dialog: false,
    dialogDelete: false,
    search: '',
    storage: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Workspace', value: 'workspace' },
      { text: 'Institute', value: 'institute' },
      { text: 'Approve', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
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
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      if (this.editedItem.id) {
        this.$axios
          .delete(`/admin/user/${this.editedItem.id}`)
          .then((res) => {
            console.log(res.data)
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
          })
          .catch((error) => {
            this.closeDelete()
            this.$notify.error(error.response.data.message)
          })
      } else {
        this.closeDelete()
        this.$notify.error('user id is missing!')
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    close() {
      this.dialog = false
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
        this.editedIndex = -1
        this.storage = ''
      })
    },
    save() {
      console.log(this.storage)
      console.log(this.desserts[this.editedIndex].workspace)
      console.log(this.desserts[this.editedIndex].email)
      console.log(this.desserts[this.editedIndex])

      this.close()
    },

    closeDelete() {
      this.dialogDelete = false
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
        this.editedIndex = -1
      })
    },
  },
  layout: 'admin',
}
</script>
