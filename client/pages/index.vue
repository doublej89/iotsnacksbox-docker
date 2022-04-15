<template>
  <div>
    <topSection />
    <laptopImage />
    <featureSection />
    <moreFeatureSection />
    <bigDevices />
    <smallDevices />
    <peaceOfDevice />
    <buyNowBtn />
    <br /><br />
    <brandLogo />
    <br /><br /><br /><br />
    <contact />
  </div>
</template>
<script>
import topSection from '../components/home/topSection'
import laptopImage from '../components/home/laptopImage'
import featureSection from '../components/home/featureSection'
import moreFeatureSection from '../components/home/moreFeatureSection'
import bigDevices from '../components/home/bigDevices'
import smallDevices from '../components/home/smallDevices'
import peaceOfDevice from '../components/home/peaceOfDevice'
import buyNowBtn from '../components/home/buyNowBtn'
import brandLogo from '../components/home/brandLogo'
import contact from '../components/home/contact'
export default {
  components: {
    topSection,
    laptopImage,
    featureSection,
    moreFeatureSection,
    bigDevices,
    smallDevices,
    peaceOfDevice,
    buyNowBtn,
    brandLogo,
    contact,
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>
//
<style lang="scss">
// .edication-purpose-section {
//   margin: 200px 0 100px 0;
// }
// .forBusiness-section {
//   background-color: #009ddd;
// }
// .statyInTouch-section {
//   margin: 100px 0;
// }
//
</style>
