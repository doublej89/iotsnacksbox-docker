<template>
  <v-responsive>
    <v-tabs
      show-arrows
      optional
      centered
      height="auto"
      hide-slider
      background-color="transparent"
      class="draggable-card"
    >
      <draggable
        class="row justify-center pa-3"
        :list="existsWidgets"
        :group="{ name: 'widget', pull: 'clone', put: false }"
        :clone="cloneWidget"
        :sort="false"
      >
        <v-tab
          v-for="widget in existsWidgets"
          :key="widget.name"
          class="d-flex justify-center px-0"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-card
                class="text-center widget-item pa-4"
                :class="widget.name"
                width="72"
                height="72"
                v-bind="attrs"
                v-on="on"
              >
                <v-img :src="widget.icon"></v-img>
              </v-card>
            </template>
            <span>{{ widget.title }}</span>
          </v-tooltip>
        </v-tab>
      </draggable>
    </v-tabs>
    <v-row
      v-if="loading"
      class="load fill-height justify-center text-center pt-16"
    >
      <v-col cols="12">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          class="loading"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <draggable
          :list="widgets"
          group="widget"
          ghost-class="ghost"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
        >
          <transition-group name="list" tag="div" class="widget-view">
            <template v-for="(widget, i) in widgets">
              <component
                :is="`${widget.name}`"
                :key="`${i}-${widget.order}`"
                :widget="widget"
                :index="i"
                @update="updateWidget(i, $event)"
              ></component>
            </template>
          </transition-group>
        </draggable>
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  layout: 'dashboard',
  components: {
    draggable,
  },
  data: () => ({
    loading: false,
    drawer: null,
    dragging: false,
    widgets: [],
    existsWidgets: [
      {
        name: 'WidgetPiChart',
        title: 'PiChart',
        icon: '/images/icons/light/pichart.svg',
        order: 0,
        widgetType: 'trigger',
        position: {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
        },
      },
      {
        name: 'WidgetSwitch',
        title: 'Switch',
        icon: '/images/icons/light/switch.svg',
        order: 0,
        widgetType: 'action',
        position: {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
        },
      },
      {
        name: 'WidgetBarChart',
        title: 'BarChart',
        icon: '/images/icons/light/barchart.svg',
        order: 0,
        widgetType: 'trigger',
        position: {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
        },
      },
      {
        name: 'WidgetAreaChart',
        title: 'AreaChart',
        icon: '/images/icons/light/areachart.svg',
        order: 0,
        widgetType: 'trigger',
        position: {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
        },
      },
      {
        name: 'WidgetField',
        title: 'Field Value',
        icon: '/images/icons/light/areachart.svg',
        order: 0,
        widgetType: 'trigger',
        position: {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
        },
      },
      {
        name: 'WidgetLineChart',
        title: 'LineChart',
        icon: '/images/icons/light/linechart.svg',
        order: 0,
        widgetType: 'trigger',
        position: {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
        },
      },
      {
        name: 'WidgetSelect',
        title: 'Select',
        icon: '/images/icons/light/select.svg',
        order: 0,
        widgetType: 'action',
        position: {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
        },
      },
    ],
  }),
  // computed: {
  //   widgets() {
  //     return this.$store.state.widgets
  //   },
  // },
  created() {
    this.getWidgets()
    this.$nuxt.$on('widgetDelete', (id) => {
      const i = this.widgets.findIndex((w) => w._id === id)
      if (i !== -1) {
        this.widgets.splice(i, 1)
      }
    })
  },
  methods: {
    getWidgets() {
      this.loading = true
      this.$axios
        .get('/widgets')
        .then((res) => {
          this.widgets = [...res.data]
          this.loading = false
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
    updateWidget(i, widget) {
      if (!widget._id) {
        this.$set(this.widgets, i, widget)
      } else {
        const idIndex = this.widgets.findIndex((w) => w._id === widget._id)
        if (idIndex !== -1) {
          this.$set(this.widgets, idIndex, widget)
        }
      }
      //   this.$forceUpdate()
    },

    cloneWidget(widget) {
      return { ...widget, position: { ...widget.position } }
    },
    checkMove() {
      // TODO
    },
  },
}
</script>

<style scoped lang="scss">
.container--fluid {
  max-width: 100%;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1785px;
  }
}
@media (min-width: 1264px) {
  .container {
    max-width: 1185px;
  }
}
@media (min-width: 960px) {
  .container {
    max-width: 900px;
  }
}
.container {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
</style>
