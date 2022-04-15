<template>
  <div class="my-component pa-5">
    <v-row dense>
      <v-col cols="12">
        <v-card-title class="font-weight-bold pb-1 pl-0"
          >Register Component List
        </v-card-title>
      </v-col>
      <MyRegisterCom />
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-card-title class="font-weight-bold pb-1 pl-0"
          >Component List</v-card-title
        >
      </v-col>
      <MyComponent :widgets="widgets" />
    </v-row>
  </div>
</template>

<script>
import MyComponent from '../../components/MyComponent/MyComponent.vue'
import MyRegisterCom from '../../components/MyComponent/MyRegisterCom.vue'

export default {
  components: { MyComponent, MyRegisterCom },
  layout: 'dashboard',
  data: () => ({
    create: false,
    widgets: [],

    copyLink:
      '1957606de556c5a71bb2e5fe22d04ecdcfa5aeb1696cf497d0ab235bc5848f02',
  }),
  computed: {
    components() {
      return this.$store.state.components
    },
  },
  created() {
    this.getComponents()
    this.getWidgets()
  },
  methods: {
    getComponents() {
      this.$store.dispatch('getComponents')
    },
    getWidgets() {
      this.loading = true
      this.$axios
        .get('/widgets')
        .then((res) => {
          this.widgets = [...res.data]
          this.loading = false
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
  },
}
</script>
