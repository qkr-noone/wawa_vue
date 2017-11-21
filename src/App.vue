<template ref="template">
  <div id="app" ref="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="m_nav" id="nav">
        <div class="m_menu" id="menu" @click="nav()" v-bind:class="{'trans': isTr}"><span></span></div>
        <transition name="fade">
          <ul class="m_menu_list" id="menu_list" v-show="navToggle" @touchmove.prevent >
            <li class="bolder goto" v-for="(item,index) in navList" :class="{cur: activeName == item.url }" @click="navTip()"  >
                <router-link :to="'/'+item.url">{{item['name']}}
                  <span>{{item['nameE']}}</span>
                  <i class="icon-next"></i>
                </router-link>
            </li>
          </ul>
        </transition>        
    </div>

    <div>
  
      <div class="m_audio" id="wa_audio" v-bind:class="{'show_songlist': isSongList}" >
        <img class="m_audio_cover" :src="playerData.res_cover + '?width=88'" @click="open(playerData.id)" />
        <ul class="m_audio_info" @click="open(playerData.id)">
          <li class="m_audio_songname bolder">{{playerData.songname}}</li>
          <li class="m_audio_singer">{{playerData.singer}}</li>
        </ul>
        <span class="m_audio_btns">
          <i v-bind:class="playState ? 'icon-pause':'icon-play'" @click="playPause()"></i>   <!-- icon-pause -->
          <i class="icon-player_next" id="audio_playlist" @click="next()"></i> <!-- :class="singleState ? 'icon-list-state' : ''" -->
        </span>     
      
        
      </div>
  
    </div>

    <!-- 遮罩层导航菜单列表 -->
    <div class="m_audio_playlist_demask-nav" id="navlist_demask" ref="demask" v-if="isDemaskNav" @click="hiddenNavList()" @touchmove.prevent> 
    </div>
    <!-- 
        preload="metadata" controls="controls" style="height: 20px;width:100%;display: block; position: fixed;bottom: 68px;"    -->
    <audio ref="audio" id="audio" :src="playerData.file320" @ended="audioEnd()" >
    </audio>
  </div>
</template>

<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
import router from './router'
import swipe from './components/home/swipe'
import Scroll from './components/scroll/scroll'
import { Swipe,SwipeItem,InfiniteScroll,Lazyload,Toast } from 'mint-ui'

export default {
  name: 'app',
  components: { swipe, Scroll},
  data() {
    return{
      navList:[ //导航菜单列表
        {name:'首页 · ',nameE:'HOMEPAGE',url:''},
        {name:'乐人 · ',nameE:'ARTIST',url:'artist'},
        {name:'乐文 · ',nameE:'ARTICLE',url:'article'},
        {name:'猎乐 · ',nameE:'HUNTING',url:'hunting'},
        {name:'',nameE:'',url:''},//使用横条居中
        {name:'App · ',nameE:'DOWNLOAD',url:'download'},
        {name:'关于 · ',nameE:'ABOUT',url:'about'}
      ],
      activeName: '', //导航菜单状态
      
      isSongList:true, //歌曲列表icon
      
      defaultData: {
        res_cover: 'http://up.wawa.fm/18,01085cf606b183',
        songname: '挖哇电台',
        singer: '随便听听，也许有惊喜',
        file320: ''
      }      
    }
  },
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },

  created() {
    if(!isMobile()){
      if(this.$route.path === '/home'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!home'
      } else if(this.$route.path === '/artist'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!artistList'
      } else if(this.$route.path === '/artist/detail'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!artistInfo/artistid=' + this.$route.query.id
      } else if(this.$route.path === '/article'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!articleList'
      } else if(this.$route.path === '/article/detail'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!articleInfo/id=' + this.$route.query.id
      } else if(this.$route.path === '/hunting'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!volList'
      } else if(this.$route.path === '/hunting/detail'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!volInfo/id=' + this.$route.query.id
      } else if(this.$route.path === '/recomm-single'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!musicList'
      } else if(this.$route.path === '/recomm-single/detail'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!musicInfo/id=' + this.$route.query.id
      } else if(this.$route.name === 'bannerArticle'){
         window.location.href = 'http://wawa.fm/static/wawa/index.html#!articleInfo/id=' + this.$route.params.id
      } else if(this.$route.path === '/download'){
         window.location.href = 'http://wawa.fm/static/wawa/app.html'
      } else if(this.$route.path === '/about'){
         window.location.href = 'http://wawa.fm/static/wawa/about.html'
      } else {
        window.location.href = 'http://wawa.fm/static/wawa/index.html#!home'
      }
    }
    function isMobile () {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true
      } else {
        return false
      }
    }

    // this.$route.query.track = 17050000132
    // 单曲进入
    if (this.$route.query.track) {
      const singId = this.$route.query.track
      const user_id = 0
      const timestamp = Date.parse(new Date()) / 1000
      const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/track/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')
      axios({
        method: 'get',
        // urlApi=http://wawa.fm
        url: 'urlApi/app/v1/track/info',
        params: {
          api_key: '0fcf845a413e11beb5606448eb8abbc4',
          timestamp: timestamp,
          user_id: user_id,
          id: singId
        },
        headers:{
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization':'wawa ' + token
        }
      }).then( rtn => {
          this.setPlayerData(rtn.data)
          this.setPlayState(true)
      })
    } else {
      // 歌单

      //默认歌单
      this.playList.push(this.defaultData)
      this.setPlayerData(this.playList[this.currentIndex+1])
      // this.setPlayState(false)
      // currentIndex 默认为-1 
      //替换默认歌单(!!!在created 时才替换  如跳过会push)
      this.loadData()
    }

  },

  mounted() {
    this.setRouterUrl(this.$route.path)

  },

  //  Q: 1. 初始播放按钮.. 2.初始播放列表... 3.播放状态只修改，不刷新时，自动播放...
  methods: {
    
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),

    //菜单
    nav: function () {
      if(!this.isSongList) {
        this.isSongList = true;
      }
      this.setNavToggle(!this.navToggle)
      this.setIsTr(!this.isTr) 
      this.setIsDemaskNav(!this.isDemaskNav)
    },

    navTip() {
      this.setNavToggle(false)
      this.setIsTr(false)
      this.setIsDemaskNav(false)
    },

    selected: function(navUrl) {
      this.activeName = navUrl
    },

    hiddenNavList: function() {
      this.setNavToggle(!this.navToggle)
      this.setIsTr(!this.isTr)
      this.setIsDemaskNav(!this.isDemaskNav)
    },

    open(songId){
      this.setNavToggle(false)
      this.setIsTr(false)
      this.setIsDemaskNav(false)
      router.push({name: 'player', params: { id:songId}})
    },
    //加载播放列表
    loadData() {
      const timestamp = Date.parse(new Date()) / 1000
      const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/home/radio@3ad3ebb04b5c94cd234e16a6aef9c8ae') 
      axios({
        method: 'get',
        // urlApi=http://wawa.fm
        url: 'urlApi/app/v1/home/radio',
        params: {
          api_key: '0fcf845a413e11beb5606448eb8abbc4',
          timestamp: timestamp
        },
        headers:{
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          // 'Access-Control-Allow-Origin':'http://localhost:8080',
          'Authorization':'wawa ' + token
        }
      }).then( rtn => {
          this.setPlayList(rtn.data)
          // console.log(this.playList)
      })
    },

    // 播放暂停
    playPause: function(){
      let audio = this.$refs.audio
      if(this.playState){
        // console.log(22) 点击后暂停
        audio.pause()
        this.setPlayState(false)
      }else{
        if(this.playerData.file320)
        {
          audio.play()
          this.setPlayState(true)
        } else{
          this.setCurrentIndex(0)
          this.setPlayerData(this.playList[this.currentIndex])
          this.setPlayState(true)
        }
      }
    },
    loop: function(){
      this.$refs.audio.play()
      this.setPlayState(true)
    },

    next: function(){
      if(this.playList.length === 1){
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length){
          index = 0
        }
        this.setCurrentIndex(index)
        this.setPlayerData(this.playList[index])
        this.setPlayState(true)
      }      

    },
    
    //播放结束
    audioEnd: function() {
      
      if(this.playList.length){        
        this.next()
      } else{
        this.setPlayState(false)
        console.log('..播放结束')
      }
    },
    //生成电脑随机的GUID
    getGuid(){
        var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
          j = 0,
          k = 0,
          res1 = '',
          res2 = '';
          for (var i = 0; i < 10; i++) {
              j = Math.floor(Math.random() * 36);
              k = Math.floor(Math.random() * 36);
              res1 += data[j];
              res2 += data[k];
          }
          return res1 + new Date().getTime() + res2;
    },
    addCount(){
        const timestamp = Date.parse(new Date()) / 1000
        const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/log/add@3ad3ebb04b5c94cd234e16a6aef9c8ae')
        if(!localStorage.getItem('GUID')){
          localStorage.setItem('GUID', this.getGuid())
        }
        
        axios({
          method: 'post',
          url: 'urlApi/app/v1/log/add',
          data: {
            api_key: '0fcf845a413e11beb5606448eb8abbc4',
            timestamp: timestamp,
            user_id: 0,
            product: 1,
            platform: 3,
            source_type: 1,
            source_id: this.playerData.id,
            unionid: localStorage.getItem('GUID'),
            category: 1
          },
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
          // console.log(rtn.data)
        }).catch( rtn => {
          // console.log(rtn.error)
        })
    }

  },

  watch: {
    playState(newState){
      let audio = this.$refs.audio
      this.$nextTick(() => {
        newState ? audio.play() : audio.pause()
      })
    },

    playerData(newSong, oldSong){
      clearTimeout(this.timer)
      this.timer = setTimeout( () => {
        this.$refs.audio.play()
      }, 1000)
    },

    //nav导航样式
    routerUrl(newUrl){
      if (this.$route.path=='/artist'||this.$route.path=='/artist/detail') {
        this.selected('artist')
      } else if (this.$route.path=='/article'||this.$route.path=='/article/detail') {
        this.selected('article')
      } else if (this.$route.path=='/hunting'||this.$route.path=='/hunting/detail') {
        this.selected('hunting')
      } else if (this.$route.path=='/download') {
        this.selected('download')
      } else if (this.$route.path=='/about') {
        this.selected('about')
      } else {
        this.selected('')
      }
    },
    currentIndex(chooseIndex){
      this.addCount()
    }
  }

}
</script>

<style lang="scss" scoped>
/*app*/
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

/* nav-fade*/
  .fade-enter-active {
    transition: all .3s cubic-bezier(1.0, 1.0, 0.5, 0.5);
  }
  .fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter {
    padding-left: 100px;
    opacity: 0;
  }
  .fade-leave-active {
    padding-left: 100px;
    opacity: 0;
  }

/*nav菜单*/
  .m_nav{ background-color: #000; border-radius: 50%; opacity: 0.8;position: fixed; top: 0.6rem; right: 0.6rem; height: 42px; width: 42px;/* overflow: hidden;*/ transition: width .4s, height .3s ease-out; z-index: 100;}
  .m_nav.open{ width: calc(100% - 24x); height: calc(100% - 92px); box-shadow: 0 0 10px rgba(177, 163, 163, 0.44);}
  .m_menu{ height: 42px; width: 42px; line-height: 42px; text-align: center; float: right; position: relative;}
  .m_menu:after,.m_menu:before{ content: ""; position: absolute; left: 0.511rem;}
  .m_menu:before{ top: 14px;}
  .m_menu:after{ bottom: 14px;}
  .m_menu.trans:before{ -webkit-transform: rotate(45deg) translate(4px, 4px); }
  .m_menu.trans span{background-color: transparent}
  .m_menu.trans:after{ -webkit-transform: rotate(-45deg) translate(4px, -4px);}
  
  .m_menu span { position: relative; display: block; margin: 20px auto 0 auto;}
  .m_menu span,.m_menu:after,.m_menu:before { width: calc(100% - 1rem); height: 3px; background-color: white; transition: all 0.3s; backface-visibility: hidden; border-radius: 4px; z-index: 99999;}

  .m_menu_list { font-size: 20px; position: absolute; right: 0px; z-index: 800;  width: 14.88rem; background-color: #000;  box-sizing: border-box;   padding-top: 66px; padding-bottom: 30px; border-radius: 10px}
  .m_menu_list >li{    color: #ffffff;   text-align: left;    width: calc(100%-62px);    padding-left: 31px;padding-right: 31px;    box-sizing: border-box; padding-top: 10px;padding-bottom: 10px;}
  .m_menu_list >li > a { font-size: 18px; height: 21px; font-family: "PingFangSC-Semibold";width:100%; color:inherit;}
  .m_menu_list >li.cur { color:rgba(98,107,237,1); }
  .m_menu_list >li > a > span{ font-size: 0.6rem; box-sizing: border-box;padding-bottom: 3px; font-weight: normal;letter-spacing: 1px; font-family: "Avenir";}
  .m_menu_list >li > a > i {float: right; font-family: normal;line-height: 21px;font-size: 16px;}
  .m_menu_list >.m_menu_line{ display: block;height: 1px;background: #fff; width: calc(100%-62px); margin: 21px 31px;}
  #menu_list>li:nth-child(5){
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 1px;
    margin-top: 7px;
  }
  #menu_list>li:nth-child(5)> a{
      height: 1px;
      float: left;
      background: white;
      overflow: hidden;
      opacity: 0.6;
  }

/*播放列表*/
  .m_audio{ height: 408px; width: 100%; background-color: #fff; position: fixed; bottom: 0; left: 0; overflow: hidden; box-shadow: 0 -1px 10px rgba(177, 163, 163, 0.23);  z-index: 90; transition: all .4s}
  .m_audio.show_songlist{ margin-bottom: -340px;transition: all .7s ease-in;transition: all .5s ease-out}
  .m_audio.open{ bottom: 400px; }
  .m_audio_cover{ float: left; height: 44px; width: 44px; border-radius: 4px; margin: 12px }
  .m_audio_info{ float: left; height: 44px; overflow: hidden; width: calc(100% - 168px); margin: 12px 0; font-size: 15px;}
  .m_audio_info>li{ width: 100%; text-align: left; overflow: hidden;}
  .m_audio_songname{ height: 28px; line-height: 28px; color: #555; font-size: 15px }
  .m_audio_singer{ height: 16px; line-height: 16px; color: #999; font-size: 12px; }
  .m_audio_btns{ float: right; width: 94px; height: 48px; margin: 10px 0px 10px 0; overflow: hidden; }
  .m_audio_btns>i{ height: 48px; width: 44px; float: left; text-align: center; line-height: 48px;  color: #666 }
  .m_audio_btns .icon-list-state{ opacity: 0.4 }
  .m_audio_btns>i:nth-child(1){ margin-right: 6px; color: #666; font-size: 18px; }
  .m_audio_btns>i:nth-child(2){ font-size: 17px }
  .m_audio_playlist{ height: 400px; clear: both; padding-top: 16px; box-sizing: border-box; overflow: auto;}
  .m_audio_playlist>h1{ height: 20px; line-height: 20px; font-size: 12px; color: #999; padding:0 12px; margin-bottom: 2px; text-align: left;}
  .m_audio_playlist>ul{    margin-bottom: 65px;  }
  .m_audio_playlist>ul>li{ height: 60px; line-height: 60px; font-size: 14px; overflow: hidden;white-space: nowrap; }
  .m_audio_playlist>ul>li>img{ float: left; height: 44px; width: 44px; margin:8px 12px; border-radius: 4px}
  .m_audio_playlist>ul> li>ul{ float: left; height: 44px; overflow: hidden; width: calc(100% - 122px); margin: 8px 0;}
  .m_list_songname{ height: 28px; line-height: 28px; color: #555; font-size: 15px; width: 100% ;text-align: left;}
  .m_list_singer{ height: 16px; line-height: 12px; color: #999; font-size: 12px; width: 100%; text-align: left; white-space: nowrap;}
  .m_audio_playlist_demask{ width: 100%; height: 100%; position: fixed; top: 0; left: 0; background-color: rgba(255,255,255,.6); z-index: 20; }
  .m_audio_playlist_demask-nav{ width: 100%; height: 100%; position: fixed; top: 0; left: 0; background-color: transparent; z-index: 20; }

</style>


