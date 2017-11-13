import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index'
import Artist from '@/views/artist/index'
import ArtistDetail from '@/views/artist/detail'
import Article from '@/views/article/index'
import ArticleDetail from '@/views/article/detail'
import Hunting from '@/views/hunting/index'
import HuntingDetail from '@/views/hunting/detail'
import Download from '@/views/download/index'
import About from '@/views/about/index'
import Join from '@/views/join/index'
import RecommSingle from '@/views/recomm-single/index'
import RecommSingleDetail from '@/views/recomm-single/detail'
import RecommSongList from '@/views/recomm-songlist/index'
import RecommSongListDetail from '@/views/recomm-songlist/detail'
import BannerArticle from '@/views/banner/article'
import Reward from '@/views/reward/index'
import Player from '@/views/player/index'

Vue.use(Router)
export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  },
  routes: [
    {
      path: '/home',
      meta: {
        keepAlive: true
      },
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/artist',
      meta: {
        keepAlive: true
      },
      component: Artist
    },
    {
      path: '/artist/detail',
      meta: {
        keepAlive: true
      },
      component: ArtistDetail
    },
    {
      path: '/article',
      meta: {
        keepAlive: true
      },
      component: Article
    },
    {
      path: '/article/detail',
      meta: {
        keepAlive: true
      },
      component: ArticleDetail
    },
    {
      path: '/hunting',
      meta: {
        keepAlive: true
      },
      component: Hunting
    },
    {
      path: '/hunting/detail',
      meta: {
        keepAlive: true
      },
      component: HuntingDetail
    },
    {
      path: '/download',
      meta: {
        keepAlive: true
      },
      component: Download
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        keepAlive: true
      },
      component: About
    },
    {
      path: '/join',
      meta: {
        keepAlive: true
      },
      component: Join
    },
    {
      path: '/recomm-single',
      meta: {
        keepAlive: true
      },
      component: RecommSingle
    },
    {
      path: '/recomm-single/detail',
      meta: {
        keepAlive: true
      },
      component: RecommSingleDetail
    },
    {
      path: '/recomm-songlist',
      meta: {
        keepAlive: true
      },
      component: RecommSongList
    },
    {
      path: '/recomm-songlist/detail',
      meta: {
        keepAlive: true
      },
      component: RecommSongListDetail
    },
    {
      path: '/banner/article/:id',
      name: 'bannerArticle',
      meta: {
        keepAlive: true
      },
      component: BannerArticle
    },
    {
      path: '/reward/:id',
      name: 'reward',
      meta: {
        keepAlive: true
      },
      component: Reward
    },
    {
      path: '/player',
      name: 'player',
      meta: {
        keepAlive: true
      },
      component: Player
    }
  ]
})
