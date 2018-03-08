<template>
  <yd-tabbar color="#8a8a8a" activeColor="#279337">
    <yd-tabbar-item title="图书" link="/" :active="activeIndex===1">
      <yd-icon name="discover" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
    <yd-tabbar-item title="电影" link="/movie" :active="activeIndex===2">
      <yd-icon name="video" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
    <yd-tabbar-item title="音乐" link="/music" :active="activeIndex===3">
      <yd-icon name="play" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
    <yd-tabbar-item title="同城" link="/city" :active="activeIndex===4">
      <yd-icon name="location" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
  </yd-tabbar>
</template>

<script>
  export default{
    props: {
      activeIndex: {
        type: Number,
        default: 1
      }
    }
  }
</script>

<style>

</style>
