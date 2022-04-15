<template>
  <vue-resizable
    ref="resize"
    class="widget w-pichart"
    :width="width"
    :height="height"
    @resize:end="endResize"
  >
    <v-card :width="width" :height="height">
      <v-card-title>
        Field
        <v-spacer />

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn light icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <Settings :widget="widget" @submit="submit" @close="dialog = false">
            <v-select
              v-model="fieldname"
              :items="fieldnames"
              label="Field Name"
              required
            ></v-select>
          </Settings>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <v-overlay v-if="showOverlay" :absolute="true">
          <p v-if="!widget.registry" class="text-h6 pa-3">
            please Add Action and Trigger from setting
          </p>
          <p v-else-if="!triggerData.length" class="text-h6 pa-3">
            Data not found
          </p>
          <v-progress-circular
            v-else-if="loading"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-overlay>

        <v-card flat style="position: relative">
          <v-card-text>
            <span class="d-block">{{ fieldname }}</span>
            <h3 class="text-h3">{{ currnet }}</h3>
          </v-card-text>

          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" sm="4" style="border-right: 1px solid #ddd">
                <span class="d-block"> Min </span> {{ min }}
              </v-col>

              <v-col cols="12" sm="4" style="border-right: 1px solid #ddd">
                <span class="d-block"> Max </span> {{ max }}
              </v-col>

              <v-col cols="12" sm="4">
                <span class="d-block"> Avg </span> {{ avg }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card-text>{{ widget.title }}</v-card-text>
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
  },
  data: () => ({
    loading: false,
    dialog: false,

    triggerData: [],
    fieldname: '',
    currnet: 0,
    min: 0,
    max: 0,
    avg: 0,
  }),
  computed: {
    width() {
      return this.widget.position && this.widget.position.width
    },
    height() {
      return this.widget.position && this.widget.position.height
    },
    showOverlay() {
      if (!this.widget.registry) {
        return true
      }
      if (!this.triggerData.length) {
        return true
      }
      if (this.loading) {
        return true
      }
      return false
    },
    fieldnames() {
      return this.triggerData.length && Object.keys(this.triggerData[0].data)
    },
  },
  watch: {
    fieldname() {
      this.caltulateData()
    },
  },
  created() {
    if (typeof this.widget.registry === 'undefined') {
      return
    }
    this.trigger()
    this.$nuxtSocket({}).on(
      `${this.widget.registry._id}.${this.widget.trigger}`,
      (registry) => {
        this.triggerData.unshift(registry)
        this.caltulateData()
      }
    )
  },
  mounted() {
    this.fieldname = this.widget.settings && this.widget.settings.fieldname
  },
  methods: {
    caltulateData() {
      if (!this.fieldname || !this.triggerData.length) {
        return
      }
      this.currnet = this.triggerData[0].data[this.fieldname] || 0
      let min = 999999999999
      let max = 0
      let sum = 0

      this.triggerData.forEach((d) => {
        if (d.data[this.fieldname]) {
          sum += parseInt(d.data[this.fieldname], 10)

          if (d.data[this.fieldname] > max) {
            max = d.data[this.fieldname]
          }
          if (d.data[this.fieldname] < min) {
            min = d.data[this.fieldname]
          }
        }
      })

      this.min = min
      this.max = max
      this.avg = (sum / this.triggerData.length).toFixed(2)
    },
    submit(widget) {
      widget.settings = Object.assign({}, widget.settings, {
        fieldname: this.fieldname,
      })
      this.storeWidget(widget).then((res) => {
        this.$emit('update', res.data)
        this.dialog = false
      })
    },
    trigger() {
      if (this.loading) {
        return
      }

      this.loading = true
      const params = {
        registry: this.widget.registry._id,
        trigger: this.widget.trigger,
      }
      this.$axios.get('/registries/trigger', { params }).then((res) => {
        this.triggerData = res.data
        this.caltulateData()
        this.loading = false
      })
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
