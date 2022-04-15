<template>
  <register @signup="afterSignup" color="transparent" />
</template>
<script>
import register from '../components/Auth/Register.vue'

export default {
  components: { register },
  layout: 'empty',
  data() {
    return {
      checkbox: false,
    }
  },
  computed: {},
  created() {},
  methods: {
    scrollToStem() {
      const element = document.getElementById('signUpSTEM')
      element.scrollIntoView({ behavior: 'smooth' })
    },
    scrollToBusiness() {
      const element = document.getElementById('signUpBusiness')
      element.scrollIntoView({ behavior: 'smooth' })
    },
    afterSignup() {
      this.$router.push({
        path: '/dashboard',
      })
    },
  },
}
</script>
<style lang="scss">
.edication-purpose-section {
  margin: 200px 0 100px 0;
}
.forBusiness-section {
  background-color: #009ddd;
}
.statyInTouch-section {
  margin: 100px 0;
}
</style>
