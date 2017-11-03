<template>
	<div id="songlist-detail">
<keep-alive>
      <router-view></router-view>
    </keep-alive> 
		<div class="songlist-header">
			<div class="wrap">
				<img :src="songListDetail.res_cover + '?width=500'">
			</div>

			<div class="tip-wrap">

				<div class="img-wrap">
					<img :src="songListDetail.from_user_headimg">
				</div>

				<div class="descr">
					<h4>{{songListDetail.from_user_nickname}}</h4>
					<p><img v-bind:src="'songListDetail.from_user_sex==2' ? 'static/img/female.png': 'static/img/male.png'"></p>
				</div>

			</div>
		</div>

		<div class="songlist-title">
			<h2 class="bolder">{{songListDetail.title}}</h2>
			<p>{{songListDetail.tracks | lengthFormat}}	首 	In {{songListDetail.update_at | dateFormat}}&nbsp;&nbsp;	共有&nbsp;&nbsp;{{songListDetail.play_count}}&nbsp;&nbsp;人听过</p>
		</div>

		<div class="songlist-content">
			<div class="play">
				<i class="playtrack"><i class="icon-play" @click="addPlayList()"></i></i>
			</div>
			<div class="all">播放全部</div>
			<div class="line"></div>

			<ul>
				<li v-for="(item, index) in songListDetail.tracks"  >
					<a :class="{click: activeName==item }" @click="playSong(index),selected(item)">
						<span>{{index+1}}</span>
						<div>
							<img :src="item.res_cover">
						</div>
						<div>
							<h4 class="bolder" :class="{click: activeName==item }">{{item.songname}}</h4>
							<p :class="{click: activeName==item }">{{item.singer}}</p>
						</div>
					</a>
				</li>
			</ul>
		</div>

	</div>
</template>
<script type="es6">
import md5 from 'js-md5'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
			songListDetail:'', //全部数据
			songList: '', //播放列表
			iconState: false,
			oneTime:true,
			activeName: '' //状态
		}
	},
	created() {
		document.title = '推荐歌单'
		const timestamp = Date.parse(new Date()) / 1000
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/playlist/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: 'get',
      // urlApi=http://wawa.fm
      url: 'urlApi/app/v1/playlist/info',
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
        this.songListDetail = rtn.data
        // console.log(this.songListDetail)
        // this.setPlayList(this.songListDetail.tracks)
    })

	},
	mounted() {
    this.setRouterUrl(this.$route.path)
  },

	computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl'])
  },
  filters:{
  	lengthFormat(value){
  		if(value){
  			return value.length
  		}
  	},
  	dateFormat(value){
  		if(value){
  			return value.slice(0, 10)
  		}
  	}
  },
	methods: {
		...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl']),
		playSong: function(index) {
			if(this.setPlayList != this.songListDetail.tracks){
				this.setPlayList(this.songListDetail.tracks)
			}
			this.setCurrentIndex(index)
			this.setPlayerData(this.songListDetail.tracks[index])
			this.iconState = true
      this.setPlayState(true)
      let instance = this.$toast('即将播放..')
  	  setTimeout(() => {
  	  	instance.close()
  	  },2500)
		},

		addPlayList: function() {
			this.setPlayList(this.songListDetail.tracks)
			if (this.oneTime) {
				let instance = this.$toast('即将播放..')
  	   	setTimeout(() => {
  	   		instance.close()
  	   	},2500)
  	   	this.oneTime = false
			}
			this.setCurrentIndex(0)
      this.setPlayerData(this.playList[this.currentIndex])

		},

		selected: function(item) {
      this.activeName = item
    }
	}
}
</script>
<style lang='scss' scoped>
	#songlist-detail{
		margin-bottom: 4rem;
	}
/*头部header*/
	.songlist-header {
		width: 16rem;
		height: 16rem;
		position: relative;
	}
	.songlist-header> .wrap {
		width: 100%;
		height: 100%;
	}
	.songlist-header> .wrap img{
		width: 100%;
		height: 100%;
		background-repeat: no-repeat center;
	}
	.songlist-header>.tip-wrap{
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 2.7rem;
		background-color: rgba(0,0,0,0.36);
	}
	.songlist-header>.tip-wrap >.img-wrap {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0.6rem;
		float: left;
	}
	.songlist-header>.tip-wrap >.img-wrap  img{
		width: 100%;
		height: 100%;
		background-repeat: no-repeat center;
		float: left;
	}
	.descr {
		float: left;
		height: 100%;
		text-align: center;
		color:#ffffff;
	}
	.descr> h4{
		font-size: 0.6rem;
		text-align: left;
		line-height: 2.7rem;
		font-family: "PingFangSC-Medium";
		overflow: hidden;
		float: left;
		margin-right: 0.675rem;
	}
	.descr> p {
		float: left;
		width: 0.6rem;
		height: 0.6rem;
		margin-top: 1.06rem;
		display: block;
		border-radius: 50%;
	}
	.descr> p >img{
		width: 100%;
		height: 100%;
	}

/*标题title*/
	.songlist-title{
	   color: rgba(85,85,85,1);
	   margin-top: 0.6rem;
	}
	.songlist-title > h2{
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	  font-size: 0.9rem;
	  color: rgba(85,85,85,1);
	  font-family: "PingFangSC-Medium";
	  text-align: left;
	}
	
	.songlist-title > p{
		font-size: 0.6rem;
		margin-top: 0.2rem;
		padding-left: 0.6rem;
		text-align: left;
	}

/*内容content*/
	.songlist-content{

	}
	.songlist-content > .play{
		margin-top: 0.85rem;
    /*overflow: hidden;*/
    float: left;
	}
  .play>i.playtrack {
    position: relative;
    background: rgba(0,0,0,1) no-repeat center;
    opacity: 0.724;
    border-radius: 50%;
    background-size: 100%;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    color: #777777;
    margin-left: 0.6rem;
    float: left;
  }
  .play>i.playtrack> i {
    color: rgba(255,255,255,1);
    position: absolute;
    /*top: 0.5rem;
    left: 0.54rem;
    font-size: 0.5rem;*/
    left: 12px;
    font-size: 0.6rem;
    top: 10.8px;
  }
  .songlist-content >div.all{
  	float: left;
    font-size: 0.6rem;
    font-family: "PingFangSC-Light";
    color: #555555;
    margin-top: 1.15rem;
    margin-left: 0.6rem;
  }
  .songlist-content> .line{
  	width: 100%;
  	background-color: #f0f0f0;
  	height: 1px;
  	margin-top: 0.6rem;
  	margin-bottom: 0.45rem;
  	float: left;
  }
  .songlist-content ul{
  	width: 100%;
  	overflow: hidden;
  }
  .songlist-content ul >li{
  	margin: 0.9rem 0;
  	
  }
  .songlist-content ul >li >a{
  	margin-left: 0.6rem;
  	display: flex;
  	flex-direction: row;
  	justify-content: flex-start;
  	color: #555555;
  }
  .songlist-content ul >li >a span{
  	width: 0.5rem;
  	font-size: 0.6rem;
  	color: #999999;
  	font-family: "PingFangSC-Medium";
  	display: flex;
  	justify-content: center;
  	align-items: center;
  }
  .songlist-content ul >li >a div:nth-child(2){
  	width: 2.25rem !important;
  	height: 2.25rem !important;
  	border-radius: 0.3rem;
  	margin-left: 0.6rem;
  	overflow: hidden;
  }
  .songlist-content ul >li >a div:nth-child(2) >img{
  	width: 100%;
  	height: 100%;
  	background-repeat: no-repeat center;
  }
  .songlist-content ul >li >a div:nth-child(3){
  	margin-left: 0.6rem;
  	width: 11rem;
  	overflow: hidden;
  	display: flex;
  	flex-direction: column;
  	justify-content: space-around;
  }
  .songlist-content ul >li >a div:nth-child(3) >h4 {
  	font-size: 0.65rem;
  	font-family: "PingFangSC-Medium";
  	display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-align: left;
  }
	.songlist-content ul >li >a div:nth-child(3) >p {
		font-size: 12px;
		color:#999999;
  	font-family: "PingFangSC-Regular";
	}
	.click{
		color: #6178F0 !important;
	}
</style>