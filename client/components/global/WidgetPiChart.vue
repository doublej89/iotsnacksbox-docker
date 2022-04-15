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
        Pichart
        <v-spacer />

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn light icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <Settings :widget="widget" @submit="submit" @close="dialog = false">
            <v-select
              v-model="oparation"
              :items="['Updated', 'Summation']"
              label="Oparation"
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

        <v-card flat style="position: relative" :height="height - 100">
          <canvas id="myChart" ref="chart"></canvas>
        </v-card>
        <v-card-text>{{ widget.title }}</v-card-text>
      </v-card-text>
    </v-card>
  </vue-resizable>
</template>

<script>
import VueResizable from 'vue-resizable'
import Chart from 'chart.js'
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
    lightswitch: false,
    dialog: false,
    oparation: '',
    daterangeMenu: false,
    triggerData: [],
  }),
  computed: {
    width() {
      return this.widget.position && this.widget.position.width
    },
    height() {
      return this.widget.position && this.widget.position.height
    },
    oparationUpdated() {
      return this.triggerData.length && this.triggerData[0].data
    },
    oparationSum() {
      return (
        this.triggerData.length &&
        this.triggerData.reduce((accumulator, current) => {
          Object.keys(current.data).map((k) => {
            accumulator[k] = (accumulator[k] || 0) + current.data[k]
          })
          return accumulator
        }, {})
      )
    },
    chartLavel() {
      return Object.keys(
        this.oparation === 'Summation'
          ? this.oparationSum
          : this.oparationUpdated
      ).map((k) => k.replace(/\b\S/g, (t) => t.toUpperCase()))
    },
    chartData() {
      return Object.values(
        this.oparation === 'Summation'
          ? this.oparationSum
          : this.oparationUpdated
      )
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
        this.renderChart()
      }
    )
  },
  mounted() {
    this.oparation = this.widget.settings && this.widget.settings.oparation
  },
  methods: {
    renderChart() {
      return new Chart(this.$refs.chart, {
        type: 'pie',
        data: {
          datasets: [
            {
              data: this.chartData,
              backgroundColor: this.colors.slice(0, this.chartData.length),
            },
          ],
          labels: this.chartLavel,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      })
    },
    submit(widget) {
      widget.settings = Object.assign({}, widget.settings, {
        oparation: this.oparation,
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
        this.loading = false
        this.renderChart()
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
