<template>
	<div id="album">
		<keep-alive>
      <router-view></router-view>
    </keep-alive> 
		<div class="albumlist-header">
			<div class="wrap" >
				<img :src="albumData.res_cover + '?width=500'">
			</div>

			<div class="tip-wrap">
				<div class="p-tip"  @click="addPlayList()">
					<!-- <i class="icon-play"></i>
					<span>播放专辑歌单</span> -->
          <img src="static/img/album_tip.png">
				</div>
			</div>

		</div>

		<div class="albumlist-title">
			<h2 class="bolder">{{albumData.title}}</h2>
			<p>{{albumData.tracks | lengthFormat}}	首 	In {{albumData.update_at | dateFormat}}&nbsp;&nbsp;	共有{{albumData.play_count}}人听过</p>
		</div>

		<div class="albumlist-content">
			<div class="list-tip">
				<div class="img-wrap">
					<img :src="albumData.from_user_headimg">
				</div>

				<div class="descr">
					<h4>{{albumData.from_user_nickname}}</h4>
					<p><img v-bind:src=" sex ? 'static/img/male.png':'static/img/female.png'"></p>
				</div>
			</div>

			<div class="line"></div>

			<ul>
				<li v-for="(item, index) in albumData.tracks"  >
					<a @click="playSong(index)">
						<span>{{index+1}}</span>
						<div>
							<img :src="item.res_cover">
						</div>
						<div>
							<h4 class="bolder" >{{item.songname}}</h4>
							<p >{{item.singer}}</p>
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
			albumData:'', //全部数据
			iconState: false,
			oneTime:true,
			sex: false,
			countState: true
		}
	},
	created() {
		const timestamp = Date.parse(new Date()) / 1000
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/album/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: 'get',
      // urlApi=http://wawa.fm
      url: 'urlApi/app/v1/album/info',
      params: {
	      api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp,
        id: this.$route.params.id
      },
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization':'wawa ' + token
      }
    }).then( rtn => {
        this.albumData = rtn.data
        if (this.albumData.from_user_sex===1) {
					this.sex = true
				} else {
					this.sex = false
				}
    })

	},
	deactivated () {
    this.setNavToggle(false)
    this.setIsTr(false)
    this.setIsDemaskNav(false)
    this.$destroy()
  },
	mounted() {
    this.setRouterUrl(this.$route.path)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },

	computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
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
		...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
		playSong: function(index) {
			if(this.setPlayList != this.albumData.tracks){
				this.setPlayList(this.albumData.tracks)
			}
			this.setCurrentIndex(index)
			this.setPlayerData(this.albumData.tracks[index])
			this.iconState = true
      this.setPlayState(true)
      let instance = this.$toast('即将播放..')
  	  setTimeout(() => {
  	  	instance.close()
  	  },2500)
  	  if(this.countState){
        this.addCount()
        this.countState = false
      }
		},

		addPlayList: function() {
			this.setPlayList(this.albumData.tracks)
			if (this.oneTime) {
				let instance = this.$toast('即将播放..')
  	   	setTimeout(() => {
  	   		instance.close()
  	   	},2500)
  	   	this.oneTime = false
			}
			this.setCurrentIndex(0)
      this.setPlayerData(this.playList[this.currentIndex])
      if(this.countState){
        this.addCount()
        this.countState = false
      }
		},
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
            unionid: localStorage.getItem('GUID'),
            source_type: 2,
            source_id: this.$route.params.id,      
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
	}
}
</script>
<style lang='scss' scoped>
	#album{
		margin-bottom: 4rem;
	}
/*头部header*/
	.albumlist-header {
		width: 16rem;
		height: 16rem;
		position: relative;
	}
	.albumlist-header> .wrap {
		width: 100%;
		height: 100%;
	}
	.albumlist-header> .wrap img{
		width: 100%;
		height: 100%;
	}
	.albumlist-header> .wrap img:after{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		content: url('/static/h5/static/img/placeholder_2.png');
	}
			
	.albumlist-header>.tip-wrap{
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		background-color: rgba(0,0,0,0.36);
	}
	.list-tip{
		margin-top: 0.6rem;
		height: 1.5rem;
		/*background-color: rgba(0,0,0,0.36);*/
	}
	.img-wrap {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 0.6rem;
		float: left;
		background-color:url('/static/h5/static/img/placeholder_1.png'); 
	}
	.img-wrap  img{
		width: 100%;
		height: 100%;
		float: left;
    position: relative;
	}
  .img-wrap  img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_2.png');
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
		line-height: 1.5rem;
		font-family: "PingFangSC-Medium";
		overflow: hidden;
		color: #000;
		float: left;
		margin-right: 0.675rem;
	}
	.descr> p {
		float: left;
		width: 0.6rem;
		height: 0.6rem;
		margin: 0.45rem 0;
		display: block;
		border-radius: 50%;
	}
	.descr> p >img{
		width: 100%;
		height: 100%;
	}

	.p-tip {
		position: absolute;
		bottom: 0.6rem;
		left: 0.6rem;
    height: 1.5rem;
    overflow: hidden;
  }
  .icon-play{
    margin-left: 0.9rem;
    line-height: 1.5rem;

  }
	.p-tip >img{
    height: 100%;
  }

/*标题title*/
	.albumlist-title{
	   color: rgba(85,85,85,1);
	   margin-top: 0.6rem;
	}
	.albumlist-title > h2{
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	  font-size: 0.9rem;
	  color: rgba(85,85,85,1);
	  font-family: "PingFangSC-Medium";
	  text-align: left;
	}
	
	.albumlist-title > p{
		font-size: 0.6rem;
		margin-top: 0.2rem;
		padding-left: 0.6rem;
		text-align: left;
	}

/*内容content*/
	.albumlist-content{

	}
	.albumlist-content > .play{
		margin-top: 0.6rem;
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
  .albumlist-content >div.all{
  	float: left;
    font-size: 0.6rem;
    font-family: "PingFangSC-Light";
    color: #555555;
    margin-top: 0.9rem;
    margin-left: 0.6rem;
  }
  .albumlist-content> .line{
  	width: 100%;
  	background-color: #f0f0f0;
  	height: 1px;
  	margin-top: 0.6rem;
  	margin-bottom: 0.45rem;
  	float: left;
  }
  .albumlist-content ul{
  	width: 100%;
  	overflow: hidden;
  }
  .albumlist-content ul >li{
  	margin: 0.9rem 0;
  	
  }
  .albumlist-content ul >li >a{
  	margin-left: 0.6rem;
  	display: flex;
  	flex-direction: row;
  	justify-content: flex-start;
  	color: #555555;
  }
  .albumlist-content ul >li >a span{
  	width: 0.5rem;
  	font-size: 0.6rem;
  	color: #999999;
  	font-family: "PingFangSC-Medium";
  	display: flex;
  	justify-content: center;
  	align-items: center;
  }
  .albumlist-content ul >li >a div:nth-child(2){
  	width: 2.25rem !important;
  	height: 2.25rem !important;
  	border-radius: 0.3rem;
  	margin-left: 0.6rem;
  	overflow: hidden;
  }
  .albumlist-content ul >li >a div:nth-child(2) >img{
  	width: 100%;
  	height: 100%;
  	background-repeat: no-repeat center;
    position: relative;
  }
  .albumlist-content ul >li >a div:nth-child(2) >img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_2.png')
  }
  .albumlist-content ul >li >a div:nth-child(3){
  	margin-left: 0.6rem;
  	width: 11rem;
  	overflow: hidden;
  	display: flex;
  	flex-direction: column;
  	justify-content: space-around;
  }
  .albumlist-content ul >li >a div:nth-child(3) >h4 {
  	font-size: 0.65rem;
  	font-family: "PingFangSC-Medium";
    overflow: hidden;
    text-align: left;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
	.albumlist-content ul >li >a div:nth-child(3) >p {
		font-size: 12px;
		color:#999999;
  	font-family: "PingFangSC-Regular";
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
	}
	.click{
		color: #6178F0 !important;
	}
</style>