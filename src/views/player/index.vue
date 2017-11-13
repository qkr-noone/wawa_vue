<template>
  <transition name="normal">
    <div class="play-detail">
    <!-- <label style="background: #abcdef;color: #000000;font-size: 18px;">{{test.dd}}</label>
    <input type="" name="input" ref='input' placeholder="11" v-model:value='test.dd'> -->
        
      <div class="detail-cont">
        <div class="detail-wrap">
          <img :src="playerData.res_cover">
        </div>
        <!-- <marquee class ="marquee" scrollamount="1" direction="Left"> -->
        <h4 class="bolder">{{playerData.songname}}</h4>
        <!-- </marquee> -->
        <p>{{playerData.singer}}</p>
      </div>

      <div class="other-pro">
        <i class="icon-re_ring" @click="ring()"><img src="static/img/re_ring.svg"></i>
        <i class="icon-re_give" @click="reward(playerData.id)"><img src="static/img/re_give.svg"></i>
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
        <ul>
          <li v-for="(item,index) in playList" :data-file="item.file320" :data-key="item.id" >
            <a @click="player(item,index),selected(index)">
              <span :class="{click: activeName==index }">{{index+1}}</span>
              <div>
                <img :src="item.res_cover +'?width=100'"/>
              </div>
              <div>
                <h4 class="bolder" :class="{click: activeName==index }">{{item.songname}}</h4>
                <p :class="{click: activeName==index }">{{item.singer}}</p>
              </div>
              <i class="icon-close" @click.stop="removeSong(index)"></i>
            </a>
          </li>
        </ul>

      </div>
      </transition>

    </div>
  </transition>
</template>

<script type="es6">
  import axios from 'axios'
  import md5 from 'js-md5'
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
        audio: ''
      }
    },
    created() {
      
    },
    mounted() {
      let audio = document.getElementById("audio")
      this.audio = audio
      this.audio.addEventListener('timeupdate', (e) => {
        this.currentTime = e.target.currentTime
        this.duration = this.audio.duration
      })
    },
    computed: {
      ...mapState(['playerData','playState','playList','currentIndex','routerUrl'])
    },
    methods: {
      ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl']),

      hiddenList: function() {
        this.list = false
        this.isDemask = false
        
        /*let bodyD = document.body
        if(this.isDemask === true){        
          // bodyD.style.overflowY = 'hidden'
          this.$refs.app.style.position = 'fixed'
        }else {
          // bodyD.style.overflowY = 'initial'
          this.$refs.app.style.position = 'initial'
        }*/
      },

      listShow(){
        this.list = true
        this.isDemask = true
      },
      selected: function(index) {
        this.activeName = index
      },
      //播放列表项
      player: function(item, index) {
        let instance = this.$toast('即将播放..')
        setTimeout(() => {
          instance.close()
        }, 2500)
        this.setCurrentIndex(index)
        this.setPlayerData(this.playList[index])

        this.setPlayState(true)
      },
      playPause: function(){
             
        this.setPlayState(!this.playState)
        if(!this.playerData.file320){
          this.setCurrentIndex(0)
          this.setPlayerData(this.playList[this.currentIndex])
          this.setPlayState(true)          
        }
        
      },
      removeSong(index){
        console.log(this.playList[index].id)
        console.log(this.playerData.id)
        if(this.playList[index].id == this.playerData.id){
          console.log(this.currentIndex)
          this.next()
          // this.setCurrentIndex(this.currentIndex-1)
          console.log(this.currentIndex)
        }
        this.playList.splice(index, 1)
      },

      loop(){
        this.setPlayState(true)
      },
      next(){
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
      pre(){
        if (this.playList.length === 1) {
          this.loop()
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
        window.location.href = 'http://wawa.fm:8088/static/app/wawa/isp.html'+'?cucc=' + this.playerData.cucc_code +'?cmcc='+ this.playerData.cmcc_code + '?ctcc=' + this.playerData.ctcc_code 
      },

    },
    watch: {
      playState(newState){
        newState ? this.setPlayState(true) : this.setPlayState(false)
      },
      currentIndex(chooseIndex){
        this.selected(chooseIndex)
        
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
    padding-top: 2.048rem;
    padding-bottom: 1.28rem;
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
  }
  .play-detail> .detail-cont h4{
    margin-top: 2.048rem;
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
    margin-bottom: 1.13rem;
    overflow: hidden;
    font-size: 0.96rem;
  }
  .play-detail>.other-pro >i{
    font-size: 0.96rem;
    line-height: 0.96rem;
    width: 0.96rem;
    height: 0.96rem;
  }
  .play-detail>.other-pro >i.icon-re_ring{
    width: 1.05rem;
    height: 1.05rem;
    line-height: 1.05rem;
  }
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
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    margin-left: 2.9rem;
    margin-right: 2.9rem;
    color: #777777;
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
    margin-left: 0.02rem;
   }

/*播放列表*/
  .m_audio_playlist{ 
    position:absolute; bottom:0; left:0; right:0; z-index: 200;
    height: 14.5rem;background: #ffffff; clear: both; 
    padding-top: 16px; 
    box-sizing: border-box; overflow: auto;
  }
  .m_audio_playlist>h1{
    margin-left: 12px;
    font-size: 0.85rem;
    font-family: "PingFangSC-Semibold";
  }
  .m_audio_playlist ul{
    width: 100%;
    overflow: hidden;
  }
  .m_audio_playlist >ul >li{
    margin: 0.8rem 0;
    
  }
  .m_audio_playlist ul >li >a{
    margin-left: 0.6rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: #555555;
  }
  .m_audio_playlist >ul >li >a span{
    width: 0.5rem;
    font-size: 0.6rem;
    color: #999999;
    font-family: "PingFangSC-Medium";
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .m_audio_playlist >ul >li >a div:nth-child(2){
    width: 2.25rem !important;
    height: 2.25rem !important;
    border-radius: 0.3rem;
    margin-left: 0.6rem;
    overflow: hidden;
  }
  .m_audio_playlist >ul >li >a div:nth-child(2) >img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
  }
  .m_audio_playlist >ul >li >a div:nth-child(3){
    margin-left: 0.6rem;
    width: 11rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .m_audio_playlist> ul >li >a div:nth-child(3) >h4 {
    font-size: 0.65rem;
    font-family: "PingFangSC-Medium";
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-align: left;
  }
  .m_audio_playlist >ul >li >a div:nth-child(3) >p {
    font-size: 12px;
    color:#999999;
    font-family: "PingFangSC-Regular";
  }
  .m_audio_playlist >ul >li >a>i.icon-close{
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
