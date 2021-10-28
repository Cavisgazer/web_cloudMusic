<template>
<div class="video">
  <nav-bar :navBarItem="navBarItem" @clickBarItem="clickBarItem" class="nav-bar"></nav-bar>
  <router-view></router-view>
</div>
</template>

<script>
import NavBar from '../../components/common/navBar/NavBar.vue'
export default {
  name: 'Video',
  components: {
    NavBar
  },
  data () {
    return {
      navBarItem: [
        {
          name: '视频', path: '/video/videoList'
        },
        {
          name: 'Mv' , path: '/video/mvList'
        }
      ]
    }
  },
  methods: {
    clickBarItem(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
</style>
