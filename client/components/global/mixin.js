export default {
  data: () => ({
    registries: [],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],

    colors: [
      '#4dc9f6',
      '#f67019',
      '#f53794',
      '#537bc4',
      '#acc236',
      '#166a8f',
      '#00a950',
      '#58595b',
      '#8549ba',
    ],
  }),
  methods: {
    getRegistries() {
      this.$axios.get('/registries').then((res) => {
        this.registries = res.data.registries
      })
    },
    storeWidget(params) {
      return this.$axios.post('/widgets', params)
    },
  },
}
