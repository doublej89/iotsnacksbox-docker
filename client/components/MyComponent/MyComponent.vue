<template>
  <v-row>
    <v-col v-for="equipment in equipments" :key="equipment.id" cols="12" md="3">
      <Equipment :equipment="equipment" :widgets="widgets" add-registrie />
    </v-col>
  </v-row>
</template>
<script>
import Equipment from '../RegisterComponent/Equipment.vue'

export default {
  components: { Equipment },
  props: {
    widgets: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data: () => ({}),
  computed: {
    equipments() {
      return this.$store.state.components
    },
    components() {
      return this.$store.state.components
    },
  },
  created() {
    this.getComponents()
  },
  methods: {
    getComponents() {
      this.$store.dispatch('getComponents')
    },
    addregister() {
      const params = {
        component_id: this.component._id,
      }
      this.$store.dispatch('addRegistries', params)
    },
  },
}
</script>
