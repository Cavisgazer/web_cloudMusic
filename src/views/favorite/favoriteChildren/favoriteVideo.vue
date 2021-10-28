<template>
<div class="video">
  <div class="tip" v-if="favoriteVideo.length == 0">
    <div>暂无收藏视频</div>
  </div>
  <list-card
  :listCardData="favoriteVideo"
  ></list-card>
</div>
</template>

<script>
import ListCard from '../../../components/common/listCard/ListCard.vue'
import { getFavoriteVideoData} from 'network/favorite'
export default {
  components: { ListCard },
  name: 'FavoriteVideo',
  data () {
    return {
      favoriteVideo: []
    }
  },
  methods: {
    async getFavoriteVideo() {
      await getFavoriteVideoData().then((res) => {
        console.log(res);
      })
    }
  },
  created() {
    this.getFavoriteVideo();
  }
}
</script>

<style scoped>

</style>
