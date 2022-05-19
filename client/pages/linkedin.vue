<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mx-auto p-4">
        <div class="text-center">
          <div
            class="spinner-border"
            style="width: 8rem; height: 8rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {}
  },
  computed: {},
  created() {
    const { code, state } = this.$route.query
    console.log(`code: ${code}, state: ${state}`)
  },
  methods: {},
}
</script>
