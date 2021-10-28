<template>
<div class="album">
      <!-- 歌单信息 -->
    <div class="listInfo">
      <!-- 歌单封面 -->
      <div class="listAvatar">
        <img :src="albumInfo.album.picUrl + '?param=300y300'" alt="" />
      </div>
      <div class="right">
        <!-- 标题 -->
        <div class="title">
          <div class="titleTag">专辑</div>
          <div class="titleContent">{{ albumInfo.album.name }}</div>
        </div>
        <!-- 操作按钮 -->
        <div class="buttons">
          <div class="buttonItem playAll" @click="playAll">
            <i class="iconfont icon-bofang playAll"></i>
            <span>播放全部</span>
          </div>
          <div class="buttonItem" @click="subAlbum">
            <i class="iconfont icon-xihuan" :class="isSub ? 'red' : ''"></i>
            <span>{{ isSub ? "已收藏" : "收藏" }}</span>
          </div>
          <div class="buttonItem">
            <i class="iconfont icon-zhuanfa"></i>
            <span>分享</span>
          </div>
        </div>
        <div class="otherInfo">
          <div class="playCount">歌手 : {{ albumInfo.album.artist.name }}</div>
        </div>
        <div class="otherInfo">
          <div class="playCount">
            时间 : {{ albumInfo.album.publishTime | showDate }}
          </div>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="musicList">
      <el-tabs value="first">
        <el-tab-pane label="歌曲列表" name="first">
          <!-- 表格 -->
          <!-- 第三方组件的table在退出后不会销毁，而是继续保留，导致多个table同时存在 ref变得不唯一 
              解决办法：避免使用refs..（拼接也不好使） -->
          <el-table
            :data="albumInfo.songs"
            size="mini"
            style="width: 100%"
            @row-dblclick="clickRow"
            @cell-click="clickCell"
            highlight-current-row
            stripe
          >
            <el-table-column
              label=""
              width="30"
              type="index"
              :index="handleIndex"
            >
            </el-table-column>
            <el-table-column label="" width="23">
              <!-- 下载按钮 -->
              <i class="iconfont icon-download"></i>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" min-width="200">
            </el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" min-width="100">
            </el-table-column>
            <el-table-column prop="al.name" label="专辑" min-width="140">
            </el-table-column>
            <el-table-column prop="dt" label="时长" min-width="100">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
                <el-tab-pane label="专辑详情" name="third">
          <div class="albumDesc">{{ albumInfo.album.description }}</div>
        </el-tab-pane>
</div>
</div>
</template>

<script>
import { formatDate, handleNum, handleMusicTime } from "plugins/utils";
import { getAlbumData} from "network/musicList"
export default {
  name: 'Album',
  data () {
    return {
      albumInfo: {},
      // 用户是否已收藏
      isSub: false,
    }
  },
  methods: {
    // 请求
    // 请求专辑详情
    async getAlbum() {
      await getAlbumData(this.$route.params.id).then((res) => {
        console.log(res);
        res.songs.forEach((item, index) => {
          res.songs[index].dt = handleMusicTime(item.dt);
        });
        this.albumInfo = res;
      })
    },

    // 事件回调
    // 播放
    // 双击table的row的回调
    async clickRow(row) {
      // console.log(row);
      // 将musicId提交到vuex中 供bottomControl查询歌曲url和其它操作
      this.$store.commit("updateMusicId", row.id);
      // 如果歌单发生变化,则提交歌单到vuex
      if (this.albumInfo.album.id != this.$store.state.musicListId) {
        // 将歌单传到vuex
        this.$store.commit("updateMusicList", {
          musicList: this.albumInfo.songs,
          musicListId: this.albumInfo.album.id,
        });
      }
    },
  },
  created() {
    this.getAlbum();
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
}
</script>

<style scoped>
.listInfo {
  margin: 20px 20px;
  display: flex;
  align-items: center;
}
.listAvatar img{
  border-radius: 25px;
  margin-right: 30px;
}
.right {
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  align-items: center;
}
.titleTag {
  font-size: 22px;
  color: #ec4141;
  border: 1px solid #ec4141;
  padding: 1px 2px;
  border-radius: 2px;
  margin-right: 5px;
  transform: scale(0.8);
}
.titleContent {
  font-size: 28px;
  font-weight: 600;
  color: #373737;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.createTime {
  transform: scale(0.9);
}

.buttons {
  margin: 8px 0 0 -5px;
  display: flex;
}

.buttonItem {
  font-size: 18px;
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  transform: scale(0.9);
}

.buttonItem i {
  font-size: 18px;
  margin-right: 3px;
  transform: scale(1.5);
}

.playAll {
  background-color: #ec4141;
  color: white;
}

.otherInfo {
  margin: 5px 0 0 -30px;
  display: flex;
  font-size: 16px;
  transform: scale(0.9);
}
.albumDesc {
  font-size: 16px;
  color: #373737;
  line-height: 25px;
  letter-spacing: 0.5px;
  text-indent: 2em;
}

.red {
  color: #ec4141;
}
</style>
