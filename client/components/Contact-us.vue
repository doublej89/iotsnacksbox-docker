<template>
  <v-card flat>
    <v-form @submit.prevent="sendMessage">
      <v-card-title class="justify-center py-4 edit-profile-title">
        Contact Us
      </v-card-title>
      <v-card-text class="px-10 pt-10">
        <v-row class="align-center">
          <v-col cols="12" md="12">
            <v-alert v-if="success" color="success" dark>
              Message Send
            </v-alert>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="firstName"
                  label="first name"
                  hide-details
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastName"
                  label="last name"
                  hide-details
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="email"
                  label="email"
                  hide-details
                  :rules="emailRule"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="phone"
                  label="phone"
                  hide-details
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              v-model="message"
              label="message"
              hide-details
              outlined
              dense
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-10 pb-10">
        <v-spacer></v-spacer>
        <v-btn color="primary" class="btn-save" dark large type="submit">
          send
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    success: false,
    message: '',
    emailRule: [
      (value) => !!value || 'Email address is required.',
      (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    ],
  }),
  methods: {
    sendMessage() {
      const params = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        message: this.message,
      }
      this.success = false
      this.$axios

        .post('/contact', params)
        .then((responce) => {
          if (responce.status === 200) {
            this.success = true
          }
          this.firstName = ''
          this.lastName = ''
          this.email = ''
          this.phone = ''
          this.message = ''
        })
        .catch((err) => {
          this.$notfy.error('Cannot send message!!' + err)
        })
    },
  },
}
</script>
