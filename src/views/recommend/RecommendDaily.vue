<template>
<div id="recommend">
      <div class="recommendInfo">
      <div class="title">
        <div class="cover">
          <img src="~assets/img/recommendMusic.png" alt="" />
        </div>
        <div class="titleInfo">
          <div class="infoTop">每日歌曲推荐</div>
          <div class="infoBottom">根据你的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
      <!-- 操作按钮 -->
      <!-- <div class="buttons">
        <div class="buttonItem playAll" @click="playAll">
          <i class="iconfont icon-bofang playAll"></i>
          <span>播放全部</span>
        </div>
        <div class="buttonItem">
          <i class="iconfont icon-xihuan"></i>
          <span>收藏全部</span>
        </div>
      </div> -->
    </div>
  <!--歌曲列表-->
    <el-table
    ref="singleTable"
    :data="recommendSongs"
    highlight-current-row
    @current-change="handleCurrentChange"
    stripe
    size="mini"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="name"
      label="歌曲名"
      min-width="300">
    </el-table-column>
    <el-table-column
      property="ar[0].name"
      label="歌手"
      width="120">
    </el-table-column>
    <el-table-column
      property="al.name"
      label="专辑">
    </el-table-column>
        <el-table-column
      property="dt"
      label="时长">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { getRecommendSongsData} from 'network/recommendMusic'

import { handleMusicTime } from "plugins/utils";
export default {
  name: 'Recommend',
  data () {
    return {
      recommendSongs: [],
    }
  },
  methods: {
    // 请求每日推荐歌曲
    async getRecommendSongs() {
      await getRecommendSongsData().then((res) => {
        this.recommendSongs = res.data.dailySongs;
              // 处理时间
      this.recommendSongs.forEach((item, index) => {
        this.recommendSongs[index].dt = handleMusicTime(item.dt);
      });
        console.log(res);
      })
    },
          setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
  },
  created() {
    this.getRecommendSongs();
  }
}
</script>

<style scoped>
.recommendInfo {
  padding: 20px;
}

.title {
  display: flex;
}
.cover {
  width: 90px;
}
.cover img {
  width: 100%;
}
.titleInfo {
  padding: 15px 10px;
}
.infoTop {
  font-size: 19px;
  font-weight: bold;
  color: black;
  margin: 3px 0;
}
</style>
