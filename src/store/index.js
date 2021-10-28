import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  // 登录状态
  isLogin: false,
  // 音乐url
  musicId: '',
  // 播放状态
  isPlay: false,
  // 已收藏的歌单
  collectMusicList: [],
  // 当前播放歌曲的url
  musicId: '',
  // 当前播放的歌单
  musicList: [],
  // 当前播放歌单的id
  musicListId: '',
  // 音乐的播放状态
  isPlay: false,
  // 当前播放歌曲的索引
  currentIndex: -1,
  // 实时播放时长
  currentTime: '',
  // 音乐是否在加载中
  isMusicLoad: false,
}
const getters = {
}
// 创建Store对象
const store = new Vuex.Store({
  //定义状态
  state,
  mutations: {
    // 更新登录状态
    updateLoginState() {
      state.isLogin = !state.isLogin;
    },
    // 更新音乐url
    updateMusicId(state, musicId) {
      state.musicId = musicId;
      console.log('updateMusicId');
    },
    // 修改播放状态
    changePlayState(state, isPlay) {
      state.isPlay = isPlay;
      console.log('changePlayState');
    },
    // 当前播放音乐的索引
    updateCurrentIndex(state, index) {
    console.log('updateCurrentIndex');
    state.currentIndex = index;
    console.log(state.currentIndex);
    },
    // 更新播放实时时长
    updateCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },
    // 更新音乐的加载状态
    updateMusicLoadState(state, isLoad) {
      state.isMusicLoad = isLoad;
    },
    // 更新歌单列表和歌单id
    updateMusicList(state, payload) {
      // 当歌单id发生变化时,重置当前播放音乐索引
      if (payload.musicListId != state.musicListId) {
          state.musicListId = payload.musicListId;
          state.currentIndex = -1;
      }
      console.log(state.currentIndex);
      // 对歌单进行深拷贝再赋值 直接赋值是浅拷贝
      // 歌单是固定的死数据，而vuex中的musicList是动态的
      let musicList = payload.musicList.slice(0)
      state.musicList = musicList;
      console.log('updateMusicList');
  },
  }
})

// 挂载Vue实例
export default store;