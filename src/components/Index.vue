<template>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <!--侧边栏-->
    <el-container hight="100%">
      <el-aside width="200px">
        <el-menu
          background-color="#ffffff"
          text-color="#303133"
          active-text-color="#000000"
          router
          :default-active="defaultActive"
        >
          <el-menu-item index="/discover">
            <i class="iconfont icon-yinleguan"></i>
            <span slot="title" class="font">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <i class="iconfont icon-shipin"></i>
            <span slot="title" class="font">视频</span>
          </el-menu-item>
          <el-menu-item index="/favorite">
            <i class="iconfont icon-shoucang"></i>
            <span slot="title" class="font">收藏</span>
          </el-menu-item>
          <el-menu-item index="/recommend">
            <i class="iconfont icon-gengduo"></i>
            <span slot="title" class="font">每日推荐</span>
          </el-menu-item>
          <el-menu-item-group>
            <template slot="title" class="groupTitle">创建的歌单</template>
            <el-menu-item
              v-for="(item, index) in createdMusicList"
              :key="index"
              :index="'/musiclistdetail/' + item.id"
            >
              <i class="iconfont icon-Notesmusic"></i>
              <span slot="title" class="font">{{ item.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title" class="groupTitle">收藏的歌单</template>
            <el-menu-item
              v-for="(item, index) in collectedMusicList"
              :key="index"
              :index="'/musiclistdetail/' + item.id"
            >
              <i class="iconfont icon-Notesmusic"></i>
              <span slot="title" class="font">{{
                item.name
              }}</span></el-menu-item
            >
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <!--主体-->
      <el-main>
        <keep-alive>
          <router-view class="routerView" :key="$route.fullPath"></router-view>
        </keep-alive>
      </el-main>
    </el-container>
    <bottom-control></bottom-control>
  </el-container>
</template>

<script>
import HeaderBar from "./common/headerbar/HeaderBar.vue";
import { getMusicList } from "network/musicList";
import BottomControl from "./common/bottomControl/BottomControl.vue";
export default {
  components: { HeaderBar, BottomControl },
  name: "Index",
  data() {
    return {
      defaultActive: "",
      createdMusicList: [],
      collectedMusicList: [],
      userInfo: {},
    };
  },
  created() {
    // 取路由中的首地址 用于侧边栏的导航active
    this.defaultActive = "/" + this.$route.path.split("/")[1];
    setTimeout(() => {
      this.getUserMusicList();
    }, 500);
  },
  methods: {
    // 请求
    // 请求用户歌单
    async getUserMusicList() {
      if (!this.$store.state.isLogin) {
        // 未登录
        this.$message.error("请登录");
        return;
      }
      let timestamp = Date.parse(new Date());
      // 从localStorage里面读取用户信息
      let storage = window.localStorage;
      this.userInfo =
        storage.getItem("userInfo") && JSON.parse(storage.getItem("userInfo"));
      await getMusicList(this.userInfo.userId, timestamp).then((res) => {
        // console.log(storage);
        // 分类数据
        res = res.playlist;
        let index = res.findIndex((item) => item.subscribed == true);
        this.createdMusicList = res.slice(0, index);
        this.collectedMusicList = res.slice(index);
      });
      // let res = await this.$request('/user/playlist', {
      //   uid: this.userInfo.userId,
      //   timestamp
      // });
    },
  },
  // watch: {
  //   "$route.path"() {
  //     this.defaultActive = "/" + this.$route.path.split("/")[1];
  //   }
  // }
};
</script>

<style scoped>
.el-header,
.el-aside {
  margin: 0;
  padding: 0;
  margin-bottom: 2px;
}
.iconfont {
  font-size: 16px;
}
.font {
  font-size: 16px;
}
.el-menu-item:hover {
  background-color: #f5f5f6 !important;
  font-weight: 600;
}
.el-menu-item {
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
.routerView {
  padding: 0 15px;
  margin: 0;
  height: calc(100vh - 105px);
}
.el-aside {
  height: calc(100vh - 105px);
  border-right: 1px solid #ccc;
}
.el-main {
  padding: 0;
}
.is-active {
  background-color: #f6f6f7;
  font-size: 14px;
  font-weight: 600;
}
i {
  margin-right: 5px;
}
</style>
