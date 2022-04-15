<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      Widget Setting
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn
          v-if="widget._id"
          small
          color="error"
          dark
          @click.prevent="deleteWidget(widget._id)"
          >Remove Widget</v-btn
        >
      </div>
    </v-card-title>

    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
      @submit.prevent="submit"
    >
      <v-card-text class="p-10">
        <v-text-field
          v-model="widget.title"
          :counter="10"
          :rules="[required]"
          label="Widget Title"
          required
        ></v-text-field>

        <v-select
          v-model="widget.registry"
          :items="registries"
          :rules="[required]"
          :item-text="textItem"
          item-value="_id"
          label="Registry"
          required
        ></v-select>

        <template v-if="widget.widgetType === 'trigger' && selectRegistry">
          <v-select
            v-model="widget.trigger"
            :items="selectRegistry.component.triggers"
            :rules="[required]"
            item-text="name"
            item-value="name"
            label="Select Trigger"
            required
          ></v-select>
        </template>

        <template v-if="widget.widgetType === 'action' && selectRegistry">
          <v-select
            v-model="widget.action"
            :items="actions"
            :rules="[required]"
            item-text="name"
            item-value="name"
            label="Select Action"
            required
          ></v-select>
        </template>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" class="ml-4" @click.prevent="$emit('close')">
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: {
    widget: {
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
      valid: true,
      lazy: false,
      registries: [],
    }
  },
  computed: {
    selectRegistry() {
      if (!this.widget.registry) {
        return false
      }

      if (typeof this.widget.registry === 'string') {
        return (
          this.registries.length &&
          this.registries.find((i) => i._id === this.widget.registry)
        )
      }

      return (
        this.registries.length &&
        this.registries.find((i) => i._id === this.widget.registry._id)
      )
    },
    actions() {
      if (this.selectRegistry) {
        if (this.widget.name === 'Select') {
          return this.selectRegistry.component.actions.filter(
            (i) => i.type === 'Select'
          )
        }
        return this.selectRegistry.component.actions
      }
      return []
    },
  },
  created() {
    this.getRegistries()
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const widget = Object.assign({}, this.widget)
        if (!isNaN(widget._id)) {
          delete widget._id
        }

        if (typeof widget.registry === 'object') {
          widget.registry = widget.registry._id
        }
        this.$emit('submit', widget)
      }
    },
    deleteWidget(id) {
      const con = confirm("'Do You Want To Delete Widget?'")
      if (!con) {
        return
      }
      this.$axios.delete(`/widgets/${id}`).then((res) => {
        this.$emit('close')
        this.$nuxt.$emit('widgetDelete', id)
      })
      // this.$store.dispatch('deleteWidget', id).then((res) => {
      //   this.$emit('close')
      // })
    },
    textItem(registry) {
      return registry.name ? registry.name : registry.component.name
    },
    onRegistryChange(value) {
      if (!this.widget._id) {
        this.$store.commit('updateWidget', {
          ...this.widget,
          registry: value,
          index: this.index,
        })
      } else {
        this.$store.commit('updateWidget', { ...this.widget, registry: value })
      }
    },
    onActionChange(value) {
      if (!this.widget._id) {
        this.$store.commit('updateWidget', {
          ...this.widget,
          action: value,
          index: this.index,
        })
      } else {
        this.$store.commit('updateWidget', { ...this.widget, action: value })
      }
    },
    onTitleChange(value) {
      if (!this.widget._id) {
        this.$store.commit('updateWidget', {
          ...this.widget,
          title: value,
          index: this.index,
        })
      } else {
        this.$store.commit('updateWidget', { ...this.widget, title: value })
      }
    },
    onTriggerChange(value) {
      if (!this.widget._id) {
        this.$store.commit('updateWidget', {
          ...this.widget,
          trigger: value,
          index: this.index,
        })
      } else {
        this.$store.commit('updateWidget', { ...this.widget, trigger: value })
      }
    },
  },
}
</script>
