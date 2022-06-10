// import Vue from 'vue'
export const state = () => ({
  components: [],
  registries: [],
  widgets: [],
  notify: {},
  confirm: {
    title: 'Confirm',
    message: 'Are you sure?',
    color: 'primary',
    open: false,
    state: 'confirm',
  },
  worksapceInvitationDialog: false,
  storageAllocationDialog: false,
})

export const getters = {
  getWorkspaceInvitationDialog(state) {
    return state.worksapceInvitationDialog
  },
  getStorageAllocationDialog(state) {
    return state.storageAllocationDialog
  }
}

export const mutations = {
  notify(state, payload) {
    state.notify = payload
  },
  confirm(state, payload) {
    state.confirm = Object.assign(state.confirm, payload)
  },
  setComponents(state, payload) {
    state.components = payload
  },
  addComponent(state, payload) {
    state.components.push(payload)
  },
  updateComponent(state, payload) {
    const components = state.components.map((com) => {
      if (com._id === payload._id) return { ...payload }
      return com
    })
    state.components = components
  },
  deleteComponent(state, id) {
    const i = state.components.findIndex((u) => u._id === id)
    if (i !== -1) {
      state.components.splice(i, 1)
    }
  },
  setRegistries(state, payload) {
    state.registries = payload
  },
  setWidgets(state, payload) {
    state.widgets = payload
  },
  addWidget(state, payload) {
    state.widgets.push(payload)
  },
  updateWidget(state, payload) {
    const widgets = state.widgets.map((w) => {
      if (w._id === payload._id) return { ...payload }
      return w
    })
    state.widgets = widgets
  },
  deleteWidget(state, payload) {
    const i = state.widgets.findIndex((w) => w._id === payload)
    if (i !== -1) {
      state.widgets.splice(i, 1)
    }
  },
  deleteRegistryComponent(state, payload) {
    const id = state.registries.findIndex((r) => r._id === payload)
    state.registries.splice(id, 1)
  },
  addRegistries(state, payload) {
    state.registries.push(payload.registry)
  },
  updateRegistry(state, payload) {
    const { registry } = payload
    const registries = state.registries.map((reg) => {
      if (reg._id === registry._id) return registry
      return reg
    })
    state.registries = registries
  },
  setWorkspaceInvitationDialog(state, payload) {
    state.worksapceInvitationDialog = payload
  },
  setStorageAllocationDialog(state, payload) {
    state.storageAllocationDialog = payload
  },
}

export const actions = {
  getSelfComponents({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/components/self')
        .then((res) => {
          commit('setComponents', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  getComponents({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/components')
        .then((res) => {
          commit('setComponents', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  addComponent({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/components', params)
        .then((res) => {
          commit('addComponent', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  updateComponent({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/components/${params._id}`, params)
        .then((res) => {
          commit('updateComponent', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  activeComponent({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/components/${params._id}/active`, params)
        .then((res) => {
          commit('updateComponent', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  deleteComponent({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/components/${id}`)
        .then((res) => {
          commit('deleteComponent', id)

          resolve(true)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },

  getRegistries({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/registries')
        .then((res) => {
          commit('setRegistries', res.data.registries)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  getWidgets({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/widgets')
        .then((res) => {
          commit('setWidgets', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  deleteWidget({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/widgets/${id}`)
        .then((res) => {
          commit('deleteWidget', id)
          resolve(true)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  deleteRegistryComponent({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/registries/${id}`)
        .then((res) => {
          commit('deleteRegistryComponent', id)
          resolve(true)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  addRegistries({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/registries', {
          component_id: params._id,
          name: params.name,
        })
        .then((res) => {
          commit('addRegistries', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  updateRegistry({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/registries/${params._id}`, { name: params.name })
        .then((res) => {
          commit('updateRegistry', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
}
