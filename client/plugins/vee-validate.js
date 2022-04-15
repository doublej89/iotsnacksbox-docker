import { extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

extend('min', {
  ...min,
  message: '{_field_} should be at least {length} characters',
})

extend('noSpecialCharOrSpace', (value) => {
  if (!/[^a-zA-Z0-9]/gm.test(value)) return true
  return 'Cannot contain space or special character'
})

extend('passwordConfirmation', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match',
})

extend('uniqWorkspace', {
  validate: async (value) => {
    if (value && value.length >= 3 && !/[^a-zA-Z0-9]/gm.test(value)) {
      try {
        const response = await window.$nuxt.$axios.post(
          'auth/workspace-exists',
          {
            workspace: value,
          }
        )
        if (response.data.unique) {
          return true
        }
      } catch (error) {
        if (error.response.data.errors[0].param === 'workspace') {
          return false
        }
        return true
      }
    }
    return true
  },
  message: `The workspace is already taken`,
})

extend('uniqueEmail', {
  validate: async (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (value && pattern.test(value)) {
      try {
        const response = await window.$nuxt.$axios.post('auth/email-exists', {
          email: value,
        })
        if (response.data.unique) {
          return true
        }
      } catch (error) {
        if (
          error.response.data.errors[0].param === 'email' &&
          error.response.data.errors[0].msg === 'E-mail already in use'
        ) {
          return false
        }
        return true
      }
    }
    return true
  },
  message: `The email address is already taken`,
})
