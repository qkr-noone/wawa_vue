<template >
	<div id="singleDetail">
<keep-alive>
      <router-view></router-view>
    </keep-alive> 
		<section class="single-header">
			<div class="wrap-img"><img :src="singleSong.res_cover + '?with=500'"></div>
			<div class="single-mask"></div>
			<i class="playtrack">
				<i :class="iconState ? 'icon-pause' :'icon-play'" @click="playPause()"></i>
			</i>
			<div class="header-info">
				<h4 class="bolder">{{singleSong.singer}}</h4>
				<p>
					{{singleSong.songname}}
					<span>
						<i class="icon-listen"></i>
						{{singleSong.play_count}}
					</span>
				</p>
			</div>
		</section>

		<section class="single-content">
			<pre>{{singleSong.reviews}}</pre>
		</section>

		<section class="single-footer">
			<div class="small-header"><img :src="singleSong.headimg + '?with=500'"></div>
			<p class="bolder">{{singleSong.songname}}</p>
			<p>挖哇音乐原创内容	·	报错</p>
		</section>
	</div>
</template>
<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
			singleSong: '',
			iconState: false
		}
	},
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl'])
  },
	created() {
		document.title = '推荐单曲'
		const timestamp = Date.parse(new Date()) / 1000
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/track/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: 'get',
      // urlApi=http://wawa.fm
      url: 'urlApi/app/v1/track/info',
      params: {
	      api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp,
        id: this.$route.query.id
      },
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Access-Control-Allow-Origin':'http://localhost:8080',
        'Authorization':'wawa ' + token
      }
    }).then( rtn => {
        this.singleSong = rtn.data
    })

	},

  mounted() {
    this.setRouterUrl(this.$route.path)
  },

	methods: {
		// Q 1.缩进
		...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl']),
		playPause: function() {
      this.setPlayerData(this.singleSong)
      if(!this.iconState) {
        this.iconState = true
        this.setPlayState(true)
        let instance = this.$toast('即将播放..')
  	    setTimeout(() => {
  	    	instance.close()
  	    },2500)
      } else {
        this.iconState = false
        this.setPlayState(false)
      }
    }
	},

	watch: {
    //按钮同步
    playState(newState){
      this.$nextTick(() => {
        newState ? this.iconState=true : this.iconState=false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
	#singleDetail{
		margin-bottom: 4rem;
	}
/*header*/
	.single-header{
		width: 16rem;
		height: 16rem;
		position: relative;
	}
	.single-header >.wrap-img {
		width: 100%;
		height: 100%;
	}
	.single-header >.wrap-img >img{
		width: 100%;
		height: 100%;
	}
	.single-header > .single-mask{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.24);
	}
	.single-header> i.playtrack {
    position: absolute;
    /*position: relative;*/
    width: 3rem;
    height: 3rem;
    top: 6.5rem;
    left: 6.5rem;
    background: rgba(0,0,0,1) no-repeat center;
    opacity: 0.724;
    border-radius: 50%;
    background-size: 100%;
    cursor: pointer;
  }
	i.playtrack> i {
    color: rgba(255,255,255,1);
    font-size:1.18rem;
    position: absolute;
    top: 0.91rem;
    left: 1.08rem;
  }
  .single-header> .header-info{
  	position: absolute;
  	padding: 0 0.9rem;
    bottom: 0.675rem;
    left: 0;
    overflow: hidden
  }
  .single-header> .header-info >h4{
  	overflow: hidden;
    font-size: 0.9rem;
    color: #ffffff;
    font-family: "PingFangSC-Medium";
  }
  .single-header> .header-info >p {
  	font-size: 0.6rem;
    color: #ffffff;
    font-family: "PingFangSC-Light";
    padding-top: 0.125rem;
  }
  .single-header> .header-info >p >span{
  	margin-left: 1.2rem;
  }
  .single-header> .header-info >p >span >i.icon-listen{
  	font-size: 0.45rem
  }
  .single-header> .header-info >p >span>i{
  	font-size: 0.5rem;
  	font-family: "PingFangSC-Light"
  }

/*content*/
	.single-content{
		margin-top: 1.8rem;
		padding: 0 0.6rem;
	}
	.single-content >pre {
		font-family: "PingFangSC-Light";
		font-size: 0.8rem;
		white-space: pre-wrap;
    word-wrap: break-word;
    color: #555555;
    line-height: 1.35rem;
    letter-spacing: 0.025rem;
    /*text-indent: 1.5em;*/
    /*tab-size: 2;*/
	}

/*footer*/
	.single-footer{
		margin-top: 5.9rem;
	}
	.single-footer >.small-header	{
		width: 3.6rem;
		height: 3.6rem;
		margin: 0 auto;
		border-radius: 50%;
		overflow: hidden;
	}
	.single-footer >.small-header	>img{
		width: 100%;
		height: 100%;
	}
	.single-footer >p {
		text-align: center;
	}
	.single-footer > p:nth-child(2){
		margin-top: 0.6rem;
    font-size: 0.75rem;
    color: #555555;
    font-family: "PingFangSC-Medium";
	}
	.single-footer > p:nth-child(3){
		margin-top: 2.7rem;
    margin-bottom: 1.825rem;
    font-family: "PingFangSC-Light";
    color: #999999;
    font-size: 0.6rem;

	}
</style>