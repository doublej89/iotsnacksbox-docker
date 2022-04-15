<template>
  <v-card outlined class="ioComponent">
    <v-card-actions>
      <v-card-title class="text-truncate">{{ component.name }}</v-card-title>
      <v-spacer></v-spacer>

      <v-btn v-if="registrieButton" color="primary" @click="addRegistries"
        >Add to Registries</v-btn
      >

      <v-card-actions v-if="editdeleteButton" class="sidebutton pa-0">
        <v-btn
          text
          icon
          color="green"
          class="pa-0"
          @click.prevent="create = !create"
        >
          <v-icon small>fas fa-edit</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          color="red"
          class="pa-0"
          @click.prevent="deleteComponent"
        >
          <v-icon small>fas fa-trash-alt</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-actions>
    <NewComponent v-if="create"/>
    <v-card-text>{{ component.description }}</v-card-text>

    <v-row>
      <v-col>
        <v-toolbar color="transpanent" flat>
          <v-toolbar-title>Actions</v-toolbar-title>
        </v-toolbar>
        <v-list-item
          v-for="(action, i) in component.actions"
          :key="i"
          three-line
        >
          <v-list-item-content>
            <v-list-item-title>{{ action.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ action.type }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ action.value }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col>
        <v-toolbar color="transpanent" flat>
          <v-toolbar-title>Triggers</v-toolbar-title>
        </v-toolbar>

        <v-list-item
          v-for="(trigger, i) in component.triggers"
          :key="i"
          three-line
        >
          <v-list-item-content>
            <v-list-item-title>{{ trigger.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ trigger.value }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import NewComponent from './NewComponent.vue'

export default {
  components: { NewComponent },
  props: {
    component: {
      type: Object,
      required: true,
    },
    registrieButton: {
      type: Boolean,
      default: false,
    },
    editdeleteButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      create: false,
    }
  },
  computed: {},
  created() {},
  methods: {
    addRegistries() {
      const params = {
        component_id: this.component._id,
      }
      this.$store.dispatch('addRegistries', params)
    },
    deleteComponent() {
      const con = confirm("'Do You Want To Delete Component?'")
      if (!con) {
        return
      }
      this.$axios
        .delete(`/components/${this.component._id}`)
        .then((res) => {
          this.$emit('delete', this.component._id)
        })
    },
  },
}
</script>
<style lang="scss">
.ioComponent {
  .sidebutton {
    display: none;
    position: relative;
    .v-icon {
      background: transparent;

      font-size: 12px;
      padding: 1px 2px;
    }
  }
  &:hover .sidebutton {
    display: inline;
  }
}
</style>
