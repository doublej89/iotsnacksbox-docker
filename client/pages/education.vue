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
                Build our connected future, today
              </v-card-title>
              <v-card-subtitle
                class="pb-0 text-center black--text text--darken-1"
                style="line-height: 28px"
              >
                Thousands of makers, students, and researchers use<br />
                <strong>IoT Snacksbox</strong> STEM to test, learn, or teach
                IoT</v-card-subtitle
              >
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
                  <v-card-title class="justify-center text-h5"
                    >Sign in to School of IoT</v-card-title
                  >
                </v-col>

                <v-col md="6">
                  <v-card class="mx-auto mt-16" tile flat>
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
                  <v-card-title class="justify-center ennovation-title"
                    >Education is Innovation</v-card-title
                  >
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
                    <v-card-title class="justify-center pt-2"
                      >Environmental Preservation</v-card-title
                    >
                    <v-card-subtitle class="text-center pl-10 pr-10 title-text"
                      >Protect and promote the responsible economization of
                      natural lands and the critters that inhabit
                      them.</v-card-subtitle
                    >
                  </v-card>
                </v-col>
                <v-col md="4">
                  <v-card class="mx-auto" color="transparent" tile flat>
                    <v-img
                      src="/images/DevelopingRegions.svg"
                      width="100px"
                      class="mx-auto"
                    ></v-img>
                    <v-card-title class="justify-center pt-2"
                      >Developing Regions</v-card-title
                    >
                    <v-card-subtitle class="text-center pl-11 pr-11 title-text"
                      >Cultivate technology to improve the standards and
                      situations of those in emerging economies or in
                      need</v-card-subtitle
                    >
                  </v-card>
                </v-col>

                <v-col md="4">
                  <v-card class="mx-auto" color="transparent" tile flat>
                    <v-img
                      src="/images/STEAMEducation.svg"
                      width="150px"
                      class="mx-auto"
                    ></v-img>
                    <v-card-title class="justify-center pt-2"
                      >STEAM Education</v-card-title
                    >
                    <v-card-subtitle class="text-center pl-14 pr-14 title-text"
                      >Apply Science, Technology, Engineering, Arts, and
                      Mathematic approaches to IoT projects to inspire a future
                      IT leader</v-card-subtitle
                    >
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="gallery-section">
      <v-container>
        <v-row class="project-info">
          <v-col>
            <div class="project-tag"><span>Projects</span></div>
            <div class="project-title"><span>Some projects</span></div>
            <div class="created-by-projects">
              <span>Created by our Community</span>
              <span>
                <a href="#">More Projects</a>
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row class="project-info-details">
          <v-col md="4">
            <v-card class="mx-auto" flat color="transparent">
              <v-img class="mb-10" height="200px" src="/images/blog-1.png">
              </v-img>

              <v-card-title class="mb-3"
                >Broker-dealer owner indicated in $17 million dump scheme
              </v-card-title>

              <v-card-subtitle>August 9, 2020</v-card-subtitle>

              <v-card-text class="text--primary pb-0">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh eui
                </p>
              </v-card-text>

              <v-card-actions class="action-btn mb-10">
                <v-btn color="#d29b3a" text> Read More <span></span></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col md="4">
            <v-card class="mx-auto" flat color="transparent">
              <v-img
                class="mb-10 d-sm-flex d-md-none d-lg-none d-xl-none"
                height="200px"
                src="/images/blog-3.png"
              >
              </v-img>
              <v-card-title class="mb-3"
                >Broker-dealer owner indicated in $17 million dump scheme
              </v-card-title>

              <v-card-subtitle>August 9, 2020</v-card-subtitle>

              <v-card-text class="text--primary pb-0">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh eui
                </p>
              </v-card-text>

              <v-card-actions class="action-btn mb-10">
                <v-btn color="#d29b3a" text> Read More <span></span></v-btn>
              </v-card-actions>
              <v-img
                class="mb-10 d-none d-sm-none d-md-flex"
                height="200px"
                src="/images/blog-3.png"
              >
              </v-img>
            </v-card>
          </v-col>
          <v-col md="4">
            <v-card class="mx-auto" flat color="transparent">
              <v-img class="mb-10" height="200px" src="/images/blog-2.png">
              </v-img>

              <v-card-title class="mb-3"
                >Broker-dealer owner indicated in $17 million dump scheme
              </v-card-title>

              <v-card-subtitle>August 9, 2020</v-card-subtitle>

              <v-card-text class="text--primary pb-0">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh eui
                </p>
              </v-card-text>

              <v-card-actions class="action-btn mb-10">
                <v-btn color="#d29b3a" text> Read More <span></span></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="statyInTouch-section">
      <v-container>
        <v-row>
          <v-col>
            <v-card flat color="transparent">
              <v-card-title
                class="justify-center text-h4 font-weight-light mb-4"
                >Stay in Touch</v-card-title
              >
              <v-card-subtitle
                class="text-center black--text text--darken-4 text-h6 font-weight-light mb-3"
                >Sign up for the latest news & updates</v-card-subtitle
              >
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
                    <v-btn rounded color="blue" dark class="ml-3 px-5"
                      >subscribe</v-btn
                    >
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
  margin: 100px 0 125px 0;
  .title-text {
    font-weight: 400;
    color: #383838 !important;
    font-size: 14px;
    line-height: 22px;
  }
}
.gallery-section {
  margin: 100px 0;
  .project-info {
    .project-tag {
      position: relative;
      span {
        color: #333;
        margin-left: 75px;
        display: inline-block;
        letter-spacing: 1px;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          width: 60px;
          border: 2px solid #d29b3a;
          top: 10px;
        }
      }
    }
    .project-title {
      margin-bottom: 20px;
      span {
        color: #000;
        font-size: 30px;
        font-weight: 300;
      }
    }
    .created-by-projects {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      span {
        color: #000;
        position: relative;
        a {
          color: #d29b3a;
          text-decoration: none;
          margin-right: 65px;
          &::after {
            content: '';
            position: absolute;
            right: 0;
            width: 60px;
            border: 1px solid #d29b3a;
            top: 10px;
          }
        }
      }
    }
  }
  .project-info-details {
    .action-btn {
      position: relative;
      span {
        &::after {
          content: '';
          position: absolute;
          right: -75px;
          width: 60px;
          border: 1px solid #d29b3a;
          top: 7px;
        }
      }
    }
  }
}
.middle-divider {
  position: relative;
  margin-top: 10px;
  span {
    font-size: 20px;
    display: block;
    text-align: center;
    color: #555555;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 45%;
      border: 1px solid #f0f0f0;
      top: 11px;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 45%;
      border: 1px solid #f0f0f0;
      top: 11px;
    }
  }
}
</style>
