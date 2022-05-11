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
  fetch({ redirect, $auth }) {
    if ($auth.loggedIn) {
      if (!$auth.user.workspace) {
        redirect('/dashboard/workspace')
      } else {
        redirect('/dashboard')
      }
    }
  },
}
</script>
