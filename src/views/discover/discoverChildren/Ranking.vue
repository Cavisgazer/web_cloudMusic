<template>
  <!-- 请求到数据前先不进行渲染，避免报错和影响美观 -->
  <div class="rankingContainer">
    <div class="ranking" v-if="officialListDetail.length != 0">
      <div class="offical">
        <div class="title">官方榜</div>
        <list-table
          :officialListDetailItem="item"
          v-for="(item, index) in officialListDetail"
          :key="index"
          @handleRowClick="handleRowClick"
          @handleRowDbClick="handleRowDbClick"
          @clickCheckAll="clickListCardItem"
        ></list-table>
      </div>
      <div class="global">
        <div class="title">全球榜</div>
        <!-- 展示歌单列表 -->
        <list-card
          class="listCard"
          :listCardData="globalList"
          @clickListCardItem="clickListCardItem"
        ></list-card>
      </div>
    </div>
  </div>
</template>

<script>
import { handleMusicTime } from "../../../plugins/utils";

import ListTable from "components/common/listTable/ListTable.vue";
import ListCard from "components/common/listCard/ListCard.vue";

import { getMusicListDetail, getAllRankings} from 'network/rank'
export default {
  components: { ListTable, ListCard },
  name: "Ranking",
  data() {
    return {
      officialList: [],
      officialListDetail: [],
      globalList: [],
    };
  },
  methods: {
    // 请求
    // 请求所有榜单
    async getAllRankings() {
      // let res = await this.$request("/toplist");
      await getAllRankings().then((res) => {
      this.officialList = res.list.slice(0, 4);
      this.globalList = res.list.slice(4);
            console.log(res);
      })
    },
    // 根据榜单id请求详细数据
    // 根据传来的 id 查询歌单
    async getMusicListDetail(id) {
      // console.log(this.$route.params.id);
      // let result = await this.$request("/playlist/detail", { id });
      await getMusicListDetail(id).then((result) => {
        result = result.playlist;
              // 对时间进行处理
      result.tracks.forEach((item, index) => {
        result.tracks[index].dt = handleMusicTime(item.dt);
      });
      this.officialListDetail.push(result);
      console.log(result);
      })
      // console.log(result);

    },

    // 事件函数
    // 行点击事件的回调
    handleRowClick(event) {
      // console.log(event);
      if (document.querySelector(".selectRow")) {
        document.querySelector(".selectRow").classList.remove("selectRow");
      }
      event.classList.add("selectRow");
    },
    // 行双击事件的回调
    // id 歌单id   index 双击歌曲在歌单中的索引
    handleRowDbClick({ id, index }) {
      // console.log(id);
      // console.log(index);
      let musicListIndex = this.officialListDetail.findIndex(
        (item) => item.id == id
      );
      console.log(musicListIndex);
      this.$store.commit(
        "updateMusicId",
        this.officialListDetail[musicListIndex].tracks[index].id
      );
      // 如果歌单发生变化,则提交歌单到vuex
      if (id != this.$store.state.musicListId) {
        // 将歌单传到vuex
        this.$store.commit("updateMusicList", {
          musicList: this.officialListDetail[musicListIndex].tracks,
          musicListId: id,
        });
      }
    },
    // 点击榜单进入歌单详情界面
    clickListCardItem(id) {
      if (!this.$store.state.isLogin) {
        this.$message.error("登录后才能查看全部歌曲哦!");
        return;
      }
      if (id.id) {
        id = id.id;
      }
      this.$router.push({ name: "musicListDetail", params: { id } });
    },
  },
  async created() {
    await this.getAllRankings();
    this.officialList.forEach((item) => {
      this.getMusicListDetail(item.id);
    });
    // console.log(this.officialListDetail);
  },
};
</script>

<style scoped>
.rankingContainer {
  display: flex;
  justify-content: center;
  width: 100%;
}

.ranking {
  max-width: 1000px;
  padding: 0 10px;
}

.listCard {
  margin-top: 15px;
}
</style>