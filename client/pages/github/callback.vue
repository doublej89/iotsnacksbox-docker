<template>
  <h1>Github callback page</h1>
</template>
<script>
export default {
  layout: 'empty',
  // data() {
  //   return {
  //     loading: true,
  //   }
  // },
  async asyncData({ query, $axios, redirect, $auth }) {
    try {
      const response = await $axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: '08a183cfde3b1e48f16e',
          client_secret: 'b8ae11cae6d736469087e6eef2902ceb4088e21a',
          code: query.code,
        },
        { headers: { Accept: 'application/json' } }
      )

      const url = `/auth/signup/github?token=${response.data.access_token}`

      const data = await $axios.post(url, null)
      console.log(data)
      $auth.reset()
      $auth.setStrategy('local')
      $auth.setUserToken(data.access_token, data.refresh_token)
      $auth.setUser(data.user)

      if (!data.user.workspace) {
        console.log('should redirect to workspace page')
        redirect('/dashboard/workspace')
      } else {
        redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
