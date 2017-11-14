<template>
  <div id="article-detail">
    <div class="header-artic-detail">
      <div class="header-song">
        <div ref="rotaD" class="rotate" :class=" iconState ? 'running' :'pause'">
          <img ref="imgContent" src="static/img/placeholder_1.png"> <!-- detailData.res_cover -->
        </div>
        <i class="playtrack"><i class="icon-play"  @click="playPause()"></i></i> 
        <!-- :class=" iconState ? 'icon-pause' :'icon-play'" -->
      </div> 
      <h1 class="bolder">
        <p>{{detailData.from_user_nickname}} : </p><p>{{detailData.title}}</p>
      </h1>
      <div class="m_listtags ">
        <span>文 / {{detailData.author}} </span><span> <i class="icon-view"></i><a>{{detailData.view_count}}</a>
        </span>
      </div>
    </div>
    <div class="content" v-html="detailData.content" @click="addSongPlay($event)">
      {{detailData.content}}
    </div>
  </div>
</template>


<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
export default {
	name: 'article-detail',
	data(){
		return{
			detailData: '', //全部数据
      iconState: false, //播放按钮状态 默认为暂停
      activeName: ''
		}
	},
  created() {
    document.title = '乐文 - 独立文艺的音阅社区'
  },
  deactivated () {
    this.$destroy()
  },
  mounted() {
    this.routeChange()    
    this.setRouterUrl(this.$route.path)
    console.log(this.$refs.imgContent)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    // this.$refs.imgContent.style.content = 'url(this.detailData.res_cover)'
  },

  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl'])
  },
  // Q  1.按钮同步...  2.旋转暂停...  3. 嵌套播放单曲...
  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl']),
    playPause: function() {
      
      this.setPlayerData(this.detailData.track)

      let tip = false
      this.playList.forEach((item)=>{
        if(item.id === this.detailData.track.id){
          return tip = true
        }
      })

      if(!tip){
        this.playList.splice(this.currentIndex+1, 0,this.detailData.track)
        let instance = this.$toast('即将播放')
        setTimeout(() =>{
          instance.close()
        },2500)
      }
      this.setPlayState(true)
      
      /*if(!this.iconState) {
        
        this.iconState = true
      } else {
        this.iconState = false
        this.setPlayState(false)
      }*/
    },
    routeChange() {
      const user_id = 0
      const timestamp = Date.parse(new Date()) / 1000
      const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/doc/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    
      axios({
        method: 'get',
        url: 'urlApi/app/v1/doc/info',
        params: {
          api_key: '0fcf845a413e11beb5606448eb8abbc4',
          timestamp: timestamp,
          user_id: user_id,
          id: this.$route.query.id
        },
        headers:{
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization':'wawa ' + token
        }
      }).then( rtn => {
          this.detailData = rtn.data
          this.$refs.imgContent.style.content = 'url('+this.detailData.res_cover+')'
          this.$refs.imgContent.style.marginLeft = '-4.4rem'
      })
    },

    addSongPlay(event){
        if(event.srcElement.id.length===11&&event.target.nodeName === 'I'){
          let instance = this.$toast('即将播放..')
          setTimeout( () => {
            instance.close()
          },2500)
          const user_id = 0
          const timestamp = Date.parse(new Date()) / 1000
          const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/track/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')
          axios({
            method: 'get',
            url: 'urlApi/app/v1/track/info',
            params: {
              api_key: '0fcf845a413e11beb5606448eb8abbc4',
              timestamp: timestamp,
              user_id: user_id,
              id: event.srcElement.id
            },
            headers:{
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Authorization':'wawa ' + token
            }
          }).then( rtn => {
            this.data = rtn.data
            this.setPlayerData(rtn.data)
            this.playList.push(rtn.data)
            this.setPlayState(true)
          })
        }
        
    },
    selected: function(item) {
      this.activeName = item
    },
  },
  /*watch: {
    // 按钮同步
    playState(newState){
      this.$nextTick(()=>{
        newState ? this.iconState =true : this.iconState = false
      })
    },
    // 结束停止CD
    currentIndex(newIndex){
      if(this.playerData.id !=this.detailData.track.id){
        this.iconState = false
      }
    }
  }*/
}
</script>
<style lang="scss" scoped>
  #article-detail {margin-bottom: 70px;}
  .header-artic-detail {
    position: relative;
    padding: 0px 18px;
    overflow: hidden;
  }
  
  .header-song {
    position: absolute;
    top: -2.5rem;
    right: 2.5rem;
    position: relative;
    width: 15.4rem;
    height: 15.4rem;
    border-radius: 100%;
    box-shadow: 0px 0px 0.24rem 0.24rem rgba(0, 0, 0, 0.03);
    /*border: 0.01rem solid rgba(255, 255, 255, 0.14);
    box-shadow: 0px 0px 0.04rem 0.04rem;*/
  }
  
  .header-song>div {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 14.4rem;
    height: 14.4rem;
    overflow: hidden;
    border-radius: 100%;
  }
  
  .header-song>div>img {
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    /*margin-left: -4.4rem;*/
  }
  
  .header-song>i.playtrack {
    position: absolute;
    position: relative;
    width: 3rem;
    height: 3rem;
    top: 6rem;
    left: 6rem;
    background: rgba(0,0,0,1) no-repeat center;
    opacity: 0.724;
    border-radius: 50%;
    background-size: 100%;
    cursor: pointer;
  }
  .header-song>i.playtrack> i {
    color: rgba(255,255,255,1);
    font-size:1.18rem;
    position: absolute;
    top: 0.91rem;
    left: 1.08rem;
  }
  .rotate {
    animation:rotaD 18s linear infinite;
    -webkit-animation:rotaD 18s linear infinite;
    -moz-animation:rotaD 18s linear infinite;
    -ms-animation:rotaD 18s linear infinite;
    -o-animation:rotaD 18s linear infinite;
  }
  .pause{ 
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -ms-animation-play-state: paused;
    -o-animation-play-state: paused; 
  }
  .running{ 
    animation-play-state: running;
    -webkit-animation-play-state: running;
    -moz-animation-play-state: running;
    -ms-animation-play-state: running;
    -o-animation-play-state: running; 
  }
  @keyframes rotaD {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
  @-webkit-keyframes rotaD {
    0% {
      -webkit-transform: rotate(0deg)
    }
    100% {
      -webkit-transform: rotate(360deg)
    }
  }

  @-moz-keyframes rotaD {
    100% {
      -moz-transform: rotate(0deg)
    }
    100% {
      -moz-transform: rotate(360deg)
    }
  }
  @-o-keyframes rotaD {
    100% {
      -o-transform: rotate(0deg)
    }
    100% {
      -o-transform: rotate(360deg)
    }
  }

  
  .header-artic-detail>h1 {
    font-size: 24px;
    font-family: "PingFangSC-Semibold"
  }
  
  .m_listtags {
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    font-family: "PingFangSC-Regular";
    padding-top: 14px;
    font-size: 0.6rem;
  }
  
  .icon-view {
    padding-left: 20px;
    color: rgba(189, 189, 189, 1);
    padding-right: 10px;
    font-size: 0.45rem;
  }
  
  </style>

