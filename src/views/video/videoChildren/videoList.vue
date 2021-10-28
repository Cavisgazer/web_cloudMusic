<template>
  <div class="videoList">
    <!-- 视频navbar -->
    <div class="musicListNavBar" v-if="videoCategory.length != 0">
      <div class="left">
        <sort-box
          :currentTag="currentTag"
          :sortList="sortList"
          @getSortList="getSortList"
          @clickSortBoxItem="clickSortBoxItem"
        ></sort-box>
      </div>
      <div class="right">
        <second-nav-bar
          :SecondNavBarData="videoCategory"
          :itemWidth="0"
          :currentTag="currentTag"
          @clickSecondBarItem="clickSecondBarItem"
        ></second-nav-bar>
      </div>
    </div>
    <!-- 视频卡片列表 -->
    <video-list-card
      :videoList="videoList"
      :isLoad="true"
      :videoType="'video'"
      class="cardList"
      @clickListCardItem="goToVideoDetail"
      @bottomLoad="bottomLoad"
    >
    </video-list-card>
    <go-top scrollObj=".cardList"></go-top>
  </div>
</template>

<script>
import SecondNavBar from "components/common/secondNavBar/SecondNavBar.vue";
import VideoListCard from "components/common/videoListCard/VideoListCard.vue";
import GoTop from "components/common/goTop/GoTop.vue";
import SortBox from "components/common/sortBox/SortBox.vue";
import { getVideoCategoryData } from "network/video.js";

export default {
  components: { SecondNavBar, VideoListCard, GoTop, SortBox },
  name: "VideoList",
  data() {
    return {
      // 视频分类
      videoCategory: [],
      // 当前标签
      currentTag: {},
      // 当前视频页数
      videoPage: 1,
      // 是否还有更多视频数据
      hasMore: true,
      // 视频列表数据
      videoList: [],
      // 视频分类tag列表
      sortList: [],
    };
  },
  methods: {
    // 请求
    // 请求视频分类
    async getVideoCategory() {
      let timestamp = Date.parse(new Date());
      let res = await this.$request("/video/category/list", { timestamp });
      console.log(res);
      this.videoCategory = res.data.data;
      this.currentTag = res.data.data[0];
      // console.log(this.videoCategory);
    },
    //获取分类下的视频
    async getVideoList(id) {
      let i = 2;
      while (i) {
        if (this.hasMore) {
          let res = await this.$request("/video/group", {
            id,
            offset: 8 * (this.videoPage - 1),
          });
          this.hasMore = res.data.hasmore;
          this.videoList.push(...res.data.datas);
          this.videoPage += 1;
          i--;
        } else {
          return;
        }
      }
      // console.log(this.videoList);
    },

    // 获取视频分类tag
    async getSortList() {
      let res = await this.$request("/video/group/list");
      // console.log(res);
      // console.log(res.data.data);
      this.sortList = res.data.data;
    },

    // 事件
    // 点击分类的回调
    clickSecondBarItem(index) {
      // console.log("clickSecondBarItem");
      this.videoPage = 1;
      this.videoList = [];
      this.currentTag = this.videoCategory[index];
      this.getVideoList(this.currentTag.id);
    },
    // 进入视频详情页面
    goToVideoDetail({ id }) {
      console.log(id);
      this.$router.push({
        name: "videoDetail",
        params: { id, type: "video" },
      });
    },
    // 上拉触底的回调
    bottomLoad() {
      // console.log("goToVideoDetail");
      if (this.hasMore) {
        this.getVideoList(this.currentTag.id);
      }
    },

    // 点击sortBoxItem的分类item的回调
    clickSortBoxItem(item) {
      this.currentTag = item;
      this.videoPage = 1;
      this.videoList = [];
      this.getVideoList(item.id);
    },
  },
  async created() {
    await this.getVideoCategory();
    await this.getVideoList(this.currentTag.id);
  },
};
</script>

<style scoped>
.musicListNavBar {
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.cardList {
  overflow-y: scroll;
  height: calc(100vh - 220px);
}
</style>