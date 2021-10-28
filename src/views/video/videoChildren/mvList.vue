<template>
  <div class="mvList">
    <!--MVnavBar-->
    <div class="mvListBar">
      <div class="selectItem">
        <div class="title">地区:</div>
        <second-nav-bar
          :SecondNavBarData="areaList"
          @clickSecondBarItem="areaItem"
          class="secondBar"
          :itemWidth="60"
        ></second-nav-bar>
      </div>
      <div class="selectItem">
        <div class="title">类型:</div>
        <second-nav-bar
          :SecondNavBarData="typeList"
          @clickSecondBarItem="typeItem"
          class="secondBar"
          :itemWidth="70"
        ></second-nav-bar>
      </div>
      <div class="selectItem">
        <div class="title">排序:</div>
        <second-nav-bar
          :SecondNavBarData="orderList"
          @clickSecondBarItem="orderItem"
          class="secondBar"
          :itemWidth="70"
        ></second-nav-bar>
      </div>
    </div>
    <!--Mv卡片-->
    <video-list-card
      class="cardList"
      :videoList="mvList"
      :isLoad="true"
      :videoType="'mv'"
      @clickListCardItem="goToMvDetail"
      @bottomLoad="bottomLoad"
    >
    </video-list-card>
    <go-top scrollObj=".cardList"></go-top>
  </div>
</template>

<script>
import GoTop from "../../../components/common/goTop/GoTop.vue";
import SecondNavBar from "../../../components/common/secondNavBar/SecondNavBar.vue";
import VideoListCard from "../../../components/common/videoListCard/VideoListCard.vue";

import { getMvListf } from "network/video";
export default {
  components: { SecondNavBar, VideoListCard, GoTop },
  name: "mvList",
  data() {
    return {
      // 当前地区
      area: "",
      // 当前排序
      order: "",
      // 当前分页
      myPage: "",
      // 当前mv类型可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
      type: "",
      // 是否还有更多视频数据
      hasMore: false,
      // 视频列表数据
      mvList: [],

      // mv地区
      areaList: [
        { name: "全部", path: "" },
        { name: "内地", path: "内地" },
        { name: "港台", path: "港台" },
        { name: "欧美", path: "欧美" },
        { name: "日本", path: "日本" },
        { name: "韩国", path: "韩国" },
      ],
      // mv类型
      typeList: [
        { name: "全部", path: "" },
        { name: "官方版", path: "官方版" },
        { name: "原生", path: "原生" },
        { name: "现场版", path: "现场版" },
        { name: "网易出品", path: "网易出品" },
      ],
      // mv排序
      orderList: [
        { name: "上升最快", path: "" },
        { name: "最热", path: "最热" },
        { name: "最新", path: "最新" },
      ],
    };
  },
  methods: {
    // 请求
    // 请求全部Mv
    async getMvList() {
      let offset = 30 * (this.myPage - 1);
      await getMvListf(this.area, this.order, offset, this.type).then((res) => {
        console.log(res);
        this.hasMore = res.hasMore;
        this.mvList.push(...res.data);
      });
      // let res = await this.$request("/mv/all", {
      //   area: this.area,
      //   order: this.order,
      //   offset: 30 * (this.offset - 1),
      //   type: this.type,
      // });
    },
    // 点击事件的回调
    areaItem(index) {
      this.area = this.areaList[index].path, 
      this.mvList = [];
      this.myPage = 1;
      this.getMvList();
    },
    typeItem(index) {
      this.area = this.typeList[index].path, 
      this.mvList = [];
      this.myPage = 1;
      this.getMvList();
    },
    orderItem(index) {
      this.order = this.orderList[index].path, 
      this.mvList = [];
      this.myPage = 1;
      this.getMvList();
    },
    // 进入mv详情页面
    goToMvDetail({ id }) {
      this.$router.push({
        name: 'videoDetail',
        params: {
          id,
          type: 'mv'
        }
      })
        },
    // 上拉触底的回调
    bottomLoad() {
      if (this.hasMore) {
        this.myPage += 1;
        this.getMvList();
      }
    },
  },
  created() {
    this.getMvList();
  },
};
</script>

<style scoped>
.title {
  width: 40px;
  font-size: 16px;
  line-height: 30px;
}
.selectItem {
  display: flex;
}
.cardList {
  overflow-y: scroll;
  height: calc(100vh - 275px);
}
.mvListBar {
  padding: 0px 25px;
  transform: translateY(-10px);
}
</style>
