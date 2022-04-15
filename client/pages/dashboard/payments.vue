<template>
  <v-responsive>
    <div class="payment-top-section pa-2">
      <v-card elevation="4" class="py-5">
        <v-row class="align-center">
          <v-col md="4" class="available-section">
            <v-card-text class="text-center available-card-text">
              <span class="numeric-text">100MB</span>
              <span class="only-text">Available</span>
            </v-card-text>
          </v-col>
          <v-col md="4" class="valid-section">
            <v-card-text class="valid-card-text">
              <div>
                <v-img
                  src="/images/icons/light/valid.svg"
                  width="30"
                  class="mr-5 mt-2"
                ></v-img>
              </div>
              <div>
                <span class="d-block">Valid to</span>
                <p class="text-h5 font-weight-bold mb-0">August 20, 2020</p>
              </div>
            </v-card-text>
          </v-col>

          <v-col md="4" class="switch-section">
            <div class="d-flex justify-center">
              <v-switch v-model="switch1" false-value="Off" true-value="On">
                <template v-slot:label class="d-block">
                  Auto Review:
                  <span class="onOff">{{ switch1.toString() }}</span>
                </template>
              </v-switch>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div class="payment-middle-section pa-2">
      <v-row class="align-center" dense>
        <!-- <v-col md="3">
          <v-card class="mx-auto" tile>
            <v-img class="white--text align-end" src="/images/payment.png">
              <span class="payment-amount">$250</span>
            </v-img>

            <v-card-title class="justify-center font-weight-bold"
              >Basic Package</v-card-title
            >
            <v-card-subtitle class="text-center px-5 payment-subtitle">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy
            </v-card-subtitle>

            <v-card-actions
              class="text-center payment-action-btn font-weight-bold"
            >
              <v-btn
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
                @click.stop="paymentsModal = true"
              >
                <v-icon x-small>mdi-lock-outline</v-icon> buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="3">
          <v-card class="mx-auto" tile>
            <v-img class="white--text align-end" src="/images/payment.png">
              <span class="payment-amount">$250</span>
            </v-img>

            <v-card-title class="justify-center font-weight-bold"
              >Basic Package</v-card-title
            >
            <v-card-subtitle class="text-center px-5 payment-subtitle">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy
            </v-card-subtitle>

            <v-card-actions
              class="text-center payment-action-btn font-weight-bold"
            >
              <v-btn
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
                @click="makePayment"
              >
                <v-icon x-small>mdi-lock-outline</v-icon> buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="3">
          <v-card class="mx-auto" tile>
            <v-img class="white--text align-end" src="/images/payment.png">
              <span class="payment-amount">$250</span>
            </v-img>

            <v-card-title class="justify-center font-weight-bold"
              >Basic Package</v-card-title
            >
            <v-card-subtitle class="text-center px-5 payment-subtitle">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy
            </v-card-subtitle>

            <v-card-actions
              class="text-center payment-action-btn font-weight-bold"
            >
              <v-btn
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
              >
                <v-icon x-small>mdi-lock-outline</v-icon> buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="3">
          <v-card class="mx-auto" tile>
            <v-img class="white--text align-end" src="/images/payment.png">
              <span class="payment-amount">$250</span>
            </v-img>

            <v-card-title class="justify-center font-weight-bold"
              >Basic Package</v-card-title
            >
            <v-card-subtitle class="text-center px-5 payment-subtitle">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy
            </v-card-subtitle>

            <v-card-actions
              class="text-center payment-action-btn font-weight-bold"
            >
              <v-btn
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
              >
                <v-icon x-small>mdi-lock-outline</v-icon> buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col> -->
        <v-col v-for="plan in plans" :key="plan._id" md="3">
          <v-card class="mx-auto" tile>
            <v-img class="white--text align-end" src="/images/payment.png">
              <span class="payment-amount">{{ plan.price }}</span>
            </v-img>

            <v-card-title class="justify-center font-weight-bold">{{
              plan.title
            }}</v-card-title>
            <v-card-subtitle class="text-center px-5 payment-subtitle">
              {{ plan.description }}
            </v-card-subtitle>

            <v-card-actions
              class="text-center payment-action-btn font-weight-bold"
            >
              <v-btn
                v-if="plan.status === 'active'"
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
                disabled
              >
                <v-icon x-small>mdi-lock-outline</v-icon>
                Already Activated
              </v-btn>
              <v-btn
                v-else-if="
                  plan.status === 'inactive' &&
                  $auth.user.workspace.currentBalance >= plan.price
                "
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
                @click.stop="openModal"
              >
                <v-icon x-small>mdi-lock-outline</v-icon>
                Activate Plan
              </v-btn>
              <v-btn
                v-else-if="plan.status === 'free'"
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
                @click.stop="openModal"
              >
                <v-icon x-small>mdi-lock-outline</v-icon>
                Start Trial
              </v-btn>
              <v-btn
                v-else-if="
                  plan.status === 'inactive' &&
                  $auth.user.workspace.currentBalance < plan.price
                "
                class="ma-2 px-5 font-weight-bold black--text"
                small
                outlined
                rounded
                @click="makePayment"
              >
                <v-icon x-small>mdi-lock-outline</v-icon>
                Deposit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- <v-dialog v-model="paymentsModal" class="paymentsModal" max-width="425">
      <v-card class="px-4">
        <v-card-title
          class="headline font-weight-bold text-h6 justify-center py-4"
          >Package added</v-card-title
        >
        <v-divider></v-divider>
        <v-img
          src="/images/payment.png"
          width="200px"
          height="110px"
          class="mx-auto my-4"
        >
        </v-img>
        <v-card-title class="font-weight-bold text-h6 pt-0 pb-0"
          >Custom Package</v-card-title
        >
        <v-card-text dark class="payments-v-card-text caption">
          Custom Package Lorem ipsum dolor sit amet, consectetuer adipiscing
          elit, sed diam nonummy nibh euismod
        </v-card-text>

        <v-row dense class="px-5 pb-5 align-center payment-amount-action">
          <v-col cols="1">
            <v-icon color="grey">mdi-minus</v-icon>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="numberType"
              hide-details
              dense
              light
              outlined
              class="float-left payment-field"
              style="width: 70px"
            ></v-text-field>
            <span class="ml-1"><sub class="sub-mb">mb</sub></span>
          </v-col>
          <v-col cols="1">
            <v-icon color="grey">mdi-plus</v-icon>
          </v-col>
        </v-row>
        <v-card-subtitle class="pb-0 font-weight-bold payments-v-card-subtitle">
          Price
        </v-card-subtitle>
        <v-card-title class="font-weight-bold pt-0 pl-8"> $ 460 </v-card-title>

        <v-row dense class="px-5 pb-5">
          <v-col>
            <v-btn
              dark
              color="#AEAEB0"
              outlined
              depressed
              block
              @click="dialog = false"
            >
              cancel
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="#4DB248" depressed block dark @click="dialog = false">
              At to Cart
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog> -->
    <v-dialog
      v-model="paymentsModal"
      class="paymentsModal"
      max-width="425"
      @click:outside="closeModal"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Enter your product key
        </v-card-title>

        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          @submit.prevent="activate"
        >
          <v-card-text class="p-10">
            <v-text-field
              v-model="productKey"
              :rules="productKeyRules"
              label="Product Key"
              required
            ></v-text-field>
            <slot></slot>
          </v-card-text>

          <v-card-actions>
            <v-btn color="error" class="ml-4" @click.prevent="closeModal">
              Close
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
            >
              Activate
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-responsive>
</template>

<script>
export default {
  layout: 'dashboard',
  async fetch() {
    try {
      const response = await this.$axios.get('/plan')
      console.log(response.data)

      if (response.data.plans.length > 0) {
        this.plans = [...response.data.plans]
      }
    } catch (error) {
      if (error.response.data) {
        this.message = error.response.data.message
      }
    }
  },
  data() {
    return {
      switch1: 'On',
      paymentsModal: false,
      numberType: '1023',
      plans: [],
      message: '',
      dialogAmount: 0,
      dialogRequest: null,
      dialogStorage: null,
      planId: '',
      dialogTitle: '',
      productKeyRules: [
        (v) => !!v || 'Product key is required',
        (v) => (v && v.length === 8) || 'Product key must be 8 digits',
      ],
      valid: true,
      productKey: '',
      lazy: false,
    }
  },
  computed: {},
  created() {},
  methods: {
    makePayment() {
      this.$axios
        .post('/deposit', {
          amount: 100,
          currency: 'BDT',
          address1: 'Somewhere, some place',
          city: 'Dhaka',
          state: 'Dhaka',
          postcode: '3000',
          country: 'Bangladesh',
          phone: '010XXXXXXXX',
        })
        .then((res) => {
          if (res.data.gatewayPageUrl) {
            window.location.href = res.data.gatewayPageUrl
          }
        })
        .catch((err) => {
          this.$notify.error(err.response.data.message)
        })
    },
    activatePlan(id) {
      this.$axios
        .post(`/subscription`, { planId: id })
        .then((res) => {
          if (res.data.message) {
            this.paymentsModal = false
            this.dialogAmount = 0
            this.dialogRequest = null
            this.dialogStorage = null
            this.planId = ''
            this.dialogTitle = ''
            window.location.reload()
          }
        })
        .catch((error) => {
          if (error.response.data) {
            this.paymentsModal = false
            this.$notify.error(error.response.data.message)
          }
        })
    },
    activate() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post('/snacksbox/verify', { productId: this.productKey })
          .then((res) => {
            if (res.data.message) {
              this.paymentsModal = false
              this.productKey = ''
              window.location.reload()
            }
          })
          .catch((error) => {
            if (error.response.data) {
              this.paymentsModal = false
              this.$notify.error(error.response.data.message)
            }
          })
      }
    },
    openModal() {
      // this.planId = id
      // this.dialogAmount = amount
      // this.dialogTitle = title
      // if (request) this.dialogRequest = request
      // if (storage) this.dialogStorage = storage
      this.paymentsModal = true
    },
    closeModal() {
      this.productKey = ''
      this.paymentsModal = false
    },
  },
}
</script>
