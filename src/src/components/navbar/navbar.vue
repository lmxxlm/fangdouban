<template>
  <yd-navbar :title="navBarTitle" bgcolor="#279337" color="#fff">
    <slot name="left" slot="left"></slot>
    <slot name="center" slot="center"></slot>
    <slot name="right" slot="right"></slot>
  </yd-navbar>
</template>

<script>
  export default{
    props: {
      navBarTitle: {
        type: String,
        default: '仿豆瓣APP'
      }
    }
  }

</script>

<style>
  .yd-navbar-center-title {
    font-size: 14px !important;
  }

  .yd-navbar, .yd-navbar-center-box {
    height: .9rem !important;
  }
</style>
