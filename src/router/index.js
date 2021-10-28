import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('components/Index.vue')

const Discover = () => import('views/discover/Discover.vue')
const RecommendMusic = () => import('views/discover/discoverChildren/RecommendMusic.vue')
const MusicList = () =>import('views/discover/discoverChildren/MusicList.vue')
const MusicListHighquality = () =>import('views/discover/discoverChildren/musicListChildren/MusicListHighquality.vue')
const MusicListIndex = () =>import('views/discover/discoverChildren/musicListChildren/MusicListIndex.vue')
const Ranking = () => import('views/discover/discoverChildren/Ranking.vue')
const Singer = () => import('views/discover/discoverChildren/Singer.vue')


const Favorite = () => import('views/favorite/Favorite.vue')
const FavoriteAlbum = () => import('views/favorite/favoriteChildren/favoriteAlbum.vue')
const FavoriteSinger = () => import('views/favorite/favoriteChildren/favoriteSinger.vue')
const FavoriteVideo = () => import('views/favorite/favoriteChildren/favoriteVideo.vue')

const MusicListDetail = () => import('views/musicListDetail/musicListDetail.vue')
const SingerDetail = () => import('views/SingerDetail/SingerDetail.vue')
const Album = () => import('views/album/Album.vue')

const RecommendDaily = () => import('views/recommend/RecommendDaily.vue')


const Video = () => import('views/video/Video.vue')
const VideoList = () => import('views/video/videoChildren/videoList.vue')
const MvList = () => import('views/video/videoChildren/mvList.vue')

const VideoDetail = () => import('views/videoDetail/videoDetail.vue')

const Search = () => {'views/search/Search.vue'}
const SearchSong = () => import('views/search/searchChildren/SearchSong.vue')
const SearchSinger = () => import('views/search/searchChildren/SearchSinger.vue')
const SearchAlbum = () => import('views/search/searchChildren/SearchAlbum.vue')
const SearchVideo = () => import('views/search/searchChildren/SearchVideo.vue')
const SearchMusicList = () => import('views/search/searchChildren/SearchMusicList.vue')
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        component: Discover,
        redirect: '/discover/recommend',
        
        children: [
          {
            path: '/discover/recommend',
            component: RecommendMusic
          },
          {
            path: '/discover/musiclist',
            component: MusicList,
            redirect: '/discover/musiclist/musiclistindex',
            children: [
              {
                path: '/discover/musiclist/musiclistindex',
                component:MusicListIndex
              },
              {
                path: '/discover/musiclist/musiclisthightquality',
                component: MusicListHighquality
              }
            ]
          },
          { path: '/discover/ranking', component: Ranking },
          { path: '/discover/singer', component: Singer },
        ]
      },
      {
        path: '/video',
        component: Video,
        redirect: '/video/videoList',
        children: [
          {
            path: '/video/videoList',
            component: VideoList,
          },
          {
            path: '/video/mvList',
            component: MvList,
          }
        ]
      },
      {
        path: '/recommend',
        component: RecommendDaily
      },
      {
        path: '/favorite',
        component: Favorite,
        redirect: '/favorite/favoriteAlbum',
        children: [
          {
            path: '/favorite/favoriteAlbum',
            component: FavoriteAlbum
          },
          {
            path: '/favorite/favoriteSinger',
            component: FavoriteSinger
          },
          {
            path: '/favorite/favoriteVideo',
            component: FavoriteVideo
          }
        ]
      },
      {
        path: '/musicListDetail/:id', 
        name: 'musicListDetail',
        component: MusicListDetail
      },
      {
        path: '/singerDetail/:id',
        name: 'singerDetail',
        component: SingerDetail
      },
      {
        path: '/videoDetail/:id/:type',
        name: 'videoDetail',
        component: VideoDetail
      },
      {
        path: '/Album/:id',
        name: 'Album',
        component: Album
      },
      {
        path: '/search/:id',
        name: 'search',
        component: Search,
        redirect: '/search/searchsong/:id',
        children: [
          { path: '/search/searchsong/:id', name: 'searchSong', component: SearchSong },
          { path: '/search/searchsinger/:id', name: 'searchSinger', component: SearchSinger },
          { path: '/search/searchalbum/:id', name: 'searchAlbum', component: SearchAlbum },
          { path: '/search/searchvideo/:id', name: 'searchVideo', component: SearchVideo },
          { path: '/search/searchmusiclist/:id', name: 'searchMusicList', component: SearchMusicList },
                ]
      }
    ]
  }

]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
