<template>
  <v-dialog v-model="display" :width="dialogWidth">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-bind="$attrs"
        :disabled="disabled"
        :loading="loading"
        :label="label"
        :value="selectedDatetime"
        readonly
        v-on="on"
      >
        <template v-slot:progress>
          <slot name="progress">
            <v-progress-linear
              color="primary"
              indeterminate
              absolute
              height="2"
            ></v-progress-linear>
          </slot>
        </template>
      </v-text-field>
    </template>

    <v-card>
      <v-card-text class="px-0 py-0">
        <v-tabs v-model="activeTab" fixed-tabs>
          <v-tab key="calendar" :disabled="timeOnly">
            <slot name="dateIcon">
              <v-icon>mdi-calendar</v-icon>
            </slot>
          </v-tab>
          <v-tab key="timer" :disabled="dateOnly">
            <slot name="timeIcon">
              <v-icon>mdi-calendar-clock</v-icon>
            </slot>
          </v-tab>
          <v-tab-item key="calendar" :disabled="timeOnly">
            <v-date-picker
              v-model="date"
              v-bind="datePickerProps"
              full-width
              @input="showTimePicker"
            ></v-date-picker>
          </v-tab-item>
          <v-tab-item key="timer" :disabled="dateOnly">
            <v-time-picker
              ref="timer"
              v-model="time"
              class="v-time-picker-custom"
              v-bind="timePickerProps"
              full-width
            ></v-time-picker>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions" :parent="this">
          <v-btn color="grey lighten-1" text @click.native="clearHandler">
            {{ clearText }}
          </v-btn>
          <v-btn color="green darken-1" text @click="okHandler">
            {{ okText }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
const DEFAULT_DIALOG_WIDTH = 340
const DEFAULT_CLEAR_TEXT = 'CLEAR'
const DEFAULT_OK_TEXT = 'OK'
const DEFAULT_DATE = moment(new Date()).format(DEFAULT_DATE_FORMAT)
const DEFAULT_TIME = '00:00:00'
export default {
  name: 'VDatetimePicker',
  model: {
    prop: 'datetime',
    event: 'input',
  },
  props: {
    datetime: {
      type: [Date, String],
      default: null,
    },
    disabled: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    label: {
      type: String,
      default: '',
    },
    dialogWidth: {
      type: Number,
      default: DEFAULT_DIALOG_WIDTH,
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT,
    },
    timeFormat: {
      type: String,
      default: 'HH:mm',
    },
    clearText: {
      type: String,
      default: DEFAULT_CLEAR_TEXT,
    },
    okText: {
      type: String,
      default: DEFAULT_OK_TEXT,
    },
    textFieldProps: {
      type: Object,
      default: () => {},
    },
    datePickerProps: {
      type: Object,
      default: () => {},
    },
    timePickerProps: {
      type: Object,
      default: () => {},
    },
    dateOnly: {
      type: Boolean,
      default: false,
    },
    timeOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      display: false,
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME,
    }
  },
  computed: {
    dateTimeFormat() {
      return this.dateFormat + ' ' + this.timeFormat
    },
    defaultDateTimeFormat() {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    selectedDatetime() {
      let datetimeString = this.date + ' ' + this.time
      if (this.time.length === 5) {
        datetimeString += ':00'
      }

      if (this.date && this.time && !this.isDateOrTimeSelector) {
        return moment(new Date(datetimeString)).format(
          this.defaultDateTimeFormat
        )
      } else if (this.dateOnly && this.date) {
        return moment(new Date(datetimeString)).format(DEFAULT_DATE_FORMAT)
      } else if (this.timeOnly && this.time) {
        return moment(new Date(datetimeString)).format(DEFAULT_TIME_FORMAT)
      }

      return ''
    },
    isDateOrTimeSelector() {
      return this.dateOnly || this.timeOnly
    },
  },
  watch: {
    datetime() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let initDateTime = moment()
      if (this.datetime instanceof Date) {
        initDateTime = moment(new Date(this.datetime))
      } else if (
        typeof this.datetime === 'string' ||
        this.datetime instanceof String
      ) {
        if (this.timeOnly) {
          initDateTime = moment(new Date(this.date + ' ' + this.datetime))
        } else {
          initDateTime = moment(new Date(this.datetime))
        }
      }

      this.date = initDateTime.format(DEFAULT_DATE_FORMAT)
      this.time = initDateTime.format(DEFAULT_TIME_FORMAT)

      if (this.timeOnly) {
        this.activeTab = 1
      }
    },
    okHandler() {
      this.resetPicker()
      this.$emit('input', this.selectedDatetime)
    },
    clearHandler() {
      this.resetPicker()
      this.date = DEFAULT_DATE
      this.time = DEFAULT_TIME
      this.$emit('input', null)
    },
    resetPicker() {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true
      }
    },
    showTimePicker() {
      if (this.dateOnly) {
        return
      }
      this.activeTab = 1
    },
  },
}
</script>
