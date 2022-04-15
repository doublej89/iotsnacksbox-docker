<template>
  <v-form ref="form" v-model="valid" @submit.prevent="registercomponent">
    <v-card flat>
      <v-card-title class="justify-center pb-4" style="background: #e0e0e0">
        <span class="headline font-weight-bold" style="color: #455f6a">
          Add equipment
        </span>
      </v-card-title>
      <v-card-text class="py-0">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="name"
                :value="equipment.name"
                type="text"
                :rules="[required]"
                label="Name"
                required
                hide-details="auto"
                @input="changeName"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="description"
                :value="equipment.description"
                :rules="[required]"
                required
                autocomplete="email"
                label="Description"
                hide-details="auto"
                @input="changeDescription"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-select
                :value="equipment.status"
                :items="statusOption"
                :rules="[required]"
                label="Status"
                required
                hide-details="auto"
                @input="changeStatus"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                :value="equipment.accessibility"
                :items="accessOption"
                :rules="[required]"
                label="accessibility"
                required
                hide-details="auto"
                @input="changeAccessibility"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                :value="equipment.icon"
                :items="icons"
                label="Icon"
                hide-details="auto"
                @input="changeIcon"
              >
                <template v-slot:selection="data">
                  <div
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <v-img :src="data.item" height="42" contain></v-img>
                  </div>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-img
                      :src="data.item"
                      height="42"
                      class="my-2"
                      contain
                    ></v-img>
                  </template>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pr-8">
        <v-spacer></v-spacer>
        <v-btn color="success" dark small @click="addAction">
          Add Action
        </v-btn>
        <v-btn color="success" dark small @click="addtrigger">
          Add Trigger
        </v-btn>
      </v-card-actions>
      <v-card-text class="py-0">
        <v-row dense>
          <v-col
            v-for="(action, i) in equipment.actions"
            :key="`a-${i}`"
            sm="4"
          >
            <!-- <ActionForm
              :value="action"
              :index="i"
              @input="addAction($event, i)"
              @cancel="removeAction(action.name)"
              :equipment="equipment"
            /> -->
            <ActionForm
              :action="action"
              :index="i"
              :equipment="equipment"
              @cancel="removeAction(action.name)"
            />
          </v-col>
          <v-col
            v-for="(trigger, i) in equipment.triggers"
            :key="`t-${i}`"
            sm="4"
          >
            <TriggerForm
              :trigger="trigger"
              :index="i"
              :equipment="equipment"
              @cancel="removetrigger(trigger.name)"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pr-8 pb-8">
        <v-spacer></v-spacer>
        <v-btn color="error" dark @click="$emit('cancel')"> cancel </v-btn>
        <v-btn color="success" type="submit" :disabled="!valid"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import ActionForm from './ActionForm.vue'
import TriggerForm from './TriggerForm.vue'

export default {
  components: {
    ActionForm,
    TriggerForm,
  },
  props: {
    equipment: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        icon: '',
        actions: [],
        triggers: [],
        status: 'active',
        accessibility: 'public',
      }),
    },
  },
  data: () => ({
    actions: [],
    triggers: [],
    slugReadonly: true,
    valid: true,
    loading: false,

    statusOption: ['active', 'inactive', 'pending', 'testing'],
    accessOption: ['public', 'private', 'custom'],
    icons: [
      '/images/circuits/circuit-1.svg',

      '/images/circuits/circuit-2.svg',

      '/images/circuits/circuit-3.svg',

      '/images/circuits/circuit-4.svg',

      '/images/circuits/circuit-5.svg',

      '/images/circuits/circuit-6.svg',

      '/images/circuits/circuit-7.svg',

      '/images/circuits/circuit-8.svg',
    ],
  }),
  mounted() {
    this.actions = this.equipment.actions
    this.triggers = this.equipment.triggers
  },
  methods: {
    close() {
      this.$emit('cancel')
    },
    registercomponent() {
      // const params = this.equipment

      // params.actions = this.actions.length ? this.actions : null
      // params.triggers = this.triggers.length ? this.triggers : null
      if (this.loading) {
        return
      }
      this.loading = true

      const mutation = this.equipment._id ? 'updateComponent' : 'addComponent'
      // this.$store.dispatch(mutation, this.equipment).finally(() => {
      //   this.loading = false
      //   this.close()
      // })
      console.log('About to register component')
      this.$store
        .dispatch(mutation, this.equipment)
        .then((res) => {
          this.loading = false
          console.log("Component should've updated")
          this.close()
        })
        .catch((error) => console.log(error))
    },
    clear() {
      this.equipment.name = ''
      this.equipment.description = ''
      this.equipment.acessibility = 'active'
      this.equipment.status = 'public'
    },
    addAction(action, i) {
      if (!this.equipment._id) {
        this.equipment.actions.push({
          name: '',
          type: 'boolean',
          value: 1,
          values: [0, 1],
        })
      } else {
        this.$store.commit('updateComponent', {
          ...this.equipment,
          actions: [
            ...this.equipment.actions,
            {
              name: '',
              type: 'boolean',
              value: 1,
              values: [0, 1],
            },
          ],
        })
      }
    },
    removeAction(name) {
      this.actions = this.actions.filter((a) => a.name !== name)
    },
    addtrigger(trigger) {
      if (!this.equipment._id) {
        this.equipment.triggers.push({
          name: '',
          value: 1,
        })
      } else {
        this.$store.commit('updateComponent', {
          ...this.equipment,
          triggers: [
            ...this.equipment.triggers,
            {
              name: '',
              value: 1,
            },
          ],
        })
      }
    },
    removetrigger(name) {
      const triggers = [...this.triggers]
      this.equipment.triggers = triggers.filter((a) => a.name !== name)
      this.$store.commit('updateComponent', this.equipment)
    },
    changeName(val) {
      if (!this.equipment._id) {
        this.equipment.name = val
      } else {
        this.$store.commit('updateComponent', { ...this.equipment, name: val })
      }
    },
    changeDescription(val) {
      if (!this.equipment._id) {
        this.equipment.description = val
      } else {
        this.$store.commit('updateComponent', {
          ...this.equipment,
          description: val,
        })
      }
    },
    changeStatus(val) {
      if (!this.equipment._id) {
        this.equipment.status = val
      } else {
        this.$store.commit('updateComponent', {
          ...this.equipment,
          status: val,
        })
      }
    },
    changeAccessibility(val) {
      if (!this.equipment._id) {
        this.equipment.accessibility = val
      } else {
        this.$store.commit('updateComponent', {
          ...this.equipment,
          accessibility: val,
        })
      }
    },
    changeIcon(val) {
      if (!this.equipment._id) {
        this.equipment.icon = val
      } else {
        this.$store.commit('updateComponent', { ...this.equipment, icon: val })
      }
    },
  },
}
</script>
