<template>
	<div id="about">

		<keep-alive>
      <router-view></router-view>
    </keep-alive>  

		<div class="ab-content">
			<h1 class="bolder">WAWA TEAM</h1>
			<h3 class="bolder">关于我们</h3>
			<div class="content">
				<p>挖哇的寓意是让用户不断地发掘惊喜、收获到不一样的音乐。</p>
				<p>挖哇音乐至2014年自成立以来，就一直以成为一流的独立音乐服务团队为我们的奋斗目标，旨在为音乐人创造更优质的音乐相关服务，致力于全面提升用户的听觉体验，用最暖心的态度、最别具一格的想法提供最贴心的服务和最个性的产品。</p>
				<p>挖哇音乐是由多名独立音乐圈里的音乐人组建的专业运营团队，我们有乐队主唱、有鼓手、有贝斯、有solo、有节奏，我们的喜好覆盖了大部分的音乐类型，我们关注用户体验的各个层面，功能、交互、视觉、内容。</p>
				<p>在数字音乐和互联网纷纷扰扰的今天，我们希望更加专注于其中一块美丽的领域，不随波逐流。安静、淡然的把用户体验踏踏实实的做好。</p>				
			</div>
		</div>
		<div class="map">
			<div class="map-wrap">
				<img src="static/img/map.png">
				<div class="relative">
					<h2>联系我们</h2>
					<p>地址：广州番禺区保利大都汇A3座406<br>
					邮箱：biz@wawa.fm</p>
				</div>
				<div class="link-but" @click="mapT()">
					<img src="static/img/button3.png">
				</div>
			</div>
			
		</div>

		<div class="more">
			<div class="ab-share">
				<div><img src="static/img/wechat.png"></div>
				<h4 class="bolder">微信</h4>
				<p>搜索“挖哇” </p>
			</div>
			<div class="ab-share">
				<div><img src="static/img/sina.png"></div>
				<h4 class="bolder">微博</h4>
				<p>@挖哇音乐</p>
			</div>
			<div class="ab-share">
				<div>
					<div><img src="static/img/qq.png"></div>
					<h4 class="bolder">QQ</h4>
					<p>挖哇官方群:191476923</p>
				</div>				
			</div>
		</div>

	</div>
</template>

<script type="es6">
	import router from '../../router'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return{
	
			}			
		},

		created() {
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
		computed: {
      ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
    },
		methods: {
			...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
			mapT: function (){
				window.location.href = 'http://map.baidu.com/?shareurl=1&poiShareUid=eabce2547790eaaf08f5eb3e'
			}
		}
	}
</script>
<style lang='scss' scoped>
	#about{
		margin-bottom: 4rem;
	}
/*conntent内容*/
	.ab-content{
		width: 100%;
		color: #555555;
	}
	.ab-content >h1{
		font-size: 1.5rem;
		font-family: "Avenir-Black";
		text-align: left;
		padding-top: 0.6rem;
		padding-left: 0.7rem;
	}
	.ab-content >h3{
		font-size: 0.9rem;
		font-family:"PingFangSC-Semibold";
		text-align: left;
		padding-left: 0.7rem;
	}
	.ab-content>div{
		font-size: 0.7rem;
		font-size: "PingFangSC-Light";
		line-height: 1.1rem;
		margin-top: 1.35rem;
	}

/*map*/
	.map{
		padding: 0.6rem;
		overflow: hidden;
	}
	.map>.map-wrap{
		width: 100%;
		border-radius: 10px;
		position: relative;
		overflow: hidden;
	}
	.map>.map-wrap>img{
		width: 100%;
		width: 100%;
		background-repeat: no-repeat;
	}
	.map>.map-wrap>.relative{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 6rem;	
		background-color: rgba(98,107,237,0.7);
		color: #ffffff;
	}
	.map>.map-wrap>.relative>h2{
		font-size: 0.8rem;
		font-family: "PingFangSC-Semibold";
		letter-spacing: 0.027rem;
		margin-top: 0.9rem;
		margin-left: 0.9rem;
		margin-bottom: 0.6rem;
	}

	.map>.map-wrap>.relative>p{
		margin-left: 0.9rem;
		font-size: 0.55rem;
		font-family: "PingFangSC-Regular";
		letter-spacing: 0.027rem;
		line-height: 1.1rem;
	}

	.map>.map-wrap>.link-but{
		position: absolute;
		bottom: 0.7rem;
		right: 0.7rem;
		width: 4.5rem;
		height: 1.5rem;
		overflow: hidden;
	}
	.map>.map-wrap>.link-but>img{
		width: 100%;
		height: 100%;
	}

/*其他*/
	.more{
		display: flex;
		justify-content: space-around;
		margin-top: 1.8rem;
	}
	.more >.ab-share {
		padding: 0 0.8rem;
	}
	.more >.ab-share>div {
		width: 3.6rem;
		height: 3.6rem;
		text-align: center;
		margin: 0 auto;
	}
	.more >.ab-share>div >img{
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
	}
	.more >.ab-share>h4{
		text-align: center;
		color: #555;
		font-size: 0.7rem;
		font-family: "PingFangSC-Semibold";
		margin-top: 0.6rem;
	}
	.more >.ab-share>p{
		text-align: center;
		color: #9B9B9B ;
		font-size: 0.5rem;
		font-family: "PingFangSC-Regular";
		margin-top: 0.4rem;
	}
	.more >.ab-share>div >div{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.more >.ab-share>div >div>img{
		width: 100%;
		height: 100%;
	}
	.more >.ab-share>div >h4{
		text-align: center;
		color: #555;
		font-size: 0.7rem;
		font-family: "PingFangSC-Semibold";
		margin-top: 0.6rem;
	}
	.more >.ab-share>div >p{
		text-align: center;
		color: #9B9B9B ;
		font-size: 0.5rem;
		font-family: "PingFangSC-Regular";
		margin-top: 0.4rem;
	}
</style>
