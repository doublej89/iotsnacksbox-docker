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
                <v-toolbar-title>All Workspaces</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Change storage</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="storage"
                              label="Allocate"
                              type="number"
                              placeholder="10"
                              suffix="MB"
                              outlined
                              dense
                            ></v-text-field>
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
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon color="green" class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
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
    dialog: false,
    storage: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Total Storage Allocated (MB)', value: 'storage' },
      { text: 'Users', value: 'users' },
      { text: 'Storage Used (MB)', value: 'usedStorage' },
      { text: 'Requests Made', value: 'request' },
      { text: 'Total Requests Allocated', value: 'totalRequests' },
      { text: 'Change Storage', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedItem: {
      id: '',
      name: '',
      storage: '',
      usedStorage: '',
      request: '',
      totalRequests: '',
      users: 0,
      key: '',
    },
    loading: true,
    options: {},
  }),
  methods: {
    async initialize() {
      const workspaces = []
      this.loading = true
      const { page, itemsPerPage } = this.options
      try {
        const response = await this.$axios.get('/admin/workspace')

        if (response.data.workspaces.length > 0) {
          response.data.workspaces.forEach((workspace) => {
            workspaces.push({
              id: workspace._id,
              name: workspace.name,
              storage: workspace.features.storage,
              usedStorage: workspace.storage.toFixed(2),
              request: workspace.request,
              users: workspace.users.length,
              totalRequests: workspace.features.requestPerMonth,
              key: uuid(),
            })
          })
        }
        this.desserts = workspaces
      } catch (error) {
        this.$notify.error(error.response.data.message)
      }
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign(
          {},
          {
           id: '',
           name: '',
           storage: '',
           usedStorage: '',
           request: '',
           totalRequests: '',
           users: 0,
           key: '',
          }
        )
        this.storage = ''
      })
    },
    save() {
      const params = {
        workspace: this.editedItem.name,
        storage: this.storage,
      }
      this.$axios.put('/admin/workspace', params).then((responce) => {
        if (responce.data.workspace) {
          this.initialize()
        }
        this.close()
      })
      .catch((error) => {
        this.close()
        this.$notify.error(error.response.data.message)
      })
    },
    editItem(item) {
      this.editedItem = { ...item }

      this.storage = this.editedItem.storage

      this.dialog = true
    },
  },
  layout: 'admin',
}
</script>
