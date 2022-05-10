export default async function ({ app }) {
  if (!app.$auth.loggedIn) {
    return
  }

  const auth = app.$auth

  const authStrategy = auth.strategy.name
  if (['facebook', 'google', 'linkedin', 'github'].includes(authStrategy)) {
    const token = auth.strategy.token.get().substr(7)
    console.log("We're hitting this!")
    const url = `/auth/signup/${authStrategy}?token=${token}`
    try {
      const data = await app.$axios.$post(url, null)
      console.log(data)
      auth.reset()
      auth.setStrategy('local')
      auth.setUserToken(data.access_token, data.refresh_token)
      auth.setUser(data.user)
      // if (authStrategy !== 'github' && !data.user.workspace) {
      //   console.log('should redirect to workspace page')
      //   app.router.push({
      //     path: '/dashboard/workspace',
      //   })
      // }
    } catch (error) {
      console.error(error)
    }
  }
}
