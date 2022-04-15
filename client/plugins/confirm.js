export default ({ app, store }, inject) => {
  let cresolve, creject
  inject('confirm', {
    open(title, message, color = 'primary') {
      store.commit('confirm', {
        title,
        message,
        color,
        open: true,
        state: color,
      })
      return new Promise((resolve, reject) => {
        cresolve = resolve
        creject = reject
      })
    },
    delete() {
      return this.open(
        'Delete',
        'Are you sure? Want to delete the Item?',
        'error'
      )
    },
    warn(message) {
      return this.open('Warning', message, 'warning')
    },
    resolve() {
      store.commit('confirm', { state: 'loading' })
      cresolve(true)
    },
    reject() {
      store.commit('confirm', { state: 'reject' })
      creject(false)
      setTimeout(() => {
        store.commit('confirm', { open: false })
      }, 500)
    },
    state(state) {
      store.commit('confirm', { state })
      setTimeout(() => {
        store.commit('confirm', { open: false })
      }, 500)
    },
  })
}
