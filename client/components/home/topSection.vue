<template>
  <section
    class="position-relative ptb-100 min-vh-100 flex-column d-flex justify-content-center"
  >
    <img
      class="fit-cover w-100 h-100 position-absolute z--1"
      src="/images/background.png"
    />
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-2 col-lg-2"></div>
        <div class="col-md-8 col-lg-8">
          <div
            class="hero-content-left text-left text-md-center text-white pb-2"
          >
            <h1>
              Snacks for your
              <span
                ref="txtRotate"
                class="txt-rotate"
                data-period="2000"
                data-rotate='[ "Factory", "Home", "Garments", "Machines" ]'
              >
              </span>
            </h1>
          </div>
          <h4 class="text-left text-md-center text-white">
            To being Smart & Productive
          </h4>
        </div>
        <div class="col-md-2 col-lg-2"></div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  mounted() {
    const element = this.$refs.txtRotate
    const toRotate = element.getAttribute('data-rotate')
    const period = element.getAttribute('data-period')
    if (toRotate) {
      const self = this
      this.textRotate(element, JSON.parse(toRotate), period, self)
    }

    // INJECT CSS
    const css = document.createElement('style')
    css.type = 'text/css'
    css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #fff }'
    document.body.appendChild(css)
  },
  data: () => ({
    toRotate: [],
    el: null,
    loopNum: 0,
    period: 2000,
    txt: '',
    isDeleting: false,
  }),
  methods: {
    tick() {
      const i = this.loopNum % this.toRotate.length
      const fullTxt = this.toRotate[i]

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

      const that = this
      let delta = 300 - Math.random() * 100

      if (this.isDeleting) {
        delta /= 2
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period
        this.isDeleting = true
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false
        this.loopNum++
        delta = 500
      }

      setTimeout(function () {
        that.tick()
      }, delta)
    },
    textRotate(el, toRotate, period) {
      this.toRotate = toRotate
      this.el = el
      this.loopNum = 0
      this.period = parseInt(period, 10) || 2000
      this.txt = ''
      this.tick()
      this.isDeleting = false
    },
  },
}
</script>
