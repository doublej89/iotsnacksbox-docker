<template>
  <v-responsive>
    <div class="top-section">
      <v-container>
        <v-row>
          <v-col>
            <v-card
              color="transparent"
              flat
              height="100px"
              style="margin-top: 200px"
            >
              <v-card-title
                class="justify-center font-weight-bold mb-10 text-sm-h4"
              >
                IoT Snacksbox Low-code IoT Application Development Platform
              </v-card-title>
              <v-card-subtitle
                class="pb-0 text-center black--text text--darken-1"
                style="line-height: 28px"
              >
                A toolkit for assembling and launching Mobile and Web IoT Apps
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="signInSchool-section">
      <v-container>
        <v-row>
          <v-col>
            <v-card flat color="transparent">
              <v-row>
                <v-col cols="12">
                  <v-card-title class="justify-center text-h5">
                    Sign in to School of IoT
                  </v-card-title>
                </v-col>
                <v-col md="6">
                  <v-card class="mx-auto mt-16" tile flat color="transparent">
                    <v-card-text class="pa-11">
                      <p class="mb-2">
                        <v-icon small color="blue">mdi-circle-medium</v-icon> 3
                        forever free devices
                      </p>
                      <p class="mb-2">
                        <v-icon small color="blue">mdi-circle-medium</v-icon>
                        200+ open source device libraries and tutorials
                      </p>
                      <p class="mb-2">
                        <v-icon small color="blue">mdi-circle-medium</v-icon>
                        Real-time dashboards with 30+ types of widgets (and the
                        tools to code your own!)
                      </p>
                      <p class="mb-2">
                        <v-icon small color="blue">mdi-circle-medium</v-icon>
                        If-Then triggers with Email, SMS, Telegram, Voice call,
                        Webhooks or Slack notifications
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col md="6">
                  <register color="transparent" />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="innovation-section">
      <v-container>
        <v-row>
          <v-col>
            <v-card flat color="transparent">
              <v-row class="align-center">
                <v-col cols="12">
                  <v-card-title class="justify-center ennovation-title">
                    Education is Innovation
                  </v-card-title>
                  <v-card-title class="title-text">
                    IoT Snacks box and our partners are committed to the expansion and
                    availability of problem solving technologies. We believe
                    personal tech exploration will yield global externalities
                    towards the economization of precious resources many take
                    for granted – clean water, quality food, and personal safety
                    to name a few.
                  </v-card-title>
                </v-col>
                <v-col md="4">
                  <v-card class="mx-auto" color="transparent" tile flat>
                    <v-img
                      src="/images/EnvironmentalPreservation.svg"
                      width="100px"
                      class="mx-auto"
                    ></v-img>
                    <v-card-title class="justify-center pt-2">
                      Environmental Preservation
                    </v-card-title>
                    <v-card-subtitle class="text-center pl-10 pr-10 title-text">
                      Protect and promote the responsible economization of
                      natural lands and the critters that inhabit them.
                    </v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col md="4">
                  <v-card class="mx-auto" color="transparent" tile flat>
                    <v-img
                      src="/images/DevelopingRegions.svg"
                      width="100px"
                      class="mx-auto"
                    ></v-img>
                    <v-card-title class="justify-center pt-2">
                      Developing Regions
                    </v-card-title>
                    <v-card-subtitle class="text-center pl-11 pr-11 title-text">
                      Cultivate technology to improve the standards and
                      situations of those in emerging economies or in need
                    </v-card-subtitle>
                  </v-card>
                </v-col>

                <v-col md="4">
                  <v-card class="mx-auto" color="transparent" tile flat>
                    <v-img
                      src="/images/STEAMEducation.svg"
                      width="150px"
                      class="mx-auto"
                    ></v-img>
                    <v-card-title class="justify-center pt-2">
                      STEAM Education
                    </v-card-title>
                    <v-card-subtitle class="text-center pl-14 pr-14 title-text">
                      Apply Science, Technology, Engineering, Arts, and
                      Mathematic approaches to IoT projects to inspire a future
                      IT leader
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="statyInTouch-section">
      <v-container>
        <v-row>
          <v-col>
            <v-card flat>
              <v-card-title
                class="justify-center text-h4 font-weight-light mb-4"
              >
                Stay in Touch
              </v-card-title>
              <v-card-subtitle
                class="text-center black--text text--darken-4 text-h6 font-weight-light mb-3"
              >
                Sign up for the latest news & updates
              </v-card-subtitle>
              <v-card-text>
                <div class="d-flex align-center justify-center">
                  <div>
                    <v-text-field
                      label="Enter your email"
                      outlined
                      prepend-inner-icon="mdi-email-outline"
                      rounded
                      hide-details
                      dense
                    ></v-text-field>
                  </div>
                  <div>
                    <v-btn rounded color="blue" dark class="ml-3 px-5">
                      subscribe
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-responsive>
</template>
<script>
export default {
  data() {
    return {
      checkbox: false,
    }
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
<style lang="scss">
.signInSchool-section {
  margin-top: 150px;
}
.innovation-section {
  background-color: #f4f4f6;
  .ennovation-title {
    color: #6db3a9;
    letter-spacing: 2px;
    font-weight: 400;
    font-size: 25px;
  }
  .title-text {
    font-weight: 400;
    color: #383838 !important;
    font-size: 14px;
    line-height: 22px;
  }
}
.statyInTouch-section {
  margin: 100px 0;
}
</style>
