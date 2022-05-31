<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mx-auto">
        <div class="text-center">
          <h2 style="padding-top: 30px">Validating...</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'empty',
  // data() {
  //   return {
  //     loading: true,
  //   }
  // },
  async asyncData({ query, $axios, redirect }) {
    try {
      const response = await $axios.post('/varify-token', {
        token: query.token,
      })
      if (response.data.redirect) {
        redirect(`/${response.data.redirect}?token=${query.token}`)
      }
    } catch (error) {
      redirect('/')
    }
  },
}
</script>
