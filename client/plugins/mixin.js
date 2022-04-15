import Vue from 'vue'
import moment from 'moment'

Vue.mixin({
  filters: {
    currency(value) {
      if (!value) return ''
      return new Intl.NumberFormat('bd', {
        style: 'currency',
        currency: 'TK',
        minimumFractionDigits: 0,
      }).format(value)
    },
  },
  data() {
    return {
      screenHeight: 0,
    }
  },
  mounted() {
    this.screenHeight = window.innerHeight
    window.onresize = () => {
      this.screenHeight = window.innerHeight
    }
  },
  methods: {
    required(v) {
      return !!v || 'filed is required'
    },

    momentDate(date) {
      const m = moment(moment.utc(date).toDate())
      if (m.isValid()) {
        return m.format('MMM DD YYYY')
      }
    },
    momentTime(date) {
      const m = moment(moment.utc(date).toDate())
      if (m.isValid()) {
        return m.format('MMM DD YYYY HH:mm:ss')
      }
    },
    fromNow(date) {
      const m = moment(moment.utc(date).toDate())
      if (m.isValid()) {
        return m.fromNow()
      }
      return false
    },
    isFuture(date) {
      const m = moment.utc(date)
      if (m.isValid()) {
        return moment.utc().diff(m) < 0
      }
      return false
    },
    isExpired(date) {
      const m = moment.utc(date)
      if (m.isValid()) {
        return moment.utc().diff(m) > 0
      }
      return false
    },
    getUTC(date) {
      return moment(date).utc().format('YYYY-MM-DD HH:mm:ss')
    },
    slugify(string) {
      const a =
        'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż/_,:;'
      const b =
        'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz-----'
      const p = new RegExp(a.split('').join('|'), 'g')

      return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    },
    getUrlParam(key) {
      const currentURL = window.location.href
      const urlObject = currentURL.split('?')
      if (urlObject.length > 1) {
        if (typeof key === 'undefined') {
          return urlObject[1]
        }
        urlObject[1] = '&' + urlObject[1]
        const start = urlObject[1].search(new RegExp(`&${key}=`))
        if (start === -1) {
          return
        }
        let end = urlObject[1].indexOf('&', start + 1)
        if (end === -1) {
          end = undefined
        }
        const value = urlObject[1].slice(start, end).split('=')[1]
        return value && decodeURIComponent(value)
      }
    },
    generateUrlParam(param, value, urlObject) {
      urlObject = urlObject || ''
      urlObject = urlObject.indexOf('?') === 0 ? urlObject.slice(1) : urlObject
      let newQueryString = ''
      value = encodeURIComponent(value)

      if (urlObject.length > 1) {
        const queries = urlObject.split('&')

        let updatedExistingParam = false
        for (let i = 0; i < queries.length; i++) {
          const queryItem = queries[i].split('=')

          if (queryItem.length > 1) {
            if (queryItem[0] === param) {
              newQueryString += queryItem[0] + '=' + value + '&'
              updatedExistingParam = true
            } else if (queryItem[1]) {
              newQueryString += queryItem[0] + '=' + queryItem[1] + '&'
            }
          }
        }
        if (!updatedExistingParam) {
          newQueryString += param + '=' + value + '&'
        }
      } else {
        newQueryString += param + '=' + value + '&'
      }
      return `?${newQueryString.slice(0, -1)}`
    },
    changeUrlParam(param, value) {
      const currentURL = window.location.href
      const urlObject = currentURL.split('?')
      const newQueryString = this.generateUrlParam(param, value, urlObject[1])
      window.history.replaceState('', '', urlObject[0] + newQueryString)
    },
    removeUrlParam(key) {
      if (typeof key === 'undefined') return
      const currentURL = window.location.href
      const urlObject = currentURL.split('?')

      if (urlObject.length > 1) {
        let start = urlObject[1].indexOf(`${key}=`)
        if (start === -1) {
          return
        }
        let end = urlObject[1].indexOf('&', start)
        if (end === -1) {
          end = undefined
          start = start - 1
        } else {
          end = end + 1
        }
        urlObject[1] = urlObject[1].replace(urlObject[1].slice(start, end), '')
      }

      window.history.replaceState('', '', urlObject.join('?'))
    },
    saveStorage(name, data) {
      window.localStorage.setItem(name, JSON.stringify(data))
    },

    getStorage(name) {
      if (process.client) {
        return JSON.parse(window.localStorage.getItem(name))
      }
    },

    removeStorage(name) {
      if (process.client) {
        window.localStorage.removeItem(name)
      }
    },
    saveSessionStorage(name, data) {
      window.sessionStorage.setItem(name, JSON.stringify(data))
    },

    getSessionStorage(name) {
      if (process.client) {
        return JSON.parse(window.sessionStorage.getItem(name))
      }
    },

    removeSessionStorage(name) {
      if (process.client) {
        window.sessionStorage.removeItem(name)
      }
    },
    async cropFile(id, sizes = []) {
      const params = {
        id,
        crop_scope: sizes,
      }

      return await this.$store.dispatch('files/cropeFile', params)
    },
    getUserPayload(user, properties = []) {
      if (!(user && Object.keys(user).length)) {
        return null
      }
      properties = Array.isArray(properties) ? properties : []

      properties = properties.concat(['id', 'full_name', 'email', 'avatar'])

      const u = {}

      properties.forEach((e) => {
        if (Object.prototype.hasOwnProperty.call(user, e)) {
          u[e] = user[e]
        }
      })

      return u
    },
    getPropertyPayload(property, properties = []) {
      if (!(property && Object.keys(property).length)) {
        return null
      }

      properties = Array.isArray(properties) ? properties : []

      properties = properties.concat([
        'id',
        'title',
        'price',
        'slug',
        'thumbnail',
        'address',
        'bathroom',
        'bedroom',
      ])

      const u = {}

      properties.forEach((e) => {
        if (Object.prototype.hasOwnProperty.call(property, e)) {
          u[e] = property[e]
        }
      })

      return u
    },
  },
})
