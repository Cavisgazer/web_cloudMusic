<template>
<div class="favoriteSinger">
    <div class="tip" v-if="favoriteSinger.length == 0">
    <div>暂无收藏歌手</div>
  </div>
  <list-card
  :listCardData="favoriteSinger"
  ></list-card>
</div>
</template>

<script>
import ListCard from '../../../components/common/listCard/ListCard.vue'

import { getFavoriteSingerData} from 'network/favorite'
export default {
  components: { ListCard },
  name: 'FavoriteSinger',
  data () {
    return {
      favoriteSinger: [],
    }
  },
  methods: {
    async getFavroiteSinger() {
      await getFavoriteSingerData().then((res) => {
        console.log(res);
        this.favoriteSinger = res.data;
      })
    }
  },
  created() {
    this.getFavroiteSinger();
  }
}
</script>

<style scoped>

</style>
