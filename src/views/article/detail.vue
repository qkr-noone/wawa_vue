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
        <span>文 / {{detailData.author}} </span>
        <span><i class="icon-view"></i><a>{{detailData.view_count}}</a>
        </span>
      </div>
    </div>
    <div class="content" v-html="detailData.content" @click="addSongPlay($event)">
      {{detailData.content}}
    </div>
  </div>
</template>


<script type="es6">
import { vueH5, getGuid } from '../../common/utils'
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
    this.routeChange() 
  },
  deactivated () {
    this.setNavToggle(false)
    this.setIsTr(false)
    this.setIsDemaskNav(false)
    this.$destroy()
  },
  mounted() {
    let audio = document.getElementById("audio")
    this.audio = audio
    this.setRouterUrl(this.$route.path)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.addCount()
  },

  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },
  // Q  1.按钮同步...  2.旋转暂停...  3. 嵌套播放单曲...
  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
    playPause: function() {
      this.setPlayerData(this.detailData.track)
      this.filterID(this.detailData.track)
      this.setCurrentIndex(this.currentIndex+1)
      this.audio.play()
      this.setPlayState(true)
    },
    filterID(data){
      let tip = false
      this.playList.forEach((item)=>{
        if(item.id === data.id){
          return tip = true
        }
      })

      if(!tip){
        this.playList.splice(this.currentIndex+1, 0,data)
        let instance = this.$toast('即将播放')
        setTimeout(() =>{
          instance.close()
        },2500)
      }
    },
    routeChange() {
      vueH5.taskAxios({
        method: 'get',
        url: 'doc/info',
        data: {
          user_id: 0,
          id: this.$route.query.id
        }
      },(rtn => {
          this.detailData = rtn.data
          this.$refs.imgContent.style.content = 'url('+this.detailData.res_cover+'?width=500)'
          this.$refs.imgContent.style.marginLeft = '-4.4rem'
      }))
    },

    addSongPlay(event){
        if(event.srcElement.id.length===11&&event.target.nodeName === 'I'){
          // IOS audio中ajax请求不能即时播放
          this.audio.play()
          this.audio.pause()          
          vueH5.taskAxios({
            method: 'get',
            url: 'track/info',
            data: {
              user_id: 0,
              id: event.srcElement.id
            }
          },( rtn => {
            this.data = rtn.data
            this.setPlayerData(rtn.data)
            this.filterID(this.data)
            this.setCurrentIndex(this.currentIndex+1)
            this.audio.play()
            this.setPlayState(true)
          }))
        } else if (event.target.getAttribute('id') === "商品ID") {
          window.location.href = event.target.getAttribute('link')
        } else {
          return
        }
        return
        
    },
    addCount(){
      if(!localStorage.getItem('GUID')){
        localStorage.setItem('GUID', getGuid())
      }      
      vueH5.taskAxiosForm({
        method: 'post',
        url: 'log/add',
        data: {
          user_id: 0,
          product: 1,
          platform: 3,
          unionid: localStorage.getItem('GUID'),
          source_type: 4,
          source_id: this.$route.query.id,      
          category: 7
        }
      })
    },
    selected: function(item) {
      this.activeName = item
    },
  }
}
</script>
<style lang="scss" scoped>
 /* 列表详情公用 */
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

  .m_listtags>span:nth-child(2) {
    width: 10rem;
  }

  .m_listtags>span:nth-child(2)>i {
    float: left;
    margin-right: 0.256rem;
    line-height: 0.8rem;
  }

  .m_listtags>span>a,
  .m_listtags>span>i {
    height: 0.8rem;
    line-height: 0.8rem;
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
    margin-right: 1.5px;
  }


/* 详情 */
  #article-detail {
    margin-bottom: 70px;
  }

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
  }

  .header-song>i.playtrack {
    position: absolute;
    position: relative;
    width: 3rem;
    height: 3rem;
    top: 6rem;
    left: 6rem;
    background: rgba(0, 0, 0, 1) no-repeat center;
    opacity: 0.724;
    border-radius: 50%;
    background-size: 100%;
    cursor: pointer;
  }

  .header-song>i.playtrack>i {
    color: rgba(255, 255, 255, 1);
    font-size: 1.18rem;
    position: absolute;
    top: 0.91rem;
    left: 1.08rem;
  }
  .header-artic-detail > .m_listtags { padding-top: 14px;}
  
  .rotate {
    animation: rotaD 18s linear infinite;
    -webkit-animation: rotaD 18s linear infinite;
    -moz-animation: rotaD 18s linear infinite;
    -ms-animation: rotaD 18s linear infinite;
    -o-animation: rotaD 18s linear infinite;
  }

  .pause {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -ms-animation-play-state: paused;
    -o-animation-play-state: paused;
  }

  .running {
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




</style>
