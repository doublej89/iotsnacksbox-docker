<template>
  <v-snackbar v-model="show" app :color="color" centered :timeout="10000">
    {{ message }}
    <v-btn text outlined @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: '',
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notify') {
        this.message = state.notify.content
        this.color = state.notify.color
        this.show = true
      }
    })
  },
}
</script>
