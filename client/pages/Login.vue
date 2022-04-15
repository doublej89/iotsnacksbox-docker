<template>
  <login @login="afterLogin" />
</template>

<script>
import login from '../components/Auth/Login.vue'

export default {
  components: { login },
  layout: 'empty',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    afterLogin() {
      this.signIn = false
      this.$router.push({
        path: '/dashboard',
      })
    },
  },
}
</script>
