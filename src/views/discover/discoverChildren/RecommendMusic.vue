<template>
<div class="recommendContainer">
    <!--轮播图-->
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <img :src="item.imageUrl + '?param=1600y400'" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
                <!--推荐歌单-->
    <div class="recommendMusic">
      <h2>推荐歌单<i class="el-icon-arrow-right"></i></h2>
      <list-card
      :listCardData="musicList"
      @clickListCardItem="clickListCardItem"></list-card>
    </div>
</div>

</template>

<script>
import ListCard from '../../../components/common/listCard/ListCard.vue';

import { getBannerData, getMusicList} from 'network/recommendMusic'
export default {
  components: { ListCard },
  name: "RecommendMusic",
  data() {
    return {
      // 轮播图数据
      banner: [],
      // recommend页面显示musicList
      musicList: []
    };
  },
  // 请求轮播图数据
  methods: {
    async getBannerData() {
      await getBannerData().then((res) => {
      this.banner = res.banners;
      })
      // let result = await this.$request("/banner");
    },
    // 请求前十个推荐歌单数据
    async getMusicList() {
      await getMusicList(10).then((res) => {
        this.musicList = res.result;
      })
      // this.$request('/personalized', {
      //   limit: 10
      // }).then((res) => {
      //   this.musicList = res.data.result;
      // })
    },
    // 点击歌单封面的回调
    clickListCardItem(id) {
      console.log(id);
      this.$router.push({ name: "musicListDetail", params: { id } });
    },
  },
  created() {
    this.getBannerData();
    this.getMusicList();
  },
};
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: center;
}
.el-carousel {
  width: 1000px;
}
.el-carousel__item {
  width: 500px;
  border-radius: 20px;
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.recommendMusic {
  margin: 0;
}
</style>
