<template>
  <div id="index" style="max-width: 640px;">

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <div class="container" >    

      <!-- banner -->
      <div class="banner" id="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in banners"><img :src="item['res_cover']" @click="getH(item.link)"></mt-swipe-item>
        </mt-swipe>
      </div>

      <!-- 推荐乐人 -->
      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">推荐乐人</h1>          
          <router-link to="/article"><i class="icon-next" ></i></router-link>
        </header>
        <ul class="m_alist">
          <!-- to 乐人详情页加id singerDocument.id -->
          <li>
          <router-link :to="{path:'/article/detail', query:{id: singerDocument.id}}">
            <div class="wrap-img"><img :src="singerDocument.res_cover" /></div>
            <h1 class="bolder">{{singerDocument.nickname}}：{{ singerDocument.title }}</h1>
            <div class="m_listtags">
              <span>文 / {{ singerDocument.author }}</span>
              <span>
                <i class="icon-view"></i>
                <p>{{ singerDocument.view_count }}</p>
              </span>
            </div>
            <p>{{singerDocument.description}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      
      <!-- 最新入驻 -->
      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">最新入驻</h1>
          <router-link to="/artist"" ><i class="icon-next" ></i></router-link>
        </header>
        <ul class="m_blist" id="musician_news">
          <div>
            <li v-for="(item,index) in musicianNews" to="">
            <router-link :to="{path:'/artist/detail',query:{id: item.id} }">
                <div><img :src="item['headimg']+'?width=300'" href="item['id']"/></div>
                <h1 class="bolder">{{ item['nickname'] }}</h1>
                <h2>{{item['labels']['0']['label_en']}}</h2>
            </router-link>
            </li>
          </div>          
        </ul>
      </div>

      <!-- 音乐合辑 -->
      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">猎乐合辑</h1>
          <router-link to="/hunting"><i class="icon-next"></i></router-link>
        </header>
        <ul class="m_alist">
          <li>
          <router-link :to="{path:'/hunting/detail',query:{id: album.id}}">
            <div class="wrap-img"><img :src="album.res_cover" /></div>
            <h1 class="bolder">{{album.title}}</h1>
            <div class="m_listtags">
              <span>第{{album.number}}期</span>
              <span>
                <i class="icon-listen"></i>
                <p>{{album.play_count}}</p>
              </span>
            </div>
            <!-- 限制字数 -->
            <p>{{album.description}}</p>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 推荐单曲 -->
      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">推荐单曲</h1>
          <router-link to="/recomm-single"><i class="icon-next" ></i></router-link>
        </header>
        <ul class="m_blist" id="tracks">
          <div>
            <li v-for ="(item,index) in tracks">
            <router-link :to="{ path:'/recomm-single/detail',query:{id: item.id} }">
              <div>
                <img :src="item['res_cover']+'?width=300'" />
              </div>
              <h1 class="bolder">{{item['songname']}}</h1>
              <h2>{{item['singer']}}</h2>
              <button  @click.stop="recomPlay(item)"  @click.prevent ><i class="icon-play"></i></button>
              </router-link>
            </li>
          </div>          
        </ul>
      </div>            

      <!-- 推荐歌单 -->
      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">推荐歌单</h1>
          <router-link to="/recomm-songlist"><i class="icon-next"></i></router-link>
        </header>
        <ul class="m_clist">
          <li v-for ="(item, index) in userPlayList">
          <router-link :to="{ path:'/recomm-songlist/detail', query: { id: item.id} }">
            <div class="wrap">
              <img :src="item['res_cover']+'?width=300'"/>
            </div>
            <h1 class="bolder">{{item['title']}}</h1>
            <div class="m_c">
            <!-- 图片跨度 -->
              <span>
                <div class="mc-wrap"><img :src="item['headimg']"></div>
                <span>{{item['nickname']}}</span>
              </span>
              <span>
                <i class="icon-listen"></i>
                <span>&nbsp;{{item['play_count']}} </span>
              </span>
            </div>
          </router-link>
          </li>
        </ul>

      </div>
      
    </div>
  </div>
</template>

<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import router from '../../router'
import { mapState, mapMutations } from 'vuex'

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
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },
  created() {

    const timestamp = Date.parse(new Date()) / 1000
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/home/listen@3ad3ebb04b5c94cd234e16a6aef9c8ae') 
    axios({
      method: 'get',
      // urlApi=http://wawa.fm
      url: 'urlApi/app/v1/home/listen',
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
        this.homeData = rtn.data
        this.banners = this.homeData.banners
        this.singerDocument = this.homeData.document
        this.musicianNews = this.homeData.musician_news
        this.album = this.homeData.album
        this.tracks = this.homeData.tracks
        // 这里的homeData.user_playlist 已被删除了一部分
        this.userPlayList = this.homeData.user_playlist.splice(0, 6)        
    })
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
    },
    recomPlay(item){
      this.setPlayerData(item)
      let tip = false
      this.playList.forEach((data)=>{
        if(data.id === item.id){
          return tip = true
        }
      })

      if(!tip){
        this.playList.splice(this.currentIndex+1, 0,item)
        let instance = this.$toast('即将播放')
        setTimeout(() =>{
          instance.close()
        },2500)
      }
      this.audio.play()
      this.setPlayState(true)
      return false
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
  .m_blist> div > li{ width: 32%; float: left; margin-right: 28px; overflow: hidden; }
  .m_blist> div > li >a{ position: relative; overflow: hidden; width: 100%;}
  .m_blist> div > li>a>button{ height: 36px; width: 36px; position: absolute; bottom: 50px; right: 0;     background: transparent;}
  .m_blist> div > li:last-child>a>button{
    margin-right: 8px;
  }
  .m_blist> div > li>a>button>i{ width: 22px; height: 24px; background-color: rgba(0,0,0,.4); border-radius: 24px; margin: 6px; color: #fff; text-align: center; line-height: 24px; font-size: 10px; padding-left: 2px }
  .m_blist> div > li>a>div{
    border-radius: 8px;
     overflow: hidden;
     width: 4.792rem; 
     height: 4.792rem; 
     visibility: visible;
     background: url(/static/h5/static/img/placeholder_1.png?width=500);
   }
  .m_blist> div > li>a>div> img{width: 100%;height: 100%;background-repeat: no-repeat center;min-height: 4rem; background: url(/static/h5/static/img/placeholder_1.png?width=500);}
  .m_blist> div > li>a>div> img:after{width: 100%;height: 100%;background-repeat: no-repeat center;min-height: 4rem; content: url(/static/h5/static/img/placeholder_1.png?width=500);}
  .m_blist> div > li>a>h1{ line-height: 20px; height: 20px; overflow: hidden; color: #555; font-size: 13px; margin-top:8px; text-align: left;text-overflow: ellipsis;}
  .m_blist> div > li>a>h2{ line-height: 20px; height: 20px;text-overflow: ellipsis; font-size: 12px; color: #999999; margin-bottom:2px;  text-align: left; white-space: nowrap;overflow: hidden;}

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
  
  .m_alist>li {
    width: 100%;
    overflow: hidden;
  }
  
  .m_alist>li a {
    width: 100%;
    overflow: hidden;

  }
  
  .m_alist>li+li {
    box-sizing: border-box;
    padding-top: 0.8rem;
  }
  
  .m_alist>li>a>.wrap-img {
    width: 14.8rem;
    border-radius: 10px;
    overflow: hidden;
    height: 9.03rem;
  }
  
  .m_alist>li>a>.wrap-img>img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
    background: url(/static/h5/static/img/placeholder_1.png?width=420);
  }

  .m_alist>li>a>h1 {
    line-height: 27px;
    color: #555;
    font-size: 18px;
    padding: 14px 0 4px 0;
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
  
  .m_clist>li {
    width: 7.1rem;
    padding-top: 0.6rem;
    float: left;
    overflow: hidden;
  }

  .m_clist>li:nth-child(even){
    margin-left: 0.6rem;
  }
  
  .m_clist>li>a {
    width: 100%;
    overflow: hidden;
  }
  
  .m_clist>li>a>.wrap {
    width: 7.1rem;
    height: 7.1rem;
    border-radius: 10px;
    overflow: hidden;    
  }
  
  .m_clist>li>a>.wrap>img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
    background: url(/static/h5/static/img/placeholder_1.png?width=500);
  }

  
  .m_clist>li>a>h1 {
    overflow: hidden;
    color: #555;
    text-align: left;
    height:  1.8rem;
    width: 100%;
    font-size: 0.6rem;
    margin: 8px 0;
    line-height: 0.9rem;
    color: #555555;
    font-family: "PingFangSC-Light";
  }
  .m_clist>li a>.m_c{
    overflow: hidden;
    height: 1.023rem;
    line-height: 1.023rem;
    color:#999999;
    font-size: 12px;
    text-align: center;
  }
  .m_clist>li a>.m_c>span:nth-child(1){
    float: left;
    height: 100%;
  }
  .m_clist>li a>.m_c>span:nth-child(1)> .mc-wrap{
    height: 100%;
    overflow: hidden;
    border-radius: 100%;
    float: left;
  }
  .m_clist>li a>.m_c>span:nth-child(1)> span{
    margin-left: 0.3rem;
    width: 3.5rem;
    overflow: hidden;
    text-align: left;
    height: 100%;
  }
  .m_clist>li a>.m_c>span:nth-child(1)> .mc-wrap>img{
    height: 100%;
  }
  .m_clist>li a>.m_c>span:nth-child(2){
    float: right;
  }
  .m_clist>li a>.m_c>span:nth-child(2)> i.icon-listen{
    font-size: 10px;
    color: #cccccc;
  }

  #add-top{margin-top: -0.6rem;}
</style>

