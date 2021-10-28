<template>
  <!--导航栏-->
  <div id="headerBar">
    <!--导航栏左侧-->
    <div class="left">
      <img src="~assets/img/logo.png" alt="" />
    </div>
    <!--导航栏中间-->
    <div class="center">
      <div class="goBack">
        <i class="el-icon-arrow-left" @click="goBack"></i>
      </div>
      <div class="goForward">
        <i class="el-icon-arrow-right" @click="goForward"></i>
      </div>
      <div class="search">
        <el-popover
          placement="bottom"
          width="300"
          v-model="isSearchPopShow"
          popper-class="popover"
          trigger="focus"
        >
          <el-input
            class="input"
            suffix-icon="el-icon-search"
            placeholder="搜索"
            slot="reference"
            v-model="searchInput"
            @input="inputSearch"
            @keyup.enter.native="onSubmit"
          ></el-input>
          <!--热搜榜-->
          <div class="hotSearch" v-if="!searchSuggestList.songs">
            <div class="hotSearcchTitle">热搜榜</div>
            <div
              class="hotSearchItem"
              v-for="(item, index) in hotSearchList"
              :key="index"
              @click="clickHotSearchItem(item.searchWord)"
            >
              <div class="hotSearchIndex" :class="index < 3 ? 'topThree' : ''">
                {{ index + 1 }}
              </div>
              <div class="hotSearchInfo">
                <div
                  class="hotSearchWord"
                  :class="index < 3 ? 'hotSearchWordTopThree' : ''"
                >
                  {{ item.searchWord }}
                </div>
                <div class="hotSearchContent">{{ item.content }}</div>
              </div>
            </div>
          </div>
          <!--搜索建议-->
          <div class="searchSuggest">
            <div class="hotsearchTitle" v-if="searchSuggestList.songs">
              搜索建议
            </div>
            <!--单曲-->
            <div
              class="searchSuggestItem"
              v-if="
                searchSuggestList.songs && searchSuggestList.songs.length != 0
              "
            >
              <div class="searchSuggestItemTitle">
                <i class="iconfont icon-yinle"></i>单曲
              </div>
              <div
                class="suggestItemDetail"
                v-for="(item, index) in searchSuggestList.songs"
                :key="index"
                @click="clickSuggestSong(item.id)"
              >
                {{ item.name + " - " + item.artists[0].name }}
              </div>
            </div>
            <!--歌手-->
            <div
              class="searchSuggestItem"
              v-if="
                searchSuggestList.artists &&
                searchSuggestList.artists.length != 0
              "
            >
              <div class="searchSuggestItemTitle">
                <i class="iconfont icon-mic"></i> 歌手
              </div>
              <div
                class="suggestItemDetail"
                v-for="(item, index) in searchSuggestList.artists"
                :key="index"
                @click="clickSuggestSinger(item.id)"
              >
                {{ item.name }}
              </div>
            </div>
            <!--专辑-->
            <div
              class="searchSuggestItem"
              v-if="
                searchSuggestList.albums && searchSuggestList.albums.length != 0
              "
            >
              <div class="searchSuggestItemTitle">
                <i class="iconfont icon-more"></i>专辑
              </div>
              <div
                class="suggestItemDetail"
                v-for="(item, index) in searchSuggestList.albums"
                :key="index"
                @click="clickSuggestAlbum(item.id)"
              >
                {{ item.name + "-" + item.artist.name }}
              </div>
            </div>
            <!--歌单-->
            <div
              class="searchSuggestItem"
              v-if="
                searchSuggestList.playlists &&
                searchSuggestList.playlists.length != 0
              "
            >
              <div class="searchSuggestItemTitle">
                <i class="iconfont icon-gedan"></i> 歌单
              </div>
              <div
                class="suggestItemDetail"
                v-for="(item, index) in searchSuggestList.playlists"
                :key="index"
                @click="clickSuggestMusicList(item.id)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <!--导航栏右侧-->
    <div class="right">
      <div class="user">
        <!--
        如果userInfo.userID为空则显示未登录状态
      -->
        <div class="loginText" v-if="!userInfo.userId">
          <div class="loginImg">
            <img
              src="~assets/img/login.jpg"
              alt=""
              slot="reference"
              @click="dialogFormVisible = true"
              v-if="!userInfo.avatarUrl"
            />
          </div>
          <el-button
            class="loginBtn"
            size="mini"
            type="info"
            @click="dialogFormVisible = true"
            >未登录</el-button
          >
        </div>
        <!--登录框-->
        <el-dialog
          title="登录"
          :visible.sync="dialogFormVisible"
          width="370px"
          :modal="false"
          center
        >
          <el-form>
            <el-form-item
              label="手机号:"
              :label-width="formLabelWidth"
              required
            >
              <el-input
                class="inputLogin"
                type="text"
                v-model="loginForm.phone"
                autocomplete="on"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" :label-width="formLabelWidth" required>
              <el-input
                class="inputLogin"
                type="password"
                v-model="loginForm.password"
                auto-complete="on"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                login();
                dialogFormVisible = false;
              "
              >登 录</el-button
            >
          </div>
        </el-dialog>
        <!--已登录状态-->
        <el-popover
          placement="bottom"
          trigger="click"
          width="150px"
          v-model="isPopoverShow"
        >
          <img
            :src="userInfo.avatarUrl"
            alt=""
            slot="reference"
            v-if="userInfo.avatarUrl"
            @click="isPopoverShow = false"
          />
          <el-button
            size="mini"
            type="info"
            class="loginOutBtn"
            @click="loginOut"
            >退出登录</el-button
          >
        </el-popover>
        <div class="userName" v-if="userInfo.nickname">
          {{ userInfo.nickname }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  login,
  getHotSearchData,
  getSearchSuggestData,
  getMusicInfoData,
} from "network/login.js";
import { handleMusicTime } from "plugins/utils";
let timer;
export default {
  name: "HeaderBar",
  data() {
    return {
      input: "",
      loginForm: {
        phone: "",
        password: "",
      },
      userInfo: {},
      dialogFormVisible: false,
      isPopoverShow: false,
      formLabelWidth: "120px",

      // 是否显示 search
      isSearchPopShow: false,
      // 热搜列表数据
      hotSearchList: [],
      // 想要搜索的内容
      searchInput: "",
      // 搜索建议列表
      searchSuggestList: {},
    };
  },
  methods: {
    // 请求
    //  手机登录请求
    async loginByCellphone() {
      let timestamp = Date.parse(new Date());
      await login(
        this.loginForm.phone,
        this.loginForm.password,
        timestamp
      ).then((result) => {
        // const result = await this.$request('/login/cellphone', {
        //   phone: this.loginForm.phone,
        //   password: this.loginForm.password,
        //   withCredentials: true
        // });
        console.log(result);
        // 登录成功
        switch (result.code) {
          case 200:
            // 将用户信息存入localstorage
            if (!window.localStorage) {
              alert("浏览器不支持localStorage");
              return false;
            } else {
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(result.profile)
              );
            }
            this.userInfo = result.profile;
            this.$message.success("登录成功!");
            this.$store.commit("updateLoginState");
            break;
          // 手机号错误
          case 400:
            this.$message.error("手机号错误!");
            break;
          // 密码错误
          case 502:
            this.$$message.error("密码错误!");
            break;
        }
        if (result.code > 400 && result.code !== 502) {
          this.$message.error("登录失败，请稍后尝试");
        }
      });
    },

    // 获取热搜列表
    async getHotSearch() {
      await getHotSearchData().then((res) => {
        console.log(res);
        this.hotSearchList = res.data;
      });
    },

    // 获取搜索建议
    async getSearchSuggest(keywords) {
      await getSearchSuggestData(keywords).then((res) => {
        console.log(res);
        this.searchSuggestList = res.result;
      });
    },
    // 根据id获取歌曲详情
    async getMusicInfo(ids) {
      await getMusicInfoData(ids).then((res) => {
        console.log(res);
        res.songs[0].dt = handleMusicTime(res.songs[0].dt);
        return res.songs[0];
      });
    },
    // 事件相关方法

    // 点击登录按钮的回调
    login() {
      // console.log("提交表单");
      //   console.log(this.loginForm);
      this.loginByCellphone();
    },

    // 点击退出登录的回调
    // 清空data和localstorage中的数据，以及cookie
    loginOut() {
      this.userInfo = {};
      window.localStorage.setItem("userInfo", "");
      this.clearAllCookie();
      // 在vuex中更新状态
      this.$store.commit("updateLoginState");
      this.isPopoverShow = false;
      this.$message.success("退出成功");
      // 刷新页面
      this.$router.go(0);
    },
    //清除所有cookie函数
    clearAllCookie() {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      console.log("需要删除的cookie名字：" + keys);
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie =
            keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
      }
    },

    // 前进的回调
    goForward() {
      this.$router.go(1);
    },
    // 后退的回调
    goBack() {
      this.$router.go(-1);
    },
    // 搜索框输入的回调防抖
    inputSearch(e) {
      clearTimeout(timer);
      if (e != "") {
        timer = setTimeout(() => {
          this.getSearchSuggest(e);
        }, 500);
      } else {
        this.searchSuggestList = {};
        return;
      }
    },

    // 在搜索框按下回车的回调
    onSubmit(e) {
      if (e.keyCode == 13 && this.searchInput != "") {
        this.goSearch();
      }
    },

    // 跳转到搜索页面
    goSearch() {
      this.isSearchPopShow = false;
      this.$router.push({
        name: "search",
        params: { id: this.searchInput },
      });
    },
    //点击热搜榜item的回调
    clickHotSearchItem(searchWord) {
      console.log(searchWord);
      this.searchInput = searchWord;
      this.goSearch();
    },
    // 点击搜索建议中专辑的回调
    clickSuggestAlbum(id) {
      this.$router.push({ name: "album", params: { id } });
      this.isSearchPopShow = false;
    },
    // 点击搜索建议中歌手的回调
    clickSuggestSinger(id) {
      this.$router.push({ name: "singerDetail", params: { id } });
      this.isSearchPopShow = false;
    },
    // 点击搜索建议中歌单的回调
    clickSuggestMusicList(id) {
      this.$router.push({ name: "musicListDetail", params: { id } });
      this.isSearchPopShow = false;
    },
    // 点击搜索建议中单曲的回调
    async clickSuggestSong(id) {
      let row = await this.getMusicInfo(id);
      this.isSearchPopShow = false;
      // 获取当前的歌单列表和歌曲索引
      let musicList = this.$store.state.musicList;
      let currentIndex = this.$store.state.currentIndex;
      // 判断歌单是否已经在歌单中存在，避免重复点击导致歌单出现相同歌曲
      let isExist = musicList.find((item) => item.id == row.id);
      if (isExist) {
        //如果已经存在，只提交歌曲id然后return
        this.$store.commit("updateMusicId", row.id);
        return;
      }
      this.$store.commit("changePlayState", false);
      // 将请求到的歌曲详情插入到歌单对应位置并提交到vuex
      musicList.splice(currentIndex + 1, 0, row);
      this.$store.commit("updateMusicId", row.id);
      this.$store.commit("updateMusicList", {
        musicList,
        musicListId: this.$store.state.musicListId,
      });
    },
  },
  created() {
    this.getHotSearch();
    if (window.localStorage.getItem("userInfo")) {
      // 进入这里表示已经登录，更新状态到vuex
      this.$store.commit("updateLoginState");
      // 从localStorage中取userInfo
      this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    }
  },
};
</script>

<style>
#headerBar {
  position: relative;
  display: flex;
  height: 45px;
  padding: 8px;
  align-items: center;
  background-color: #ec4141;
  justify-content: space-between;
}
.left img {
  width: 150px;
  height: 42px;
}
.right {
  display: flex;
  justify-content: flex-start;
  margin-right: 100px;
}
.center {
  display: flex;
  color: #ffffff;
  align-items: center;
  justify-content: space-around;
}
.center a i {
  margin-top: 5px;
  margin-right: 10px;
  padding: 5px;
  font-size: 20px;
  background-color: #d93b3b;
  color: #f2baba;
  text-align: center;
  border-radius: 30px;
}

.input input.el-input__inner {
  color: #f8cfcf;
  background: rgba(225, 62, 62, 0.8);
  border: none;
  border-radius: 20px;
}
.loginBtn {
  background-color: #ec4141 !important;
  border: none !important;
  color: #fff !important;
}
.loginOutBtn {
  color: #fff !important;
  background-color: #ec4141 !important;
  width: 150px;
}
.user img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}
.userName {
  color: #fff;
}
.user {
  display: flex;
  align-items: center;
}
.inputLogin {
  width: 180px !important;
  height: 20px !important;
}
.loginText {
  display: flex;
  justify-content: flex-start;
  color: #fff;
}
.goBack,
.goForward {
  padding-top: 4px;
  padding-left: 4px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 20px;
  background: rgba(219, 63, 63, 0.8);
  cursor: pointer;
}
.hotSearchTitle {
  font-size: 16px;
  margin: 10px 0 5px 20px;
}

.hotSearchItem {
  display: flex;
  align-items: center;
  padding: 6.5px 15px;
  cursor: pointer;
}

.hotSearchItem:hover {
  background-color: #f2f2f2;
}

.hotSearchIndex {
  margin-right: 15px;
  color: #aaa;
}

.topThree {
  color: #e13e3e;
}

.hotSearchWord {
  font-size: 16px;
  color: rgb(51, 51, 51);
}

.hotSearchWordTopThree {
  font-weight: 600;
  color: black;
}

.hotSearchContent {
  font-size: 16px;
  transform: scale(0.9) translateX(-5%);
}

.searchSuggest {
  font-size: 16px;
}

.searchSuggestItemTitle {
  background-color: #f5f5f7;
  padding: 4px 8px;
}

.searchSuggestItemTitle i {
  font-size: 15px;
}

.searchSuggestItem {
  cursor: pointer;
}

.suggestItemDetail {
  padding: 4px 27px;
  font-size: 14px;
}

.suggestItemDetail:hover {
  background-color: #f2f2f2;
}

.regEnter {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}
.popover {
  height: 400px;
  overflow-y: scroll;
}
</style>
