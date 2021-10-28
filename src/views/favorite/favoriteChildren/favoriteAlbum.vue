<template>
<div class="favoriteAlbum">
    <div class="tip" v-if="favoriteAlbum.length == 0">
    <div>暂无收藏专辑</div>
    </div>
        <div v-else>
      <div class="title">收藏的专辑({{ count }})</div>
  </div>
<list-card
:listCardData="favoriteAlbum"
@clickListCardItem="clickListCardItem"
class="cardList"
></list-card>
</div>
</template>

<script>
import { getFavoriteAlbumData} from 'network/favorite'
import ListCard from '../../../components/common/listCard/ListCard.vue'
export default {
  components: { ListCard },
  name: 'FavoriteAlbum',
  data () {
    return {
      favoriteAlbum: [],
      count: 0
    }
  },
  methods: {
    // 请求
    // 获取收藏专辑
    async getfavoriteAlbum() {
      await getFavoriteAlbumData(1000).then((res) => {
        console.log(res);
        this.favoriteAlbum = res.data;
        this.count = res.count;
      })
    },
    
    //事件回调
    clickListCardItem(id) {
      console.log(id);
      this.$router.push({name: 'Album', params: { id }});
    }
  },
  created() {
    this.getfavoriteAlbum();
  }
}
</script>

<style scoped>
</style>
