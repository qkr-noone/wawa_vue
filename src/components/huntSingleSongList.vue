<template>
	<li class="hunli">
		<a @click="playSong(index)">
			<span>{{index+1}}</span>
			<div>
				<img :src="item.res_cover +'?width=200'">
			</div>
			<div>
				<h4 class="bolder">{{item.songname}}</h4>
				<p >{{item.singer}}</p>
			</div>
		</a>
	</li>
</template>
<script type="es6">
import { mapState, mapMutations } from 'vuex'
  export default { 
    name: 'huntSingleSongList', 
    data() { 
      return{} 
    },
    props:['item','index','huntDetail'], //前面加this可以在组件中取到数据
    computed: {
      ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
    },
    mounted() {
      let audio = document.getElementById("audio")
      this.audio = audio
    },
    methods: {
      ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
      playSong: function(index) {
        if(this.huntDetail.tracks!=this.playList){
          this.setPlayList(this.huntDetail.tracks)
        }
				this.setPlayerData(this.huntDetail.tracks[index])
				this.iconState = true
        this.audio.play()
  	    this.setPlayState(true)
        this.setCurrentIndex(index)
  	    let instance = this.$toast('即将播放..')
  	    setTimeout(() => {
  	    	instance.close()
  	    },2500)
        if(this.countState){
          this.addCount()
          this.countState = false
        }
			}
    }
  }
</script>
<style type="scss" scoped>
	.hunli {
    margin: 0.9rem 0;
    
  }
  .hunli >a{
    margin-left: 0.6rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: #555555;
  }
  .hunli >a span{
    width: 0.5rem;
    font-size: 0.6rem;
    color: #999999;
    font-family: "PingFangSC-Medium";
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hunli >a div:nth-child(2){
    width: 2.25rem !important;
    height: 2.25rem !important;
    border-radius: 0.3rem;
    margin-left: 0.6rem;
    overflow: hidden;
  }
  .hunli >a div:nth-child(2) >img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
    position: relative;
  }
  .hunli >a div:nth-child(2) >img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_1.png?width=200');
  }
  .hunli >a div:nth-child(3){
    margin-left: 0.6rem;
    width: 11rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .hunli >a div:nth-child(3) >h4 {
    font-size: 0.65rem;
    font-family: "PingFangSC-Medium";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

  }
  .hunli >a div:nth-child(3) >p {
    font-size: 12px;
    color:#999999;
    font-family: "PingFangSC-Regular";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
</style>