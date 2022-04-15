<template>
  <v-responsive class="equipment pa-5">
    <v-row dense>
      <v-col cols="12" sm="12" class="pa-3">
        <v-btn color="success" @click.stop="addEquipment = true">
          Add Equipment
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        v-for="equipment in components"
        :key="equipment._id"
        cols="12"
        sm="3"
      >
        <Equipment :equipment="equipment" />
      </v-col>
      <v-col
        v-if="!components.length"
        cols="12"
        sm="12"
        class="text-center py-16"
      >
        <p class="text-h4 font-weight-light grey--text text--lighten-1">
          No Equipment Available Please Create New one
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="addEquipment" class="addEquipment" max-width="740px">
      <NewComponent
        @cancel="addEquipment = false"
        @success="addEquipment = false"
      />
    </v-dialog>
  </v-responsive>
</template>

<script>
import { mapState } from 'vuex'
import NewComponent from '../../components/RegisterComponent/NewComponent.vue'
import Equipment from '../../components/RegisterComponent/Equipment.vue'

export default {
  components: { NewComponent, Equipment },
  layout: 'dashboard',
  data: () => ({
    addEquipment: false,
  }),
  computed: {
    ...mapState(['components']),
  },
  created() {
    this.getComponents()
  },
  methods: {
    getComponents() {
      this.$store.dispatch('getSelfComponents')
    },
  },
}
</script>
