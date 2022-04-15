<template>
  <v-responsive
    class="text-center page-404"
    fill-height
    style="height: calc(100vh - 58px)"
  >
    <v-row align="center">
      <v-col>
        <h2>Oops! Page not found.</h2>
        <h1>404</h1>
        <p>We can't find the page you're looking for.</p>
        <a href="/">Go back home</a>
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script>
export default {
  name: 'FourOhFour',
  props: {
    lang: {
      type: String,
      default: 'en',
    },
  },
  created() {},
}
</script>

<style scoped lang="scss">
.page-404 {
  background-image: linear-gradient(125deg, #6a89cc, #b8e994);
  padding-top: 300px;
  h1 {
    font-size: 160px;
    margin: 0;
    font-weight: 900;
    letter-spacing: 20px;
    background-image: url(https://images.unsplash.com/photo-1570449880379-6a018f613286?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80);
    background-position: 100px center;
    background-repeat: no-repeat;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
  }
  a {
    text-decoration: none;
    background: #e55039aa;
    color: #fff;
    padding: 12px 24px;
    display: inline-block;
    border-radius: 25px;
    font-size: 14px;
    text-transform: uppercase;
    transition: background 0.4s linear;

    &:hover {
      background: #e55039;
    }
  }
}
</style>
