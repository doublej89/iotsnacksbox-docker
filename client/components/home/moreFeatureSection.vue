<template>
  <div class="container-fluid" style="background-color: #f2f3f4">
    <div class="container machinedata pb-5">
      <div class="text-center pt-5">
        <p>data acqusition</p>
        <h2>Machine to Data Acquisition Connectivity</h2>
        <p>See how customers have transfomed their business</p>
      </div>

      <div class="row">
        <div
          class="col-md-6 col-12 mt-4 p-5 text-md-left text-center d-md-block d-none"
        >
          <h3>Powerful IoT solutions for developing smart world</h3>
          <h5>Compatible with industry PLC's</h5>
        </div>
        <div class="col-md-6 col-12 text-center text-md-left">
          <img src="/images/all-device-together.png" />
        </div>
        <div
          class="col-md-6 col-12 mt-4 text-md-left text-center d-md-none d-block"
        >
          <h3>Powerful IoT solutions for developing smart world</h3>
          <h5>Compatible with industry PLC's</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moreFeatureCards: [
        {
          src: '/images/F4.png',
          title: 'Feature #2',
          subtitle:
            'Lorem ipsum dolor sit amet, etur adipiscing elit, sed do eiusmpor.',
        },
        {
          src: '/images/F5.png',
          title: 'Feature #1',
          subtitle:
            'Lorem ipsum dolor sit amet, etur adipiscing elit, sed do eiusmpor.',
        },
      ],
    }
  },
}
</script>
