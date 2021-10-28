<template>
<div id="favorite">
  <!--收藏navBar-->
  <nav-bar :navBarItem="navBarItemData" @clickBarItem="clickBarItem" class="nav-bar"></nav-bar>
  <router-view></router-view>
</div>
</template>

<script>
import NavBar from '../../components/common/navBar/NavBar.vue'
export default {
  components: { NavBar },
  name: 'Favorite',
  data () {
    return {
      navBarItemData: [
        {name: '专辑', path: '/favorite/favoriteAlbum'},
        {name: '歌手', path: '/favorite/favoriteSinger'},
        {name: '视频', path: '/favorite/favoriteVideo'},
      ],
    }
  },
  methods: {
    clickBarItem(path) {
      this.$router.push(path);
    }
  },
}
</script>

<style scoped>
.nav-bar {
  position: sticky;
  top: 0px;
  z-index: 6;
}
</style>
