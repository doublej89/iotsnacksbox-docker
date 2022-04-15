<template>
  <div class="container-fluid" style="background-color: #439ad5">
    <div class="container">
      <div class="row py-5">
        <div class="col-md-6 col-7 text-white">
          <h3>Like to know about our product and offers?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt
          </p>
        </div>
        <div class="col-md-6 col-5 text-md-right text-left my-auto">
          <a href="#" class="talktousbtn">Talk to Us</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [
        { src: '/images/brand-logo/1.png' },
        { src: '/images/brand-logo/2.png' },
        { src: '/images/brand-logo/3.png' },
        { src: '/images/brand-logo/4.png' },
        { src: '/images/brand-logo/1.png' },
        { src: '/images/brand-logo/2.png' },
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    }
  },
}
</script>
