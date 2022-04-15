<template>
  <v-responsive>
    <v-container>
      <v-row justify="center" no-gutters class="my-10">
        <v-col sm="6">
          <v-card max-width="600" flat>
            <ContactUs />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
import ContactUs from '../components/Contact-us.vue'

export default {
  components: { ContactUs },
  layout: 'default',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
