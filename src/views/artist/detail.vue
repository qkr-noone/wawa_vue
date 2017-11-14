<template>
	<div id="artist-detail">
		<div class="a-detail-header">
      <img :src="detailData.user | imgFormat">
      <span class="mask"></span>
      <div>
        <div class="p-tip">
          <i class="playtracks">
            <i class="icon-play" @click="addPlayList()"></i>
          </i>
          <span>播放音乐人电台</span>
        </div>
        <div class="view">
          <i class="icon-view"></i>
          <span>{{detailData.user | viewFormat}}</span>
          <i class="icon-listen"></i>
          <span>{{detailData.play_total_count}}</span>
        </div>
      </div>
    </div>

    <div class="a-detail-content">    
      <h1 class="bolder">{{detailData.user | nameFormat}}</h1>
      <p class="label-style">
        <span v-for="item in labelsData"><img :src="item.res_cover"></span>
      </p>
      <div class="a-cate">
        <span><i class="bolder">&nbsp;{{detailList.dynamic_count?detailList.dynamic_count:'-'}}&nbsp;&nbsp;</i>动态</span>
        <span><i class="bolder">&nbsp;{{detailList.video_count?detailList.video_count:'-'}}&nbsp;&nbsp;</i>视频</span>
        <span><i class="bolder">&nbsp;{{detailList.photo_count?detailList.photo_count:'-'}}&nbsp;&nbsp;</i>相册</span>
      </div>
      <div class="scroll" v-if="detailList.sign">
        <div class=""></div>
        <p>{{detailList.sign}}</p>
      </div>
      <div class="a-headerimg" v-for="(item, index) in detailData.musicians">
        <div><img :src="item.headimg"></div>
      </div>
      <p class="a-content" :class=" over ? 'show-content' : '' ">
        {{detailList.description}}
      </p>

      <div v-if="detailList.description.length > 118">
        <a class="all-info" @click="allContent()"><span v-if="over">查看</span><span v-else>收起</span>乐人完整介绍</a>
      </div>
    </div>

    <div class="ahot-song" v-if="detailData.tracks.length">
      <h2 class="adetail-title bolder">热门歌曲(<span>{{detailData.tracks.length}}</span>)</h2>
      <ul>
        <li v-for="(item, index) in detailData.tracks">
          <a @click="playSong(index),selected(item)">
            <div><img :src="item.res_cover + '?width=200'"></div>
            <div>
              <h4 class="border" :class="{click: activeName==item }">{{item.songname}}</h4>
              <span v-for="item in detailList.labels" >&nbsp;{{item.label_zh}}</span>
              <span >·&nbsp;{{item.play_count}}&nbsp;次播放</span>
            </div>
          </a>
        </li>
      </ul>
      <!-- <div>
        <router-link class="all-info" to="">查看所有歌曲</router-link>
      </div> -->
    </div>

    <div class="album-list all-info" v-if="detailData.albums.length">
      <h2 class="adetail-title bolder">专辑列表 (<span>{{detailData.albums.length}}</span>)</h2>
      <ul>
        <li v-for="(item, index) in detailData.albums">
          <router-link :to="{path: '/hunting/detail', query:{id: item.id} }">
            <div><img :src="item.res_cover + '?width=200'"></div>
            <h4>{{item.title}}</h4>
            <p>{{item.release_at}}</p>
          </router-link>
        </li>
      </ul>
      <!-- <div>
        <router-link class="all-info" to="">查看更多专辑</router-link>
      </div> -->
    </div>

    <div class="relate-art all-info" v-if="detailData.documents.length">
      <h2 class="adetail-title bolder">相关乐文 (<span>{{detailData.documents.length}}</span>)</h2>
      <ul class="m_alist">
        <li v-for="(item, index) in detailData.documents">
          <router-link :to="{ path:'/article/detail', query: {id: item.id} }">
            <div class="wrap-img"><img :src="item.res_cover + '?width=500'" /></div>
            <h1 class="bolder"> {{detailList.nickname}}：{{ item.title}}</h1>
            <div class="m_listtags ">
              <span>文/ {{item.author}}</span>
              <span>
                <i class="icon-view "></i>
                <a>{{item.view_count}}</a>
              </span>
            </div>
          <p>{{item.description}}{{item.description}}</p>
          </router-link>
        </li>

        <!-- <li v-for="(item, index) in articleData">
          <router-link :to="{ path:'/article/detail', query: {id: item.id} }">
            <div class="wrap-img"><img :src="item.res_cover + '?width=500'" /></div>
            <h1 class="bolder">{{item.from_user_nickname}}：{{ item.title }}</h1>
            <div class="m_listtags">
              <span>文 / {{ item.author }}</span>
              <span>
                <i class="icon-view"></i>
                <p>{{ item.view_count }}</p>
              </span>
            </div>
            <p>{{item.description}}</p>
            </router-link>
          </li> -->

      </ul>
    </div>
	</div>
</template>

<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return{
			detailData: {},
      detailList: {},
      over:true,
      oneTime: true,
      activeName: '',
      labelsData: ''
		}
	},
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl'])
  },
  filters: {
    imgFormat(value){
      if(value){ 
        return value.headimg
      }
    },
    viewFormat(value){
      if (value) {
        return value.view_count
      }
    },
    nameFormat(value){
      if(value){
        return value.nickname
      }
    }
  },
  created() {
    document.title = '乐人 - 独立文艺的音阅社区'
    this.routeChange()
  },
  deactivated () {
    this.$destroy()
  },
  mounted() {
    this.setRouterUrl(this.$route.path)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },

  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl']),

    playSong: function(index) {
      if(this.playList!=this.detailData.tracks){
        this.setPlayList(this.detailData.tracks)
      }
      this.setPlayerData(this.detailData.tracks[index])
      this.setPlayState(true)
      this.setCurrentIndex(index)
      let instance = this.$toast('即将播放..')
      setTimeout(() => {
        instance.close()
      }, 2500)
    },

    addPlayList: function() {
      this.setPlayList(this.detailData.tracks)
      if (this.oneTime) {
        let instance = this.$toast('即将播放..')
        setTimeout(() => {
          instance.close()
        },2500)
        this.oneTime =false
      }
      this.setCurrentIndex(0)
      this.setPlayerData(this.playList[this.currentIndex])
      this.setPlayState(true)
    },

    allContent: function() {
      this.over = !this.over
    },

    selected: function(item) {
      this.activeName = item
    },
    routeChange(){
      const timestamp = Date.parse(new Date()) / 1000
      const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/user/musician_homepage@3ad3ebb04b5c94cd234e16a6aef9c8ae')
      axios({
        method: 'post',
        // urlApi=http://wawa.fm
        url: 'urlApi/app/v1/user/musician_homepage',
        data: {
          id: this.$route.query.id,
          api_key: '0fcf845a413e11beb5606448eb8abbc4',
          timestamp: timestamp        
        },
        //转格式
        transformRequest: [
          function(data){
            let ret = ''
            for (let it in data){
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }
        ],
        headers:{
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization':'wawa ' + token
        }
      }).then( rtn => {
          this.detailData = rtn.data
          console.log(this.detailData)
          this.detailList = this.detailData.user

          if(this.detailData.user){
            this.labelsData = this.detailData.user.labels
          }
      })
    },
    scrollbar:function() {
      this.$nextTick(() => {
        document.body.scrollbar = 10
        console.log(document.body.scrollbar)
      })
    }

  }
}
</script>
<style lang="scss" scoped>
  #artist-detail {
    margin-bottom: 4rem;
  }
  
/*公用*/
  .all-info{
    margin-top: 1.5rem;
    /*margin: 0 auto;*/
    width: 100%;
    text-align: center;
    font-size: 0.7rem;
    font-family: "PingFangSC-Medium";
    color:#626BED;
  }
  .all-info >a {
    width: 5.625rem;
    text-align: center;
  }

  .adetail-title{
    margin-bottom: 0.9rem;
    margin-left: 0.6rem;
    width: 5.425rem;
    height: 1.25rem;
    font-size: 0.9rem;
    color: #555555;
    font-family: "PingFangSC-Semibold"
  }

/* 头部图片*/
  .a-detail-header {
    width: 16rem;
    height: 16rem;
    position: relative;
  }
  .a-detail-header > .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.28);
  }
  .a-detail-header> img {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .a-detail-header> img:after {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    content: url('/static/img/placeholder_2.png?width=320');
  }
  
  .a-detail-header> div {
    position: absolute;
    left: 0.775rem;
    right: 0.6rem;
    bottom: 0.6rem;
    /*border: 1px solid*/
  }
  
  .a-detail-header> div> .p-tip {
    height: 1.5rem;
    float: left;
    color: #ffffff;
    font-family: "PingFangSC-Medium";
    font-size: 0.5rem;
    border: 0.075rem solid #ffffff;
    border-radius: 2.5rem;
  }
  
  .a-detail-header> div>.p-tip >.playtracks{
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    /*background: rgba(0,0,0,1) no-repeat center;*/
    opacity: 0.724;
    border-radius: 50%;
    background-size: 100%;
    cursor: pointer;
    margin-left: 0.6rem;
    margin-right: 0.3rem;
    float: left;
  }
  .a-detail-header> div>.p-tip >.playtracks>i.icon-play {
    line-height: 0.89rem;
    color: rgba(255,255,255,1);
    font-size:0.8rem;
    position: absolute;
    top:0.3rem;
    left: 0.3rem;
    
  }
  .a-detail-header> div>.p-tip >span{
    font-size: 0.5rem;
    margin-right: 0.9rem;
    line-height: 1.5rem;
  }
      
  .a-detail-header> div> .view {
    float: right;
    text-align: center;
    font-size: 0.45rem;
    line-height: 40px;
    color: #ffffff;
  }

  .a-detail-header> div> .view >.icon-listen{
    padding-left: 0.6rem;
    box-sizing: border-box;
  }
  .a-detail-header> div> .view >i {
    padding-right: 0.3rem
  }

  .a-detail-content {
    margin-top: 1rem;
    padding: 0 0.6rem;
  }
  .a-detail-content > h1{
    font-size: 1.1rem;
  }
  .a-detail-content >.label-style{
    margin-top: 0.5rem;
  }
  .a-detail-content >.label-style >span{
    width: 2rem;
    height: 0.8rem;
  }
  .a-detail-content >.label-style >span +span {
    margin-left: 0.6rem;
  }
  .a-detail-content >.label-style >span >img{
    width: 100%;
    height: 100%;
  }
  .a-detail-content >.a-cate{
    margin-top: 0.5rem;
    font-size: 14px;
  }
  .a-detail-content >.a-cate >span{
    width: 2.775rem;
    height: 1.225rem;
    color: #858585;
  }
  .a-detail-content >.a-cate >span >i{
    font-family: 'Avenir-Black';
    color:#555555; 
    font-size: 18px;
    font-style: normal;
  }
  .a-detail-content >.a-cate span+span{
    margin-left: 0.8rem;
  }
  .a-detail-content> .scroll{
    background: #f5f5f5;
    width: 14.8rem;
    height: 1.5rem;
    overflow: hidden;
    border-radius: 2.5rem;
    margin-top: 0.3rem;
    display: inline-block;
    position: relative;
  }
  .a-detail-content> .scroll >div{
    height: 0.3rem;
    width: 0.3rem;
    background: #6F83ED;
    border-radius: 50%;
    margin: 0.6rem 0.3rem 0.6rem 0.6rem;
    float: left;

  }
  .a-detail-content> .scroll> p {
    z-index: 20;
    line-height: 1.5rem;
    height: 100%;
    width: 200%;
    color: #555555;
    font-family: "PingFangSC-Light";
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
   /* position: absolute;
    animation:myfirst 5s linear 2s infinite;
    -webkit-animation:myfirst 4s linear 2s infinite;*/
  }
  @keyframes myfirst
  {
    0%   { left: 1.5rem; }
    100% { left: -18.4rem; }
  }
  @-webkit-keyframes myfirst
  {
    0%   { left: 1.5rem; }
    100% { left: -18.4rem; }
  }

  .a-detail-content> .a-headerimg{
    margin-top: 0.9rem;
    height: 2.4rem;
    float: left;
    /*overflow: hidden;*/
  }
  .a-detail-content> .a-headerimg> div{
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    overflow: hidden;
    float: left;
  }
  .a-detail-content> .a-headerimg >div> img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
  }
  .a-detail-content> .a-headerimg >div + div{
    margin-left: 0.6rem
  }
  .a-content {
    padding-top: 0.9rem;
    width: 14.8rem;
    font-family: "PingFangSC-Light";
    color: #555555;
    font-size: 0.7rem;
    line-height: 1.2rem;    
  }
  .show-content{
    overflow: hidden;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

/*热门歌曲*/
  .ahot-song{
    margin-top: 1.5rem;
    font-family: "PingFangSC-Medium";
  }
  .ahot-song > ul{
    margin-top: 0.45rem;
    width: 100%;
  }
  .ahot-song > ul >li {
    padding: 0.45rem 0.6rem;
  }
  .ahot-song > ul >li> a{

  }
  .ahot-song > ul >li> a >div:nth-child(1){
    width: 60px;
    height: 60px;
    float: left;
    overflow: hidden;
    border-radius: 0.3rem;
  }
  .ahot-song > ul >li> a >div:nth-child(1) > img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
  }
  .ahot-song > ul >li> a >div:nth-child(2){
    margin-left: 0.9rem;
    float: left;
    overflow:hidden;
  }
  .ahot-song > ul >li> a >div:nth-child(2) h4{
    font-size: 0.7rem;
    color: #555555;
    padding-top: 0.44rem;
    padding-left: 0.15rem;
    width: 10.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
   .ahot-song > ul >li> a >div:nth-child(2) span{
    color: #999999;
    font-size: 12px;
    padding-bottom: 0.4rem;
     padding-top: 0.3rem;
   }

   .click{
    color: #6178F0 !important;
  }

/*专辑列表*/
  .album-list> ul {
    overflow: hidden;
    font-family: "PingFangSC-Medium";
    padding:0 0.6rem;
  }
  .album-list> ul >li {
    width: 7.1rem;
    padding-bottom: 0.95rem;
    float: left;
    overflow: hidden;
  }
  .album-list> ul >li:nth-child(even){
    margin-left: 0.6rem;
  }
  .album-list> ul >li >a >div{
    overflow: hidden;
  }
  .album-list> ul >li >a >div:nth-child(1){
    width: 7.1rem;
    height: 7.1rem;
    border-radius: 8px;
  }
  .album-list> ul >li >a >div img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
  }
  .album-list> ul >li> a> h4{
    font-size: 0.7rem;
    color: #555555;
    padding-top: 0.44rem;
    text-align: left;
  }
  .album-list> ul >li> a > p{
    color: #999999;
    font-size: 12px;
    padding-top: 0.1rem;
    text-align: left;
    font-family: "PingFangSC-Light"
   }

/*相关乐文*/
  .m_alist {
    padding: 0 0.6rem;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
  }
  
  .m_alist>li {
    width: 100%;
    overflow: hidden;
  }
  
  .m_alist>li >a {
    width: 100%;
    overflow: hidden;
  }
  
  .m_alist>li+li {
    box-sizing: border-box;
    padding-top: 1.35rem;
  }
  
  .m_alist>li>a>.wrap-img {
    width: 14.8rem;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .m_alist>li>a>.wrap-img>img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
  }
  
  .m_alist>li>a>h1 {
    line-height: 27px;
    color: #555;
    font-size: 18px;
    padding: 14px 0 8px 0;
    text-align: justify;
  }
  
  .m_alist>li>a>p {
    font-size: 14px;
    font-size: 14px;
    color: #666;
    line-height: 22px;
    margin-top: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
  
  .m_listtags {
    overflow: hidden;
    height: 0.8rem;
    line-height: 0.8rem;
    font-family: "PingFangSC-Regular";
  }
  .m_listtags>span {
    height: 0.8rem;
    line-height: 0.8rem;
    overflow: hidden;
    font-size: 0.6rem;
    color: #999999;
  }
  .m_listtags>span:nth-child(1) {
    float: left;
    margin-right: 0.6rem;
  }
  .m_listtags>span:nth-child(2){
    width: 10rem;
  }
  .m_listtags>span:nth-child(2)>i {
    float: left;
    margin-right: 0.325rem;
    line-height: 0.8rem;
  }
  .m_listtags>span>a,
  .m_listtags>span>i {
    height: 0.7rem;
    line-height:0.7rem;
    float: left;
  }
  .m_listtags>span>i {
    margin-right: 0.15rem;
    color: #cccccc;
    font-size: 0.45rem;
  }
  .m_listtags>span>img {
    float: left;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 0.45rem;
    margin-right:1.5px;
  }
</style>
