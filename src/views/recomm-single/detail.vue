<template >
	<div id="singleDetail">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
		<section class="single-header">
			<div class="wrap-img"><img :src="singleSong.res_cover + '?with=500'"></div>
			<div class="single-mask"></div>
			<i class="playtrack">
				<i :class="iconState ? 'icon-pause' :'icon-play'" @click="playPause()"></i>
			</i>
			<div class="header-info">
				<h4 class="bolder">{{singleSong.songname}}</h4>
				<p>{{singleSong.singer}}					
					<span>
						<i class="icon-view"></i>{{singleSong.view_count}}</span>
				</p>
			</div>
		</section>

		<section class="single-content">
			<pre>{{singleSong.reviews}}</pre>
		</section>

		<section class="single-footer">
			<div class="small-header" @click='artist(singleSong.from_user)'><img :src="singleSong.headimg + '?with=500'"></div>
			<p class="bolder">{{singleSong.singer}}</p>
		</section>
	</div>
</template>
<script type="es6">
import { vueH5, getGuid } from '../../common/utils'
import { mapState, mapMutations } from 'vuex'
import router from '../../router'
export default {
	data() {
		return {
			singleSong: ''
		}
	},
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },
	created() {
    vueH5.taskAxios({
      method: 'get',
      url: 'track/info',
      data: {
        id: this.$route.query.id
      }
    },( rtn => {
        this.singleSong = rtn.data
    }))

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
    // 进入定位到顶端
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.addCount()
  },

	methods: {
		// Q 1.缩进
		...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
		playPause: function() {
      this.setPlayerData(this.singleSong)
      this.filterID(this.singleSong)
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
          source_type: 1,
          source_id: this.$route.query.id,      
          category: 7
        }
      })
    },
    artist(user_id){
      router.push({path: '/artist/detail', query: { id: user_id }})
    }
	},

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
    position: relative;
	}
  .single-header >.wrap-img >img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_2.png?width=320');
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
    font-family: "PingFangSC-Regular";
    padding-top: 8px;
    height: 0.8rem;
    line-height: 0.8rem;
    overflow: hidden;
    color: #ffffff;
  }
  .single-header> .header-info >p >span{
  	margin-left: 1.024rem;
  }
  .single-header> .header-info >p >span >i.icon-view{
  	font-size: 0.45rem;
    margin-right: 0.256rem;
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
		font-size: 15px;
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
    position: relative;
	}
  .single-footer >.small-header >img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_2.png');
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