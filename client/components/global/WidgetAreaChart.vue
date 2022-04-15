<template>
  <vue-resizable
    ref="resize"
    :width="width"
    :height="height"
    class="widget w-areachart"
    @resize:end="endResize"
  >
    <v-card :width="width" :height="height">
      <v-card-title>
        Area Chart
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
          ></Settings>
        </v-dialog>
      </v-card-title>

      <v-card-text style="position: relative">
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
        <v-card :height="height - 100" flat>
          <canvas id="myChart" ref="chart"></canvas>
        </v-card>
        <v-card-text v-if="!showOverlay"> {{ widget.title }}</v-card-text>
      </v-card-text>
    </v-card>
  </vue-resizable>
</template>

<script>
import VueResizable from 'vue-resizable'
import Chart from 'chart.js'
import moment from 'moment'
import Settings from './Settings'
import mixin from './mixin'
import 'chartjs-plugin-zoom'
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
    datasets() {
      const datasets = []
      const levelkey = []
      const chatData = this.triggerData.slice(0, 50)

      chatData.map((d) => {
        for (const key in d.data) {
          // eslint-disable-next-line no-prototype-builtins
          if (d.data.hasOwnProperty(key)) {
            let i = levelkey.indexOf(key)
            if (i === -1) {
              i = levelkey.push(key)
              i--
              datasets[i] = {
                label: key,
                data: [],
              }
            }
            datasets[i].data.push({
              y: d.data[key],
              t: moment.utc(d.createdAt),
            })
          }
        }
      })

      return datasets
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
  watch: {
    'widget.registry'() {
      this.trigger()
    },
  },
  mounted() {
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
  methods: {
    renderChart() {
      const cfg = {
        data: {
          datasets: this.datasets.map((d, i) => {
            d.backgroundColor = this.colors[i]
            d.borderColor = this.colors[i]
            d.type = 'line'
            d.pointRadius = 0
            d.fill = true
            d.lineTension = 0
            d.borderWidth = 1
            return d
          }),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 250 * 1.5,
            easing: 'linear',
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'series',
                offset: true,
                ticks: {
                  major: {
                    enabled: true,
                    fontStyle: 'bold',
                  },
                  source: 'data',
                  autoSkip: true,
                  autoSkipPadding: 75,
                  maxRotation: 0,
                  sampleSize: 100,
                },
                afterBuildTicks(scale, ticks) {
                  if (!ticks) {
                    return
                  }
                  const majorUnit = scale._majorUnit
                  const firstTick = ticks[0]
                  let i, ilen, val, tick, currMajor, lastMajor

                  val = moment(ticks[0].value)
                  if (
                    (majorUnit === 'minute' && val.second() === 0) ||
                    (majorUnit === 'hour' && val.minute() === 0) ||
                    (majorUnit === 'day' && val.hour() === 9) ||
                    (majorUnit === 'month' &&
                      val.date() <= 3 &&
                      val.isoWeekday() === 1) ||
                    (majorUnit === 'year' && val.month() === 0)
                  ) {
                    firstTick.major = true
                  } else {
                    firstTick.major = false
                  }
                  lastMajor = val.get(majorUnit)

                  for (i = 1, ilen = ticks.length; i < ilen; i++) {
                    tick = ticks[i]
                    val = moment(tick.value)
                    currMajor = val.get(majorUnit)
                    tick.major = currMajor !== lastMajor
                    lastMajor = currMajor
                  }
                  return ticks
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                },
                // scaleLabel: {
                //   display: true,
                //   labelString: 'Closing price ($)',
                // },
              },
            ],
          },

          tooltips: {
            intersect: false,
            mode: 'index',
            callbacks: {
              label(tooltipItem, myData) {
                let label =
                  myData.datasets[tooltipItem.datasetIndex].label || ''
                if (label) {
                  label += ': '
                }
                label += parseFloat(tooltipItem.value).toFixed(2)
                return label
              },
            },
          },
          plugins: {
            zoom: {
              // Container for pan options
              pan: {
                // Boolean to enable panning
                enabled: true,

                // Panning directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow panning in the y direction
                mode: 'xy',
              },

              // Container for zoom options
              zoom: {
                // Boolean to enable zooming
                enabled: true,

                // Zooming directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow zooming in the y direction
                mode: 'xy',
              },
            },
          },
        },
      }

      return new Chart(this.$refs.chart, cfg)
    },
    submit(widget) {
      this.storeWidget(widget).then((res) => {
        this.$emit('update', res.data)
        this.dialog = false
      })
    },
    trigger() {
      if (this.loading || typeof this.widget.registry._id === 'undefined') {
        return
      }

      this.loading = true
      const params = {
        registry: this.widget.registry._id,
        trigger: this.widget.trigger,
        limit: 50,
      }
      this.$axios.get('/registries/trigger', { params }).then((res) => {
        this.triggerData = res.data
        this.renderChart()
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
