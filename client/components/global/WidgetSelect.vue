<template>
  <vue-resizable
    ref="resize"
    class="widget w-select"
    :width="width"
    :height="height"
    @resize:end="endResize"
  >
    <v-card :width="width" :height="height">
      <v-card-title>
        Select
        <v-spacer />

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn light icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <Settings :widget="widget" @submit="submit" @close="dialog = false">
            <v-select
              v-model="apparence"
              :items="['Select', 'Button', 'CheckBox', 'Radio']"
              label="Apparence"
              required
            ></v-select>
          </Settings>
        </v-dialog>
      </v-card-title>

      <v-card-text>
        <v-overlay v-if="showOverlay" :absolute="true">
          <p class="text-h6 pa-3">please Add Action and Trigger from setting</p>
        </v-overlay>
        <v-list v-if="apparence === 'Select' && action && action.values.length">
          <v-list-item-group v-model="selectList" color="primary">
            <v-list-item
              v-for="(item, i) in action.values"
              :key="i"
              :value="item"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div v-if="apparence === 'Radio' && action && action.values.length">
          <v-radio-group v-model="selectList">
            <v-radio
              v-for="(item, i) in action.values"
              :key="i"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </div>
        <div v-if="apparence === 'CheckBox' && action && action.values.length">
          <v-checkbox
            v-for="(item, i) in action.values"
            :key="i"
            v-model="selectList"
            :label="item"
            :value="item"
            hide-details
          ></v-checkbox>
        </div>
        <div v-if="apparence === 'Button' && action && action.values.length">
          <div
            v-for="(item, i) in action.values"
            :key="i"
            :label="item"
            :value="item"
            class="pa-1"
          >
            <v-btn color="primary" class="pa-2">{{ item }}</v-btn>
          </div>
        </div>
        <v-card-text v-if="!showOverlay"> {{ widget.title }}</v-card-text>
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
      item: 1,
    },
  },
  data: () => ({
    selectList: '',
    dialog: false,
    apparence: '',
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
  },
  watch: {
    selectList(val) {
      if (val !== this.action.value) {
        this.fireAction()
      }
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
        }
      )
    }
  },
  mounted() {
    if (this.action) {
      this.selectList = this.action.value
    }
    this.apparence = this.widget.settings && this.widget.settings.apparence
  },
  methods: {
    submit(widget) {
      widget.settings = Object.assign({}, widget.settings, {
        apparence: this.apparence,
      })
      this.storeWidget(widget).then((res) => {
        this.$emit('update', res.data)
        this.dialog = false
      })
    },
    fireAction() {
      const params = {
        registry: this.widget.registry._id,
        action: this.widget.action,
        value: this.selectList,
      }

      this.$axios.post('/registries/action', params).then((res) => {})
    },
    endResize(pos, widget) {
      this.$refs.resize.l = 0
      delete pos.eventName
      if (this.widget._id) {
        this.widget.position = pos
        this.storeWidget(this.widget).then((res) => {
          this.$emit('update', res.data)
        })
      }
    },
  },
}
</script>
