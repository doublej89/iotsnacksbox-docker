import Vue from 'vue'
import Confirm from '@/components/global/Confirm.vue'
import Loading from '@/components/global/Loading.vue'
import VDatetimePicker from '@/components/global/VDatetimePicker.vue'

const components = {
  Confirm,
  Loading,
  VDatetimePicker,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
