<template>
  <vue-resizable
    ref="resize"
    class="widget w-switch"
    :width="width"
    :height="height"
    :min-width="200"
    @resize:end="endResize"
  >
    <v-card :width="width" :height="height">
      <v-card-title>
        Switch
        <v-spacer />

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn light icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <Settings
            :widget="widget"
            @submit="submit"
            @close="dialog = false"
            :index="index"
          />
        </v-dialog>
      </v-card-title>

      <v-card-text class="pa-3">
        <v-overlay v-if="showOverlay" :absolute="true">
          <p class="text-h6 pa-3">please Add Action and Trigger from setting</p>
        </v-overlay>

        <v-img
          :src="lightimage"
          :width="width - 150"
          :height="height - 150"
          class="mx-auto"
          contain
        ></v-img>

        <div class="d-flex justify-center">
          <v-switch
            v-model="lightswitch"
            :label="lightlabel"
            hide-details
            :color="lightcolor"
            @change="fireAction"
          ></v-switch>
        </div>
        <v-card-text v-if="!showOverlay" class="text-h6">
          {{ widget.title }}
        </v-card-text>
      </v-card-text>
    </v-card>
  </vue-resizable>
</template>
<script>
import VueResizable from 'vue-resizable'
import Settings from './Settings'
import mixin from './mixin'
export default {
  components: {
    Settings,
    VueResizable,
  },
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
  data: () => ({
    lightswitch: false,
    dialog: false,
  }),
  computed: {
    width() {
      return (this.widget.position && this.widget.position.width) || 300
    },
    height() {
      return (this.widget.position && this.widget.position.height) || 300
    },
    action() {
      return (
        this.widget.registry &&
        this.widget.registry.actions &&
        this.widget.registry.actions.find((a) => a.name === this.widget.action)
      )
    },
    showOverlay() {
      if (!this.widget.registry) {
        return true
      }

      return false
    },
    lightimage() {
      if (this.$vuetify.theme.isDark) {
        if (this.action && this.action.value + '' === '1') {
          return '/images/icons/dark/switch-on.svg'
        } else {
          return '/images/icons/dark/switch-off.svg'
        }
      } else if (this.action && this.action.value + '' === '1') {
        return '/images/icons/light/switch-on.svg'
      } else {
        return '/images/icons/light/switch-off.svg'
      }
    },
    lightlabel() {
      return this.action && this.action.value + '' === '1'
        ? 'Active'
        : 'Inactive'
    },
    lightcolor() {
      return this.action && this.action.value + '' === '1' ? 'success' : 'error'
    },
  },
  watch: {
    widget: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        this.lightswitch = this.action && Boolean(parseInt(this.action.value))
      },
    },
  },
  created() {
    if (this.widget.registry) {
      this.$nuxtSocket({}).on(
        `${this.widget.registry._id}.${this.widget.action}`,
        (registry) => {
          const widget = Object.assign({}, this.widget)
          widget.registry = registry
          this.$emit('update', widget)
          // this.$store.commit('updateWidget', widget)
        }
      )
    }
  },
  mounted() {
    if (this.action) {
      this.lightswitch = Boolean(parseInt(this.action.value))
    }
  },
  methods: {
    submit(widget) {
      this.storeWidget(widget).then((res) => {
        this.$emit('update', res.data)
        // this.$store.commit('updateWidget', res.data)
        this.dialog = false
      })
    },
    fireAction() {
      const params = {
        registry:
          typeof this.widget.registry === 'object'
            ? this.widget.registry._id
            : this.widget.registry,
        action: this.widget.action,
        value: Number(this.lightswitch),
      }
      this.$axios
        .post('/registries/action', params)
        .then((res) => {
          const widget = Object.assign({}, this.widget)
          widget.registry = res.data
          console.log(widget)
          this.$emit('update', widget)
          // this.$store.commit('updateWidget', widget)
        })
        .catch((error) => this.$notify.error(error.response.data.message))
    },
    endResize(pos, widget) {
      this.$refs.resize.l = 0
      delete pos.eventName

      if (this.widget._id) {
        this.widget.position = pos
        this.storeWidget(this.widget).then((res) => {
          this.$emit('update', res.data)
          // this.$store.commit('updateWidget', res.data)
        })
      }
    },
  },
}
</script>
<style lang="scss">
.w-switch {
  .v-card__text {
    text-align: center;
  }
}
</style>
