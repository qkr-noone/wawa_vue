<template>
  <div id="index" style="max-width: 640px;">

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <div class="container" >    

      <!-- banner -->
      <div class="banner" id="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in banners"><img :src="item['res_cover'] +'?width=500'" @click="getH(item.link)"></mt-swipe-item>
        </mt-swipe>
      </div>

      <!-- 推荐乐人 -->
      <div class="m_box m24">
        <recomTitle :titleDoc="{title:'推荐乐人',to:'/article'}"></recomTitle>
        <ul class="m_alist">
          <recomBox :item="singerDocument"></recomBox>
        </ul>
      </div>
      
      <!-- 最新入驻 -->
      <div class="m_box m24">
        <recomTitle :titleDoc="{title:'最新入驻',to:'/artist'}"></recomTitle>
        <ul class="m_blist" id="musician_news">
          <div>
            <newList :item="item" v-for="(item,index) in musicianNews"></newList>
          </div>          
        </ul>
      </div>

      <!-- 音乐合辑 -->
      <div class="m_box m24">
        <recomTitle :titleDoc="{title:'猎乐合辑',to:'/hunting'}"></recomTitle>
        <ul class="m_alist" id="albumBox">
          <albumBox :album="album"></albumBox>
        </ul>
      </div>

      <!-- 推荐单曲 -->
      <div class="m_box m24">
        <recomTitle :titleDoc="{title:'推荐单曲',to:'/recomm-single'}"></recomTitle>
        <ul class="m_blist" id="tracks">
          <div>
            <recomSingle :item="item" v-for ="(item,index) in tracks"></recomSingle>
          </div>          
        </ul>
      </div>            

      <!-- 推荐歌单 -->
      <div class="m_box m24">
        <recomTitle :titleDoc="{title:'推荐歌单',to:'/recomm-songlist'}"></recomTitle>
        <ul class="m_clist">
          <recomSongList :item="item" v-for ="(item, index) in userPlayList"></recomSongList>
        </ul>

      </div>
      
    </div>
  </div>
</template>

<script type="es6">
import { vueH5 } from '../../common/utils'
import router from '../../router'
import { mapState, mapMutations } from 'vuex'
import recomBox from '../../components/recomBox'
import albumBox from '../../components/albumBox'
import recomTitle from '../../components/recomTitle'
import newList from '../../components/newList'
import recomSingle from '../../components/recomSingle'
import recomSongList from '../../components/recomSongList'

export default {
  data(){
    return {
      homeData:'', //首页所有资源
      banners:[], //滚动banner
      singerDocument:'', //推荐乐人
      musicianNews:[], //最新入驻
      musicStyle:'', //入驻音乐人歌曲类别
      album:'', //猎乐
      tracks:[], //推荐单曲
      userPlayList:[] //推荐歌单
    }
  },
  components: {
    recomBox,
    recomTitle,
    albumBox,
    newList,
    recomSingle,
    recomSongList
  },
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },
  created() {
    vueH5.taskAxios({
      method: 'get',
      url: 'home/listen'
    },( rtn => {
        this.homeData = rtn.data
        this.banners = this.homeData.banners
        this.singerDocument = this.homeData.document
        this.musicianNews = this.homeData.musician_news
        this.album = this.homeData.album
        this.tracks = this.homeData.tracks
        // 这里的homeData.user_playlist 已被删除了一部分
        this.userPlayList = this.homeData.user_playlist.splice(0, 6)        
    }))
  },
  activated() {
    this.setRouterUrl(this.$route.path)
  },
  deactivated() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.setNavToggle(false)
    this.setIsTr(false)
    this.setIsDemaskNav(false)
  },
  mounted() {
    let audio = document.getElementById("audio")
    this.audio = audio
    if(this.$route.path){
      this.setRouterUrl(this.$route.path)
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
    getH: function (Uid){
      router.push({name: 'bannerArticle', params: { id: Uid }})
    }
    
  }
}
</script>
<style lang='scss' scoped>
/*banner*/
  div.mint-swipe{
    height: 55VW;
    visibility: visible;
    background: url(/static/h5/static/img/placeholder_2.png?width=500);
  }
  div:focus,ul:focus,li:focus,a:focus,h1:focus,h2:focus,h3:focus,h4:focus,p:focus,span:focus,button:focus,i:focus{outline: none;}
  .mint-swipe-items-wrap > div >img{  
    width:100%;
  }
  
  /*.mint-swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 0;
    bottom: -3px;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    background: #E8EBFB;
  }
  .mint-swipe-indicator {
    width: 8px;
    height: 3px;
    display: inline-block;
    background: transparent;
    opacity: 1;
    margin: 0 0;
    flex-grow: 1;
    -webkit-flex-grow: 1;
    position: relative;
  }
  .mint-swipe-indicator.is-active {
    background: #6F83ED;
  }
*/
  

/*公共样式*/
  .container{
    margin-bottom: 88px;
    font-size: 15px;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  @font-face{ font-family: "AvenirLTStd-Light"; src: url('../../../../fonts/AvenirLTStd-Light.otf')}   
  @font-face{ font-family: "AvenirLTStd-Medium"; src: url('../../../../fonts/AvenirLTStd-Medium.otf')}
  @font-face{ font-family: "AvenirLTStd-Black"; src: url('../../../../fonts/AvenirLTStd-Black.otf')}

  .center{ text-align: center; }
  .clear{ height: 1%; clear: both;} .fl{ float: left; } .fr{ float: right; } .hide{ display:none} .show{ display:block} .fc333{ color: #333 } .fc555{ color: #555 } .fc666{ color: #666 } .fc999{ color: #999 } .fmajor{ color: #6F84EE } .active{ color: #6178F0 } .fs18{ font-size: 18px } .fs16{ font-size: 16px } .fs14{ font-size: 14px }

  .fs12{ font-size: 12px }
  .touch:active{ box-shadow: inset 0 0 1000px rgba(0, 0, 0, .1);}
  .hide{ display: none }
  .page{ opacity: 0; -webkit-transition: opacity .3s ease-out; }
  .page.show{ opacity: 1; }
  .bolder{ font-weight: bolder; font-family: "AvenirLTStd-Medium","Roboto-Light","PingFangSC-Medium","Microsoft YaHei",Helvetica,sans-serif;}
  .m24{ margin: 24px 0 }

  .m_box{ box-sizing: border-box; }
  .m_box_title{ height: 60px; overflow: hidden; }
  .m_box_title>h1{ height: 60px; line-height: 62px; margin-left: 12px; font-size: 20px; float: left; color: #555; }
  .m_box_title>a{ height: 44px; padding: 0 12px 0 40px; margin: 8px 0; float: right; color: #bbb; text-align: center; line-height: 44px; }


/* 最新入驻 推荐单曲*/
  .m_blist{ box-sizing: border-box; overflow: hidden; }
  .m_blist> div {padding: 0 12px; }

/* 隐藏滚动条*/
  #musician_news,#tracks {overflow: hidden;}
  #musician_news > div,#tracks > div{white-space: nowrap; overflow-x: auto; height: 110%;}
  #musician_news > div::-webkit-scrollbar,#tracks > div::-webkit-scrollbar{ width: 0px; height: 0px;  background-color:transparent;}
  #musician_news > div::-moz-scrollbar,#tracks > div::-moz-scrollbar{ width: 0px; height: 0px; background-color:  transparent;}
  #musician_news > div::-ms-scrollbar,#tracks > div::-ms-scrollbar{ width: 0px; height: 0px; background-color:  transparent;}
  #musician_news > div::-o-scrollbar,#tracks > div::-o-scrollbar{ width: 0px; height: 0px; background-color:  transparent;}
  #musician_news > div::scrollbar,#tracks > div::scrollbar{ width: 0px; height: 0px; background-color:transparent;}
  #musician_news > div> li,#tracks > div > li{ display: inline-block; float: initial;}
  #tracks > div > li >button { background: transparent;border: none; }
  #musician_news > div > li:last-child,#tracks > div > li:last-child{margin-right: 0}

/*推荐乐人 音乐合辑*/
  .m_alist {
    padding: 0 0.6rem;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
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
      margin-right: 1.024rem;
    }
    .m_listtags>span:nth-child(2){
      width: 10rem;
    }
    .m_listtags>span:nth-child(2)>i {
      float: left;
      margin-right: 0.256rem;
    }
    .m_listtags>span:nth-child(2)>p {
      float: left;
      line-height: 0.8rem;
      height: 0.8rem;
    }
    .m_listtags>span>a,
    .m_listtags>span>i {
      height: 0.8rem;
      line-height:0.8rem;
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

/*推荐歌单*/
  .m_clist {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    padding: 0 0.6rem;
    margin-top: -0.6rem;
  }
  
  
  #add-top{margin-top: -0.6rem;}
</style>

