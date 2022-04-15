<template>
  <v-card class="px-5 pb-1">
    <v-card-title
      class="justify-space-between font-weight-bold body-2 pt-3 px-0"
    >
      Actions
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
            <v-list-item-title @click="deleteAction">
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-text-field
      :value="action.name"
      :rules="nameRules"
      label="Action Name"
      hide-details="auto"
      dense
      @input="changeName"
    ></v-text-field>

    <v-select
      :value="action.type"
      :items="types"
      :rules="[required]"
      label="Action Type"
      hide-details="auto"
      required
      @input="changeType"
    ></v-select>
    <template
      v-if="action.type === 'Select' || action.type === 'Multy Select'"
      class="ma-3"
    >
      <v-textarea
        v-model="values"
        label="Select Values"
        height="30px"
        hide-details="auto"
        class="my-5"
        rows="2"
      ></v-textarea>
    </template>

    <v-text-field
      :value="action.value"
      required
      label="Action Defalut value"
      hide-details="auto"
      dense
      class="my-5"
      @input="changeValue"
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
    action: {
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
      // action: {
      //   name: '',
      //   type: '',
      //   value: '',
      //   values: [0, 1],
      // },
      values: [],
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 3) || 'Name must be more then 3 characters',
        (v) =>
          !/[^a-zA-Z0-9]/gm.test(v) ||
          'Can not contain space or special character',
      ],
      types: [
        { text: 'Boolean', vlaue: 'boolean' },
        { text: 'Select', vlaue: 'select' },
        { text: 'Multy Select', vlaue: 'multy-select' },
        { text: 'Range', vlaue: 'range' },
      ],
    }
  },
  computed: {},
  watch: {
    values(val) {
      if (typeof val === 'string') {
        if (!this.equipment._id) {
          this.action.values = val.split(',')
        } else {
          const actions = [...this.equipment.actions]

          if (!this.action._id) {
            actions[this.index] = {
              ...actions[this.index],
              values: val.split(','),
            }

            this.$store.commit('updateComponent', {
              ...this.equipment,
              actions,
            })
          } else {
            this.$store.commit('updateComponent', {
              ...this.equipment,
              actions: actions.map((act) => {
                if (act._id === this.action._id) {
                  return { ...act, values: val.split(',') }
                }
                return act
              }),
            })
          }
        }
      }
    },
  },
  mounted() {
    // if (this.value.name) {
    //   this.action = Object.assign({}, this.value)
    //   this.values = [...this.action.values]
    // }
    this.values = [...this.action.values]
  },
  methods: {
    // emitAction(val) {
    //   this.$emit('input', this.action)
    // },
    changeName(val) {
      if (!this.equipment._id) {
        this.action.name = val
      } else {
        const actions = [...this.equipment.actions]

        if (!this.action._id) {
          actions[this.index] = { ...actions[this.index], name: val }

          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions,
          })
        } else {
          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions: actions.map((act) => {
              if (act._id === this.action._id) return { ...act, name: val }
              return act
            }),
          })
        }
      }
    },
    changeType(val) {
      if (!this.equipment._id) {
        this.action.type = val
      } else {
        const actions = [...this.equipment.actions]

        if (!this.action._id) {
          actions[this.index] = { ...actions[this.index], type: val }

          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions,
          })
        } else {
          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions: actions.map((act) => {
              if (act._id === this.action._id) return { ...act, type: val }
              return act
            }),
          })
        }
      }
    },
    changeValue(val) {
      if (!this.equipment._id) {
        this.action.value = val
      } else {
        const actions = [...this.equipment.actions]

        if (!this.action._id) {
          actions[this.index] = { ...actions[this.index], value: val }

          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions,
          })
        } else {
          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions: actions.map((act) => {
              if (act._id === this.action._id) return { ...act, value: val }
              return act
            }),
          })
        }
      }
    },
    deleteAction() {
      if (!this.equipment._id) {
        this.equipment.actions.splice(this.index, 1)
      } else {
        const actions = [...this.equipment.actions]

        if (!this.action._id) {
          actions.splice(this.index, 1)

          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions,
          })
        } else {
          this.$store.commit('updateComponent', {
            ...this.equipment,
            actions: actions.filter((act) => act._id !== this.action._id),
          })
        }
      }
    },
  },
}
</script>
