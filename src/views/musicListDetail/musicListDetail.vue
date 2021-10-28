<template>
  <div class="musicListDetail">
    <!--歌单信息-->
    <div class="listInfo">
      <!--封面-->
      <div class="Avatar">
        <img :src="musicListDetail.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <!--标题-->
        <div class="title">
          <div class="titleTag">歌单</div>
          <div class="titleContent">{{ musicListDetail.name }}</div>
        </div>
        <!--用户信息-->
        <div class="user">
          <!--头像-->
          <div class="userAvatar">
            <img :src="avatarUrl" alt="" />
          </div>
          <!--用户名-->
          <div class="userName">{{ nickName }}</div>
          <!--创建时间-->
          <div class="createTime">
            {{ musicListDetail.createTime | showDate }}&nbsp;创建
          </div>
        </div>
        <!--标签-->
        <div class="tags">
          标签:
          <div
            class="tagItem"
            v-if="musicListDetail.tags.length != 0"
            v-for="(item, index) in musicListDetail.tags"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <!--歌曲和播放数目-->
        <div class="otherInfo">
          <!--歌曲数目-->
          <div class="songs">
            歌曲：{{ musicListDetail.trackCount | handleNum }}
          </div>
          &nbsp;
          <!--播放数目-->
          <div class="play">
            播放：{{ musicListDetail.playCount | handleNum }}
          </div>
        </div>
        <div class="desc">简介: {{ musicListDetail.description }}</div>
      </div>
    </div>
    <!--歌曲列表-->
    <div class="musicList">
      <!--表格-->
      <el-table
        :data="musicListDetail.tracks"
        size="mini"
        style="width: 100%"
        @row-dblclick="play"
        highlight-current-row
        stripe
        :row-key="
          (row) => {
            return row.id;
          }
        "
        v-infinite-scroll="this.$store.state.isLogin ? loadMore : ''"
        :infinite-scroll-disabled="scrollLoadDisabled"
        :infinite-scroll-distance="500"
        :infinite-scroll-immediate="false"
      >
        <el-table-column label="" width="50" type="index"> </el-table-column>
        <el-table-column label="" width="23">
          <!-- 下载按钮 -->
          <i class="iconfont icon-download"></i>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题" min-width="350">
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" min-width="120">
        </el-table-column>
        <el-table-column prop="al.name" label="专辑" min-width="170">
        </el-table-column>
        <el-table-column prop="dt" label="时长" min-width="100">
        </el-table-column>
        <!-- <el-table-column prop="id"></el-table-column> -->
      </el-table>
      <div class="loadMore" v-if="isMore && !this.$store.state.isLogin">
        登陆后查看更多音乐
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicListDetailData, getMusicDetailData } from "network/musicList";

import { handleMusicTime, formatDate, handleNum } from "plugins/utils";
import GoTop from "../../components/common/goTop/GoTop.vue";
export default {
  components: { GoTop },
  name: "MusicListDetail",
  data() {
    return {
      musicListDetail: {},
      avatarUrl: "",
      nickName: "",
      // 是否禁止滚动加载
      scrollLoadDisabled: false,
      // 是否还有更多音乐
      isMore: false,
      // 是否是用户收藏的歌单
      isSub: false,
      // 报类型错误，找不到slice方法，全部歌曲
      trackIds: [],
      // 歌曲数组长度
      length: "",
    };
  },
  methods: {
    // 根据传来的Id 查询歌单 根据API，查询到的不是全部歌曲
    async getMusicList() {
      let timestamp = Date.parse(new Date());
      console.log(this.$route.params.id);
      await getMusicListDetailData(this.$route.params.id, timestamp).then(
        (res) => {
          this.musicListDetail = res.playlist;
          this.avatarUrl = this.musicListDetail.creator.avatarUrl;
          this.nickName = this.musicListDetail.creator.nickname;
          this.trackIds = this.musicListDetail.trackIds;
          this.length = this.musicListDetail.tracks.length;
          console.log(this.musicListDetail);
          // 处理播放时间
          this.musicListDetail.tracks.forEach((item, index) => {
            this.musicListDetail.tracks[index].dt = handleMusicTime(item.dt);
          });

          //判断是否还有更多歌曲
          if (
            this.musicListDetail.tracks.length !=
            this.musicListDetail.trackIds.length
          ) {
            this.isMore = true;
          }
        }
      );
    },
    // 获取歌曲详情
    async getMusicDetail(ids) {
      if (this.isMore == false) return;
      this.scrollLoadDisabled = true;

      await getMusicDetailData(ids).then((res) => {
        console.log(res);
        // 处理时间
        res.songs.forEach((item, index) => {
          res.songs[index].dt = handleMusicTime(item.dt);
        });
        this.musicListDetail.tracks.push(...res.songs);
        //判断是否还有更多音乐
        if (
          this.musicListDetail.tracks.length <
          this.musicListDetail.trackIds.length
        ) {
          this.isMore = true;
          this.scrollLoadDisabled = false;
        } else {
          this.isMore = false;
        }
      });
    },
    // 点击加载所有音乐的回调
    loadMore() {
      if (!this.$store.state.isLogin) {
        this.$message.error("更多歌曲请登录");
        return;
      }
      let arr = this.trackIds.slice(this.length);
      if (arr.length > 100) {
        arr = arr.slice(0, 100);
      }
      console.log(arr.length);
      let ids = "";
      arr.forEach((item) => {
        ids += item.id + ",";
      });
      ids = ids.substr(0, ids.length - 1);
      this.getMusicDetail(ids);
    },
    // 判断用户是否收藏了该歌单
    getIsSub() {
      this.isSub = this.$store.state.collectMusicList.find(
        (item) => item.id == this.$route.params.id
      );
    },
    // 双击row的回调（选中播放）
    async play(row) {
      console.log(row);
      // 提交musicID 到 Vuex中，给bottomControl提供查询歌曲 url 和其它操作
      this.$store.commit("updateMusicId", row.id);
      // 如果歌单发生变化，则提交歌单到vuex
      if (this.musicListDetail.id != this.$store.state.musicListId) {
        // 传到 vuex
        this.$store.commit("updateMusicList", {
          musicList: this.musicListDetail.tracks,
          musicListId: this.musicListDetail.id,
        });
      }
    },
  },
  filters: {
    showDate(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);
      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
    handleNum,
  },
  created() {},
  async mounted() {
    if (this.$store.state.isLogin) {
      // 判断是否是用户创建的歌单
      this.getIsSub();
    }
    await this.getMusicList();
  },
};
</script>

<style scoped>
.musicListDetail {
  overflow-x: hidden;
}
.listInfo {
  display: flex;
  padding: 25px 15px;
  align-items: center;
}
.Avatar {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 15px;
}

.Avatar img {
  width: 100%;
}
.title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.titleTag {
  font-size: 14px;
  color: #ec4141;
  border: 1px solid #ec4141;
  padding: 1px 2px;
  border-radius: 2px;
  margin-right: 5px;
}

.titleContent {
  font-size: 22px;
  font-weight: 800;
}
.right {
  flex-direction: column;
  font-size: 14px;
}
.userName {
  color: #6191c2;
}
.createTime {
  font-size: 12px;
  margin-left: 10px;
  color: #666666;
}
.tags {
  display: flex;
  margin-top: 5px;
  color: #666666;
  margin-bottom: 5px;
}
.tagItem {
  margin-left: 5px;
}
.otherInfo {
  display: flex;
  color: #666666;
  margin-bottom: 5px;
}
.desc {
  width: 1000px;
  color: #666666;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.loadMore {
  width: 100%;
  height: 50px;
  font-size: 12px;
  color: #aaa;
  text-align: center;
  line-height: 50px;
  transform: scale(0.9);
}
</style>
