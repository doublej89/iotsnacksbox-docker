<template>
  <v-responsive>
    <div class="settings-section">
      <v-row>
        <v-col md="8">
          <h1 class="profile-text text-capitalize" style="text-align: center">
            Workspace Profile
          </h1>
          <v-card class="py-5 px-10 mx-8">
            <v-row>
              <v-col md="6">
                <span class="contact-label">Name</span>
                <span class="contact-label-details"
                  ><strong>+{{ name }}</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Balance</span>
                <span class="contact-label-details"
                  ><strong>{{ currentBalance }}</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Storage Used</span>
                <span class="contact-label-details"
                  ><strong>{{ storage.toFixed(2) }} MB</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Storage Left</span>
                <span class="contact-label-details"
                  ><strong>{{ storageLeft.toFixed(2) }} MB</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Requests Made</span>
                <span class="contact-label-details"
                  ><strong>{{ request }}</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Requests Left</span>
                <span class="contact-label-details"
                  ><strong>{{ requestsLeft }}</strong></span
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="members">
      <v-container>
        <v-row>
          <v-col cols="8 mx-5">
            <v-data-table
              :headers="headers"
              :items="transactions"
              :items-per-page="5"
              class="elevation-1"
              item-key="key"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Transactions</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <!-- <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search current members"
                    single-line
                    hide-details
                    outlined
                    dense
                  ></v-text-field> -->
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
              <!-- <template v-slot:item.actions="{ item }">
                <v-icon
                  color="error"
                  class="ml-3"
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template> -->
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-responsive>
</template>
<script>
export default {
  async fetch() {
    try {
      const response = await this.$axios.get('/workspace/transactions')
      if (response.data.transactions.length > 0) {
        this.transactions = [...response.data.transactions]
      }
    } catch (error) {
      if (error.response.data) {
        this.message = error.response.data.message
      }
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Amount',
          align: 'start',
          value: 'amount',
        },
        { text: 'Payment Method', value: 'paymentMethod' },
        { text: 'Currency', value: 'currency' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action' },
      ],
      name: '',
      currentBalance: 0,
      storage: 0,
      request: 0,
      storageLeft: 0,
      requestsLeft: 0,
      transactions: [],
    }
  },
  mounted() {
    this.name = this.$auth.user.workspace.name
    this.currentBalance = this.$auth.user.workspace.currentBalance
    this.storage = this.$auth.user.workspace.storage
    this.request = this.$auth.user.workspace.request
    this.requestsLeft =
      this.$auth.user.workspace.features.requestPerMonth -
      this.$auth.user.workspace.request
    this.storageLeft =
      this.$auth.user.workspace.features.storage -
      this.$auth.user.workspace.storage
  },
  layout: 'dashboard',
}
</script>
