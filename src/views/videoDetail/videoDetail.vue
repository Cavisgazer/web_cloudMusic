<template>
<div class="videoDetail">
  <div class="left">
    <div class="title">
      {{ $route.params.type == "mv" ? "MV详情" : "视频详情"}}
    </div>
    <video
    class="videoPlayer"
    :src="videoUrl"
    controls
    width="800px"
    height="400px"
    :poster="$route.params.type == 'mv' ? videoInfo.cover : videoInfo.coverUrl"
    ></video>
  <!--视频详情信息 -->
  <div class="videoInfo" v-if="$route.params.type == 'mv' ? videoInfo.cover : videoInfo.coverUrl">
    <div class="user">
      <div class="avatar">
        <img :src="($route.params.type == 'mv' ? videoInfo.artists[0].img1v1Url : videoInfo.avatarUrl) + '?param=150y150'" alt="">
      </div>
      <div class="userName">
        {{ $route.params.type == 'mv' ? videoInfo.artists[0].name : videoInfo.creator.nickname}}
      </div>
          </div>
      <div class="videoTitle">
        {{ $route.params.type == 'mv' ? videoInfo.name : videoInfo.title}}
      </div>
  </div>
        <div class="otherInfo">
        <div class="release">
          发布: {{
            $route.params.type == 'mv' ? videoInfo.publishTime : videoInfo.publishTime | showDate
          }}
        </div>
        <div>
          播放: {{
            $route.params.type == 'mv' ? videoInfo.playCount : videoInfo.playTime | handleNum
          }}
        </div>
      </div>
    </div>
    <!--相关推荐-->
    <div class="right" v-if="relatedVideo.length != 0">
      <div class="title">相关推荐</div>
      <div
      class="relatedVideoItem"
      v-for="(item, index) in relatedVideo"
      :key="index"
      @click="goToRelatedVideo(item.vid)"
      >
      <div class="relatedVideoItemCover">
        <img :src="item.coverUrl + '?param=240y100'" alt="">
      </div>
      <div class="relatedVideoItemInfo">
        <div class="relatedVideoItemTitle">{{ item.title }}</div>
        <div class="creator">by {{ item.creator[0].userName}}</div>
      </div>
      </div>
      </div>
    </div>
</div>
</template>

<script>
import { handleNum, handleMusicTime, formatDate } from "plugins/utils.js";

import {
  getRelatedVideoData,
  getMvDetailData,
  getMvUrlData,
  getVideoDetailData,
  getVideoUrlData,
} from "network/videoDetail";

export default {
  components: {},
  name: "videoDetail",
  data() {
    return {
      videoInfo: {},
      videoUrl: "",
      // 相关视频数据
      relatedVideo: [],
      comments: {},
      // 评论页数
      commentsPage: 1,
      // 用户是否收藏该视频
      isSUb: false,
      // 是否正在加载评论
      isCommentLoading: false,
      // 用户是否喜欢该视频
      isLike: false,
    };
  },
  methods: {
    // 网络请求
    // 根据创来的 id 查询 mv 详情
    async getMvDetail() {
      await getMvDetailData(this.$route.params.id).then((res) => {
        console.log(res);
        this.videoInfo = res.data;
      });
    },

    // 根据传来的 id 查询 相关视频 详情
    async getRelatedVideo() {
      // console.log(this.$route.params.id);
      await getRelatedVideoData(this.$route.params.id).then((res) => {
        console.log(res);
        this.relatedVideo = res.data;
      });
    },

    // 请求mv Url
    async getMvUrl() {
      await getMvUrlData(this.$route.params.id).then((res) => {
        console.log(res);
        this.videoUrl = res.data.url;
      });
    },

    // 请求视频详情
    async getVideoDetail() {
      await getVideoDetailData(this.$route.params.id).then((res) => {
        console.log(res);
        this.videoInfo = res.data;
      });
    },

    // 请求视频url
    async getVideoUrl() {
      await getVideoUrlData(this.$route.params.id).then((res) => {
        console.log(res);
        this.videoUrl = res.urls[0].url;
      });
    },

    // 事件方法
    // 点击相关视频的回调
    goToRelatedVideo(id) {
      this.$router.push({
        name: "videoDetail",
        params: {
          id,
          type: "video",
        },
      });
    },
  },
  filters: {
    handleNum,
    handleMusicTime,
    showDate(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  async created() {
    this.getRelatedVideo();
    // 如果类型是mv，就调用mv相关方法
    if (this.$route.params.type == "mv") {
      await this.getMvDetail();
      this.getMvUrl();
    }
    // 如果类型是video，就调用video相关方法
    if (this.$route.params.type == "video") {
      await this.getVideoDetail();
      this.getVideoUrl();
    }
  },
};
</script>

<style scoped>
.videoDetail {
  display: flex;
  height: calc(100vh - 105px);
  overflow-y: scroll;
  overflow-x: hidden;
}
.avatar {
  width: 60px;
  height: 60px;
  margin-right: 20px;
}
.avatar img {
  width: 60px;
  height: 60px;
  border: 1px solid #000;
  border-radius: 50%;
}
.videoTitle {
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.left {
  width: 800px;
}
.right {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.title {
  margin: 10px 0;
  color: black;
  font-weight: 600;
}
.relatedVideoItem {
  display: flex;
  position: relative;
  right: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}
.relatedVideoItemCover img {
  width: 240px;
  height: 120px;
  border-radius: 15px;
}
.user {
  display: flex;
  margin: 10px 0;
  align-items: center;
}
.userName {
  color: #000;
  font-weight: 600;
}
.otherInfo {
  display: flex;
  font-size: 14px;
  color: rgb(109, 107, 107);
}
.release {
  margin-right: 30px;
}
.relatedVideoItemInfo {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.relatedVideoItemTitle {
  width: 230px;
  margin-top: 10px;
  margin-bottom: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  /*弹性伸缩盒子模型显示*/
  display: -webkit-box;
  /*限制在一个块元素显示的文本的行数*/
  -webkit-line-clamp: 2;
  /*设置或检索伸缩盒对象的子元素的排列方式*/
  -webkit-box-orient: vertical;
}
.creator {
  font-size: 14px;
  color: rgb(109, 107, 107);
}
</style>
