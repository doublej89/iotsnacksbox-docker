<template>
  <v-responsive>
    <div class="settings-section">
      <v-row>
        <v-col md="7">
          <h1 class="profile-text">Profile</h1>
          <v-card class="py-5 px-0">
            <div class="float-right mr-5">
              <span class="icon-edit" @click.stop="profilefrom = true"></span>
            </div>
            <v-row class="align-center">
              <v-col md="3">
                <v-avatar width="70" height="70" class="mb-16">
                  <v-img :src="avatar"> </v-img>
                </v-avatar>
              </v-col>
              <v-col md="3">
                <span class="profile-name-title">
                  {{ firstName }} {{ lastName }}
                </span>

                <div class="mb-1 profile-name-subtitle">
                  <v-img
                    width="10px"
                    src="/images/location.svg"
                    class="d-inline-block mr-1"
                    style="vertical-align: text-top"
                  ></v-img>
                  {{ city }}, {{ country }}
                </div>
                <div class="profile-name-subtitle">
                  <v-img
                    width="13px"
                    src="/images/enterprenure.svg"
                    class="d-inline-block"
                  ></v-img>
                  {{ occupation }}
                </div>
              </v-col>
              <v-col md="6">
                <span class="bio-title">Bio</span>
                <p class="mb-0 bio-title-paragraph">
                  {{ bio }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col md="5">
          <h1 class="profile-text text-capitalize">Contact</h1>
          <v-card class="py-5 px-0">
            <div class="float-right mr-5">
              <span class="icon-edit" @click.stop="contactfrom = true"></span>
            </div>

            <v-row>
              <v-col md="6">
                <span class="contact-label">Mobile</span>
                <span class="contact-label-details"
                  ><strong>+{{ mobile }}</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Email</span>
                <span class="contact-label-details"
                  ><strong>{{ email }}</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Institute / organization</span>
                <span class="contact-label-details"
                  ><strong>{{ institute }}</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Address</span>
                <span class="contact-label-details"
                  ><strong>{{ address }}</strong></span
                >
              </v-col>
              <v-col md="6">
                <span class="contact-label">Country</span>
                <span class="contact-label-details"
                  ><strong>{{ country }}</strong></span
                >
              </v-col>
              <v-col md="12">
                <span class="social-media-title mb-3"
                  >Social Media Connection</span
                >
                <div class="social-media-timeline">
                  <div>
                    <v-avatar tile size="30">
                      <img src="/images/facebook.svg" alt="facebook" />
                    </v-avatar>
                    <span class="offline">Not Connected</span>
                    <v-avatar tile size="30">
                      <img src="/images/instagram.svg" alt="facebook" />
                    </v-avatar>
                    <span class="online">Connected</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="profilefrom" class="settingsModal" max-width="425">
      <v-card>
        <v-form @submit.prevent="updatprofile">
          <v-card-title class="justify-center py-4 edit-profile-title"
            >Edit Profile</v-card-title
          >
          <v-card-text class="px-10 pt-10">
            <v-row class="align-center">
              <v-col md="6">
                <v-avatar v-model="avatar" size="120" class="custom-avatar">
                  <img :src="avatar" />

                  <v-btn dark icon outlined class="upload-btn"
                    ><v-icon>mdi-camera</v-icon>
                    <span class="update">update</span></v-btn
                  >
                </v-avatar>
              </v-col>
              <v-col md="6">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="firstName"
                      label="First Name"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="lastName"
                      label="Last Name"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="country"
                      label="Country"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="city"
                      label="City"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="occupation"
                  label="Occupation"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <v-textarea
                  v-model="bio"
                  label="Bio"
                  hide-details=""
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="px-10 pb-10">
            <v-spacer></v-spacer>
            <v-btn
              color="#707070"
              class="btn-cancel"
              outlined
              large
              dark
              @click="profilefrom = false"
            >
              cancel
            </v-btn>

            <v-btn color="#4FA03A" class="btn-save" dark large type="submit">
              save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="contactfrom" class="settingsModal" max-width="425">
      <v-card>
        <v-form @submit.prevent="updatcontact">
          <v-card-title class="justify-center py-4 edit-profile-title"
            >Edit Contact</v-card-title
          >
          <v-card-text class="px-10 pt-10">
            <v-row class="align-center">
              <v-col cols="12" md="12">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="mobile"
                      type="phone"
                      label="Mobile"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="institute"
                      label="Institute/Organization"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="country"
                      label="Country"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="address"
                  label="Address"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="px-10 pb-10">
            <v-spacer></v-spacer>
            <v-btn
              color="#707070"
              class="btn-cancel"
              outlined
              large
              dark
              @click="contactfrom = false"
            >
              cancel
            </v-btn>

            <v-btn color="#4FA03A" class="btn-save" dark large type="submit">
              save
            </v-btn>
          </v-card-actions>
        </v-form></v-card
      >
    </v-dialog>
  </v-responsive>
</template>

<script>
export default {
  layout: 'dashboard',

  data() {
    return {
      formupdatevalid: true,
      profilefrom: false,
      loading: false,
      contactfrom: false,
      mobile: '',
      institute: '',
      email: '',
      address: '',
      avatar: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      occupation: '',
      bio: '',
    }
  },
  computed: {},
  mounted() {
    this.mobile = this.$auth.user.mobile
    this.email = this.$auth.user.email
    this.institute = this.$auth.user.institute
    this.address = this.$auth.user.address
    this.avatar = this.$auth.user.avatar
    this.firstName = this.$auth.user.firstName
    this.lastName = this.$auth.user.lastName
    this.country = this.$auth.user.country
    this.city = this.$auth.user.city
    this.occupation = this.$auth.user.occupation
    this.bio = this.$auth.user.bio
  },
  created() {},
  methods: {
    close() {
      this.profilefrom = false

      this.contactfrom = false
    },
    updatprofile() {
      const params = {
        avatar: this.avatar,
        firstName: this.firstName,
        lastName: this.lastName,
        city: this.city,
        country: this.country,
        occupation: this.occupation,
        bio: this.bio,
      }
      this.$axios.put('/user', params).then((responce) => {
        this.$auth.setUser(responce.data.user)

        this.close()
      })
    },
    updatcontact() {
      const params = {
        mobile: this.mobile,
        institute: this.institute,
        country: this.country,
        email: this.email,
        address: this.address,
      }
      this.$axios.put('/user', params).then((responce) => {
        this.$auth.setUser(responce.data.user)
        this.close()
      })
    },
  },
}
</script>
