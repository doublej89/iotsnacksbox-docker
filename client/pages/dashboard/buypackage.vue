<template>
  <v-responsive>
    <div class="buy-package pa-2">
      <v-card class="buy-package-card">
        <v-row no-gutters>
          <v-col md="8">
            <v-card flat tile class="pa-10" color="transparent">
              <div class="d-flex justify-space-between">
                <v-card-title>Shopping Cart</v-card-title>
                <v-card-title>1 Items</v-card-title>
              </div>
              <v-divider></v-divider>
              <v-simple-table class="buypackage-table">
                <thead>
                  <tr>
                    <th class="text-left">Product Details</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="d-flex align-center py-3">
                        <div>
                          <v-img
                            src="/images/payment.png"
                            width="70px"
                            height="70px"
                          ></v-img>
                        </div>
                        <div>
                          <v-card-title class="text-subtitle-2 pb-1"
                            >Custom Package</v-card-title
                          >
                          <v-img
                            src="/images/icons/light/delete.svg"
                            width="10px"
                            class="ml-5"
                          ></v-img>
                        </div>
                      </div>
                    </td>
                    <td>
                      <v-row dense class="align-center payment-amount-action">
                        <v-icon color="grey">mdi-minus</v-icon>
                        <div>
                          <v-text-field
                            v-model="numberType"
                            hide-details
                            dense
                            light
                            outlined
                            class="float-left payment-field"
                            style="width: 60px"
                          ></v-text-field>
                          <span class="ml-1"><sub class="sub-mb">mb</sub></span>
                        </div>
                        <v-icon color="grey">mdi-plus</v-icon>
                      </v-row>
                    </td>
                    <td>$ <strong>460</strong></td>
                    <td>$ <strong>460</strong></td>
                  </tr>
                </tbody>
              </v-simple-table>

              <v-card-title
                class="text-subtitle-2 font-weight-bold payment-amount-action"
              >
                <v-icon class="font-weight-bold mr-1">mdi-arrow-left</v-icon
                >Continue Shopping
              </v-card-title>
            </v-card>
          </v-col>
          <v-col md="4">
            <v-card color="#F6F6F6" flat tile class="pa-10 order-card">
              <v-card-title class="pl-0">Order Summary</v-card-title>
              <v-divider class="custom-v-divider"></v-divider>
              <div class="d-flex justify-space-between mb-3">
                <v-card-title class="text-subtitle-2 pl-0">
                  ITEMS 3
                </v-card-title>
                <v-card-title class="text-subtitle-2 pr-0">
                  $ 3345
                </v-card-title>
              </div>
              <v-card-title class="pl-0 font-weight-bold text-subtitle-2">
                PROMO CODE
              </v-card-title>
              <v-text-field
                placeholder="Enter Your Code"
                outlined
                hide-details
                dense
                height="40px"
                class="mb-4 payment-field"
              ></v-text-field>
              <v-btn color="#0F1828" dark tile depressed class="mb-7 apply-btn"
                >apply</v-btn
              >
              <v-card-title class="pl-0 font-weight-bold text-subtitle-2">
                PAYMENT
              </v-card-title>
              <v-radio-group
                v-model="radios"
                :mandatory="false"
                class="mt-0 mb-7 pl-4"
              >
                <v-radio class="package-radio" label="Radio 1" value="radio-1">
                  <template v-slot:label>
                    <div>
                      <span class="radio-text">Cash on Delivery</span>
                    </div>
                  </template>
                </v-radio>
                <v-radio label="Radio 2" value="radio-2">
                  <template v-slot:label>
                    <div>
                      <span class="radio-text">Online Payment</span>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-divider></v-divider>
              <div class="d-flex justify-space-between mb-3">
                <v-card-title class="text-subtitle-2 pl-0">
                  TOTAL COST
                </v-card-title>
                <v-card-title class="text-subtitle-2 pr-0">
                  $ 3345
                </v-card-title>
              </div>
              <v-btn
                color="#0F1828"
                block
                dark
                tile
                depressed
                class="mb-7 checkout-btn"
                >checkout</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-responsive>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      switch1: 'On',
      paymentsModal: false,
      numberType: '1023',
      radios: 'radio-1',
    }
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
