<template>
  <div class="singerDetail">
    <!--歌手信息-->
    <div class="singerInfo">
      <!--歌手头像-->
      <div class="singerAvatar">
        <img :src="avatar + '?params=300y300'" alt="" />
      </div>
      <div class="right">
        <!--歌手名-->
        <div class="singerName">
          {{ singerName }}
        </div>
        <div class="songsInfo">
          <!--单曲数量-->
          <div class="songs">
            单曲数:
            {{ musicSize }}
          </div>
          <!--专辑数量-->
          <div class="album">
            专辑数:
            {{ albumSize }}
          </div>
          <!--mv数量-->
          <div class="mv">
            mv数:
            {{ mvSize }}
          </div>
        </div>
      </div>
    </div>
    <div class="topSongs">
      <!-- 表格-->
            <el-table
        :data="singerSongsList.songs"
        size="mini"
        style="width: 100%"
        highlight-current-row
        @row-dblclick="play"
        stripe
        :row-key="
          (row) => {
            return row.id;
          }
        "
        :infinite-scroll-distance="1500"
        :infinite-scroll-immediate="false"
      >
        <el-table-column label="" width="40" type="index">
        </el-table-column>
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
    </div>
  </div>
</template>

<script>
import { getSingerSongs, getSingerDetail } from "network/recommendMusic";
export default {
  name: "SingerDetail",
  data() {
    return {
      singerDetail: {},
      singerSongsList: {},
      avatar: "",
      singerName: "",
      musicSize: '',
      albumSize: '',
      mvSize: '',
      musicListDetail: {},

    };
  },
  methods: {
    // 请求歌手详情
    async getSingerDetail() {
      await getSingerDetail(this.$route.params.id).then((res) => {
        this.singerDetail = res.data;
        this.avatar = res.data.artist.cover;
        this.singerName = res.data.artist.name;
        this.musicSize = res.data.artist.musicSize;
        this.albumSize = res.data.artist.albumSize;
        this.mvSize = res.data.artist.mvSize;
        console.log(res);
      });
    },
    // 请求歌手热门50首
    async getSingerSongs() {
      await getSingerSongs(this.$route.params.id).then((res) => {
        this.singerSongsList = res;
        console.log(res);
      });
    },
      // 事件回调函数
      // 双击row的回调（播放）
      async play(row) {
        this.$store.commit('updateMusicId', row.id);
        console.log(row.id);
        // 如果歌单发生变化，提交到vuex
        if (this.musicListDetail.id != this.$store.state.musicListId) {
          // 传到vuex
          this.$store.commit('updateMusicList', {
            musicList: this.musicListDetail.tracks,
            musicListId: this.musicListDetail.id
          });
        }
      }
  },
  created() {
    this.getSingerDetail();
    this.getSingerSongs();
  },
};
</script>

<style scoped>
.singerInfo {
  display: flex;
  margin: 30px 10px;
}
.singerAvatar {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
}
.singerAvatar img {
  width: 100%;
}
.singerName {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
}
.right {
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
}
.songsInfo {
  display: flex;
}
.album,
.mv {
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
