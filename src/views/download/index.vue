<template>
	<div id="download">
		<keep-alive>
      <router-view></router-view>
    </keep-alive> 
    
		<div class="load-wrap">
			<img src="static/img/bitmap.png">
			<div class="load-link" @click="loadWa()">
				<img src="static/img/button.png" href="https://wawa.fm/static/app/wawa/download.html">
			</div>
		</div>

		<div class="load-wrap">
			<img src="static/img/bitmap2.png">
			<div class="load-link" @click="loadYu()">
				<img src="static/img/button2.png" href="https://wawa.fm/static/app/yuyin/download.html">
			</div>
		</div>
	</div>
</template>
<script type="es6">
	import { mapState, mapMutations } from 'vuex'
	import router from '../../router'
	export default {
		data() {
			return{
	
			}
		},
		computed: {
      ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
    },
    mounted() {
      this.setRouterUrl(this.$route.path)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
  	},
  	deactivated(){
      this.setNavToggle(false)
      this.setIsTr(false)
      this.setIsDemaskNav(false)
    },
		methods:{
			...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
			loadWa: function() {
				window.location.href = 'https://wawa.fm/static/app/wawa/download.html?channel=wawa'
			},
			loadYu: function() {
				window.location.href = 'https://wawa.fm/static/app/yuyin/download.html?channel=wawa'
			}
		}
	}
</script>
<style lang='scss' scoped>
	#download{
		margin-bottom: 4rem;
		background-color: #f5f5f5;
		/*padding-bottom: 40VW;*/
		padding-top: 0.4rem;
	}
	.load-wrap{
		margin:0.6rem;
		overflow: hidden;
		border-radius: 0.9rem;
		position: relative;
		box-shadow:rgba(193, 193, 193, 0.18) 0px 0px 2rem 1rem;
	}
	div.load-wrap:nth-child(2){
		margin-top: 1.5rem;
	}
	.load-wrap>img,.load-wrap>.load-link>img{
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
	}
	.load-wrap>.load-link{
		position: absolute;
		width: 4rem;
		height: 1.5rem;
		border-radius: 1.65rem;
		overflow: hidden;
		right: 0.9rem;
		bottom: 0.9rem;
		color: #E2E4ED;
	}
	
</style>
