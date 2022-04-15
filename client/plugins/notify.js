export default ({ app, store }, inject) => {
  inject('notify', {
    success(content = '', color = 'success') {
      store.commit('notify', { content, color })
    },
    error(content = '', color = 'error') {
      store.commit('notify', { content, color })
    },
    warning(content = '', color = 'warning') {
      store.commit('notify', { content, color })
    },
    info(content = '', color = 'info') {
      store.commit('notify', { content, color })
    },
  })
}
