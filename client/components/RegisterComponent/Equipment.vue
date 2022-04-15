<template>
  <v-card elevation="4" height="auto" class="equipmentCard">
    <v-card-title>
      <v-card-subtitle class="pa-0 v-card__subtitle-date">
        {{ momentDate(equipment.createdAt) }}
      </v-card-subtitle>

      <v-spacer></v-spacer>

      <v-menu
        bottom
        left
        min-width="120px"
        close-on-click
        close-on-content-click
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn light icon v-bind="attrs" v-on="on">
            <v-icon class="dots-icon">mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list dense class="pa-0 custom-v-list">
          <v-list-item v-if="addRegistrie" @click="registryName = true">
            <v-list-item-title> Add to Registers </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!addRegistrie">
            <v-list-item-title @click="editEquipment = true">
              Edit
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="!addRegistrie">
            <v-list-item-title @click="deleteEquipment">
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-img
      :src="equipment.icon"
      class="mx-auto"
      width="80px"
      height="80px"
      contain
    ></v-img>
    <v-card-subtitle
      class="text-center text-lg-h4 text-md-h5 pb-0 text-truncate"
    >
      {{ equipment.name }}
    </v-card-subtitle>
    <div v-if="addRegistrie" class="pa-5 my-component-table">
      <v-divider></v-divider>
      <v-row class="pt-2" justify="space-around" align="center">
        <v-col class="text-center" md="12" lg="4"
          >Actions ({{ equipment.actions.length }})</v-col
        >
        <v-col class="text-center" md="12" lg="4"
          >Triggers ({{ equipment.triggers.length }})</v-col
        >
        <v-col class="text-center" md="12" lg="4"
          >Wdigets ({{ numWidgets }})</v-col
        >
      </v-row>
    </div>
    <div v-if="!addRegistrie" class="d-flex justify-center">
      <v-switch
        v-model="equipmentStatus"
        false-value="inactive"
        true-value="active"
        color="success"
        @change="changeEquipmentStatus"
      >
        <template v-slot:label class="d-block">
          <span class="onOff">{{ equipment.status }}</span>
        </template>
      </v-switch>
    </div>

    <v-dialog v-model="editEquipment" class="editEquipment" max-width="740px">
      <NewComponent :equipment="equipment" @cancel="editEquipment = false" />
    </v-dialog>
    <v-dialog v-model="registryName" width="500">
      <RegistryName
        :equipmentId="equipment._id"
        @submit="addregister"
        @close="registryName = false"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import NewComponent from './NewComponent.vue'
import RegistryName from './RegistryName.vue'

export default {
  components: { NewComponent, RegistryName },
  props: {
    equipment: {
      type: Object,
      required: true,
    },
    addRegistrie: {
      type: Boolean,
      default: false,
    },
    widgets: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    confirmModal: false,
    editEquipment: false,
    equipmentStatus: 'inactive',
    registryName: false,
  }),
  computed: {
    numWidgets() {
      let count = 0
      this.widgets.forEach((widget) => {
        if (
          widget.registry &&
          widget.registry.component === this.equipment._id
        ) {
          count += 1
        }
      })
      return count
    },
  },
  mounted() {
    this.equipmentStatus = this.equipment.status
  },
  methods: {
    deleteEquipment() {
      this.$confirm.delete().then((confirm) => {
        this.$store
          .dispatch('deleteComponent', this.equipment._id)
          .then((res) => {
            this.$confirm.state('done')
          })
      })
      // this.$store
      //   .dispatch('deleteComponent', this.equipment._id)
      //   .then((res) => {
      //     this.confirmModal = false
      //   })
    },
    addregister(params) {
      console.log(params)
      // const params = {
      //   component_id: this.equipment._id,
      // }
      this.$store.dispatch('addRegistries', params).then((res) => {
        this.registryName = false
      })
    },
    changeEquipmentStatus() {
      const params = {
        status: this.equipmentStatus,
        _id: this.equipment._id,
      }

      this.$store.dispatch('activeComponent', params)
    },
  },
}
</script>
