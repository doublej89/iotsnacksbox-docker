<template>
  <div class="container mt-5">
    <p class="text-center">confederate</p>
    <h2 class="text-center">Trusted Partners & Clients</h2>
    <p class="text-center">The people who put their faith on us</p>
    <div class="row d-md-flex d-none sponsor-logo" style="max-width: 100%">
      <img src="/images/virtualhardwarelab.png" />
      <img src="/images/digitalbangladesh.png" />
      <img src="/images/ictd.png" />
      <img src="/images/anttlogo.png" />
      <img src="/images/edublocks.png" />
    </div>
    <div
      class="row d-md-none d-block sponsor-logo1 ml-2"
      style="max-width: 100%"
    >
      <div class="col-12 text-center">
        <img src="/images/virtualhardwarelab.png" />
      </div>
      <div class="col-12 text-center">
        <img src="/images/digitalbangladesh.png" />
      </div>
      <div class="col-12 text-center"><img src="/images/ictd.png" /></div>
      <div class="col-12 text-center">
        <img src="/images/anttlogo.png" />
      </div>
      <div class="col-12 text-center">
        <img src="/images/edublocks.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      featurecards: [
        {
          src: '/images/F1.png',
          title: 'Easy Connection',
          subtitle:
            'IoT SnackBox is super easy to connect using Wifi and Bluetooth. Device has common communication port to machine connectivity.',
        },
        {
          src: '/images/F2.png',
          title: 'Mesh Connection',
          subtitle:
            'Networks will be created in meshes with no single point of failure with easy connect, analyze and control your Industry',
        },
        {
          src: '/images/F3.png',
          title: 'Data-Visualization',
          subtitle:
            'Data monitoring, analysis and controlling even big data is very simple to develop using to IoT SnackBox Dashboard management',
        },
      ],
    }
  },
}
</script>
