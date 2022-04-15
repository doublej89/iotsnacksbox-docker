<template>
  <v-card class="px-5 pb-1" height="200px">
    <v-card-title
      class="justify-space-between font-weight-bold body-2 pt-3 px-0"
    >
      Trigger
      <!-- <v-img
          src="/images/icons/light/addregistercomponent.svg"
          max-width="12px"
          class="ml-5"
        ></v-img> -->
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
          <v-list-item>
            <v-list-item-title @click="deleteTrigger">
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-text-field
      :value="trigger.name"
      :rules="nameRules"
      label="Trigger Name"
      required
      hide-details
      dense
      class="mb-10"
      @input="emitTrigger"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  props: {
    equipment: {
      type: Object,
      required: true,
    },
    trigger: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // trigger: {
      //   name: '',
      //   value: 0,
      // },
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 3) || 'Name must be more then 3 characters',
        (v) =>
          !/[^a-zA-Z0-9]/gm.test(v) ||
          'Can not contain space or special character',
      ],
    }
  },
  computed: {},
  mounted() {
    // console.log(this.value)
    // if (this.value && this.value.name) {
    //   this.trigger = this.value
    // }
  },
  methods: {
    emitTrigger(val) {
      if (!this.equipment._id) {
        this.trigger.name = val
      } else {
        const triggers = [...this.equipment.triggers]

        if (!this.trigger._id) {
          triggers[this.index] = { ...triggers[this.index], name: val }

          this.$store.commit('updateComponent', {
            ...this.equipment,
            triggers,
          })
        } else {
          this.$store.commit('updateComponent', {
            ...this.equipment,
            triggers: triggers.map((trig) => {
              if (trig._id === this.trigger._id) return { ...trig, name: val }
              return trig
            }),
          })
        }
      }
    },
    deleteTrigger() {
      if (!this.equipment._id) {
        this.equipment.triggers.splice(this.index, 1)
      } else {
        const triggers = [...this.equipment.triggers]

        if (!this.trigger._id) {
          triggers.splice(this.index, 1)

          this.$store.commit('updateComponent', {
            ...this.equipment,
            triggers,
          })
        } else {
          this.$store.commit('updateComponent', {
            ...this.equipment,
            triggers: triggers.filter((trig) => trig._id !== this.trigger._id),
          })
        }
      }
    },
  },
}
</script>
