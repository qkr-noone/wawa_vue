<template>
  <transition name="normal">
    
    <div class="play-detail">
    <!-- <label style="background: #abcdef;color: #000000;font-size: 18px;">{{test.dd}}</label>
    <input type="" name="input" ref='input' placeholder="11" v-model:value='test.dd'> -->
        
      <div class="detail-cont">
        <div class="detail-wrap">
          <img :src="playerData.res_cover +'?width=500'">
        </div>
        <!-- <marquee class ="marquee" scrollamount="1" direction="Left"> -->
        <h4 class="bolder">{{playerData.songname}}</h4>
        <!-- </marquee> -->
        <p>{{playerData.singer}}</p>
      </div>

      <div class="other-pro">
        <i class="icon-re_ring" @click="ring()"><img src="static/img/re_ring.svg"></i>
        <i class="icon-re_give" @click="reward(playerData.id)"><img :class="notRe" src="static/img/re_give.svg"></i>
        <i class="icon-player_list"  @click="listShow()"></i>

      </div>

      <div class="progress-wrapper">
        <span>{{format(currentTime)}}</span> 
        <div class="progress-bar" ref='progressBar'>
          <div class="progress"  ref='progress'></div>
        </div>
        <span>{{format(duration)}}</span>
      </div>

      <div class="play-nav">
        <i class="icon-player_last" @click="pre()"></i>
        <div @click="playPause()" ><i v-bind:class="playState ? 'icon-pause':'icon-play'"></i></div>
        <i class="icon-player_next" @click="next()"></i>
      </div>

      <!-- 遮罩层播放列表 -->
      <div class="m_audio_playlist_demask" id="playlist_demask" ref="demask" v-show="isDemask" @click="hiddenList()"> 
      </div>

      <transition name="list">
      <div class="m_audio_playlist" v-show="list">
        <h1 class="bolder">播放列表</h1>
        <div>
          <ul>
          <li v-for="(item,index) in playList" :data-file="item.file128" :data-key="item.id" >
            <a @click="player(item,index),selected(item.id)">
              <span :class="{click: activeName==item.id }">{{index+1}}</span>
              <div>
                <img :src="item.res_cover +'?width=100'"/>
              </div>
              <div>
                <h4 class="bolder" :class="{click: activeName==item.id }">{{item.songname}}</h4>
                <p :class="{click: activeName==item.id }">{{item.singer}}</p>
              </div>
              <i class="icon-close" @click.stop="removeSong(index)"></i>
            </a>
          </li>
        </ul>
        </div>

      </div>
      </transition>

    </div>
  </transition>
</template>

<script type="es6">
  import { vueH5, getGuid } from '../../common/utils'
  import { mapState, mapMutations } from 'vuex'
  import router from '../../router'
  export default {
    data() {
      return {
        isDemask:false, //播放列表显示的遮罩层
        list:false,
        activeName: '', //状态
        currentTime: 0,
        duration: '0',
        audio: '',
        notReward: false
      }
    },
    created() {
      
    },
    activated(){
      this.list = false
      this.isDemask = false
    },
    deactivated(){
      this.setNavToggle(false)
      this.setIsTr(false)
      this.setIsDemaskNav(false)
    },
    mounted() {
      let audio = document.getElementById("audio")
      this.audio = audio
      this.audio.addEventListener('timeupdate', (e) => {
        this.currentTime = e.target.currentTime
        this.duration = this.audio.duration
      })
      
      if (this.playerData.id===this.playList[this.currentIndex].id) {
        this.selected(this.playerData.id)
      }
      
    },
    computed: {
      ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav']),
      notRe(){
        if(!(this.playerData.pay_on === 1)){
          this.notReward = true 
        }else {
          this.notReward = false
        }
        return this.notReward ? 'not-reward' : ''
      }

    },
    methods: {
      ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),

      hiddenList: function() {
        this.list = false
        this.isDemask = false
      },

      listShow(){
        this.list = true
        this.isDemask = true
      },
      selected: function(id) {
        this.activeName = id
      },
      //播放列表项
      player: function(item, index) {
        let instance = this.$toast('即将播放..')
        setTimeout(() => {
          instance.close()
        }, 2500)
        this.setCurrentIndex(index)
        this.setPlayerData(this.playList[index])
        this.audio.play()
        this.setPlayState(true)
      },
      playPause: function(){             
        this.setPlayState(!this.playState)
        if(this.playerData.file128 == 'static/img/no1.mp3'){
          this.setCurrentIndex(0)
          this.setPlayerData(this.playList[this.currentIndex])
          this.audio.play()
          this.setPlayState(true)          
        }
        
      },
      //这里currentIndex不变，涉及到的相关修改
      removeSong(index){
        if(this.playList[index].id == this.playerData.id){
          if (this.playList.length===1) {
            this.playList.splice(index, 1)
            this.setPlayState(false)
            return false
          }
          this.playList.splice(index, 1)
          if (this.playList.length===index) {
            index = 0
          }
          this.setPlayerData(this.playList[index])
          this.selected(this.playerData.id)
          this.addCount()
          this.audio.play()
          this.setPlayState(true)
          return false
        } else {
          if (index<this.currentIndex) {
            this.setCurrentIndex(this.currentIndex-1)
          }
          
        }
        this.playList.splice(index, 1)
      },

      loop(){
        this.audio.currentTime = 0
        this.setPlayState(true)
      },
      next(){
        if((this.playList.length === 1) ||(this.playList.length === 0&&this.playerData.id)){
          this.loop()
          this.audio.play()
        } else {
          let index = this.currentIndex + 1
          if (index === this.playList.length||index>this.playList.length){
            index = 0
          }
          this.setCurrentIndex(index)
          this.setPlayerData(this.playList[index])
          this.audio.play()
          this.setPlayState(true)

        }

      },
      pre(){
        if ((this.playList.length === 1) ||(this.playList.length === 0&&this.playerData.id)) {
          this.loop()
          this.audio.play()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playList.length - 1
          } else if (index === -2) {
            index = 0
          }
          this.setCurrentIndex(index)
          this.setPlayerData(this.playList[index])
          this.audio.play()
          if (!this.playState) {
            this.playPause()
          }
        }
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      reward(songID){
        if(this.playerData.pay_on === 1){
          router.push({name: 'reward', params: { id: songID }})
        } else {
          let instance =  this.$toast('该歌曲暂不支持打赏')
          setTimeout( ()=> {
            instance.close()
          },2500)
        }
      },
      ring(){
        if(!this.playerData.cucc_code){
          this.playerData.cucc_code = null
        }
        if(!this.playerData.cmcc_code){
          this.playerData.cmcc_code = null
        }
        if(!this.playerData.ctcc_code){
          this.playerData.ctcc_code = null
        }
        window.location.href = '//wawa.fm:8088/static/app/wawa/isp.html'+'?cucc=' + this.playerData.cucc_code +'&cmcc='+ this.playerData.cmcc_code + '&ctcc=' + this.playerData.ctcc_code +'&uid=0'
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
            source_type: 1,
            source_id: this.playerData.id,
            unionid: localStorage.getItem('GUID'),
            category: 1
          }
        })
      }
    },
    watch: {
      playState(newState){
        newState ? this.setPlayState(true) : this.setPlayState(false)
      },
      currentIndex(chooseIndex){
        this.selected(this.playerData.id)
      },
      currentTime() {
        const barWidth = this.$refs.progressBar.clientWidth
        const offsetWidth = this.currentTime / this.audio.duration * barWidth
        this.$refs.progress.style.width = `${offsetWidth}px`
      }
    }
  }
</script>
<style lang='scss' scoped>

/*play-detail 播放详情*/ 
  .play-detail{
    max-width: 640px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    z-index: 150
  }

  .normal-enter-active,.normal-leave-active{
    transition: all 0s 
  }
  .normal-enter,.normal-leave-to{
    opacity: 0
  }

  .play-detail> .detail-cont{
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
  }
  .detail-wrap{
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    width: 10.667rem;
    height: 10.667rem;
  }
  .detail-wrap>img {
    width: 100%;
    height: 100%;
    position: relative;
    background: center no-repeat;
  }
  .detail-wrap>img::after {
    position: absolute;
    left: 0;
    top: 0;
    content: url('/static/h5/static/img/placeholder_2.png?width=200');
    width: 100%;
    height: 100%;
  }
  .play-detail> .detail-cont h4{
    margin-top: 1.5rem;
    font-size: 0.64rem;
    font-family: "PingFangSC-Medium";
    color: #555555;
    text-align: center;
    font-size: 0.75rem;
    white-space: nowrap;
    margin-left: 0.6rem;
    margin-right: 0.6rem;
    text-overflow:ellipsis;
    overflow: hidden;
  }
    .play-detail> .detail-cont>p{
    margin-top: 0.15rem;
    font-size: 0.512rem;
    font-family: "PingFangSC-Light";
    color: #666666;
    text-align: center;
  }

  .play-detail>.other-pro{
    color: rgba(189,189,189,1);
    display: flex;
    justify-content: space-between;
    margin-left: 4rem;
    margin-right: 4rem;
    margin-bottom: 1rem;
    font-size: 0.96rem;
    height: 1.1rem;
    overflow: hidden;
  }
  .play-detail>.other-pro >i{
    line-height: 0.96rem;
    width: 0.96rem;
    height: 0.96rem;
  }
  .play-detail>.other-pro >i.icon-re_ring{
    width: 1.05rem;
    height: 1.05rem;
    line-height: 1.05rem;
  }
  .not-reward{opacity: 0.36}
  .play-detail>.other-pro >i.icon-player_list{
    font-size: 0.767rem;
  }
  .play-detail>.other-pro >i>img{
    width: 100%;
    height: 100%;
  }
  .play-detail>.progress-wrapper {
    margin-left: 0.405rem;
    margin-right: 0.405rem;
    display: flex;
    justify-content: space-around;
  }
  .play-detail>.progress-wrapper>span {
    font-size: 0.427rem;
    font-family: "Avenir-Book";
    color: #3C3E4A;
  }
  .play-detail>.progress-wrapper>.progress-bar {
    width: 10.667rem;
    height: 2px;
    background: #D8D8D8;
    margin: auto 0;
    margin-left: 0.405rem;
    margin-right: 0.405rem;
    position: relative;
  }
    .play-detail>.progress-wrapper>.progress-bar>.progress {
    /*width: 5.667rem;*/
    height: 100%;
    background: #767989;
    position: absolute;
  }
  .play-detail>.play-nav{
    margin: 0.2rem 2.9rem  1.5rem; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #777777;
    height: 1.93rem;
  }
  .play-nav>i{
    line-height: 1.92rem;
  }
  .play-detail>.play-nav>div:nth-child(2){
    width: 1.92rem;
    height: 1.92rem; 
    background: #777777;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
   .play-detail>.play-nav>div:nth-child(2)>i{
    color: #ffffff;
   }
   .icon-play{
    margin-left: 0.06rem;
   }

/*播放列表*/
  .m_audio_playlist{ 
    position:absolute; bottom:0; left:0; right:0; z-index: 200;
    height: 14.5rem;background: #ffffff; clear: both; 
    padding-top: 0.4rem; 
    box-sizing: border-box;
  }
  .m_audio_playlist>h1{
    margin-left: 12px;
    font-size: 0.85rem;
    padding-bottom: 0.4rem;
    font-family: "PingFangSC-Semibold";
  }
  .m_audio_playlist>div{
    width: 100%;
    height: calc( 100% - 1.65rem);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .m_audio_playlist>div> ul{
    width: 100%;
    overflow: hidden;
  }
  .m_audio_playlist >div>ul >li{
    margin: 0.8rem 0;
  }
  .m_audio_playlist >div>ul >li >a{
    margin-left: 0.6rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: #555555;
  }
  .m_audio_playlist >div>ul >li >a span{
    width: 0.5rem;
    font-size: 0.6rem;
    color: #999999;
    font-family: "PingFangSC-Medium";
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .m_audio_playlist >div>ul >li >a div:nth-child(2){
    width: 2.25rem !important;
    height: 2.25rem !important;
    border-radius: 0.3rem;
    margin-left: 0.6rem;
    overflow: hidden;
  }
  .m_audio_playlist >div>ul >li >a div:nth-child(2) >img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
  }
  .m_audio_playlist >div>ul >li >a div:nth-child(3){
    margin-left: 0.6rem;
    width: 11rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .m_audio_playlist>div> ul >li >a div:nth-child(3) >h4 {
    font-size: 0.65rem;
    font-family: "PingFangSC-Medium";
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-align: left;
  }
  .m_audio_playlist >div>ul >li >a div:nth-child(3) >p {
    font-size: 12px;
    color:#999999;
    font-family: "PingFangSC-Regular";
  }
  .m_audio_playlist >div>ul >li >a>i.icon-close{
    font-size: 0.47rem;
    color: #999;
    margin-right: 0.618rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .click{
    color: #6178F0 !important;
  }

  .m_audio_playlist_demask{ 
    width: 100%; height: 100%; 
    position: fixed; top: 0; left: 0; 
    background-color: rgba(0,0,0,.36); z-index: 20; 
  }

/*列表进入渐变*/
  .list-enter-active,.list-leave-active{
    animation:show 0.4s;
    -webkit-animation:show 0.4s;
  }
  @-webkit-keyframes show{
   0%   {height: 0px}
   100% { height: 14.5rem}
  }
  .list-leave-active,.list-enter {
    opacity: 0;
  }
</style>
