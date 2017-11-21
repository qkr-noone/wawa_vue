<template>
	<div id="reward">
		<section class="header">
			<div class="wrap-img">
				<img :src="rewardHead.res_cover">
			</div>
			<h1 class="bolder">{{rewardHead.singer}}</h1>
			<p>您的支持是我们创作的最大动力，谢谢！</p>
			<div class="reward-person" v-if="rewardChild.length">
				<ul>
					<li v-for="(item, index) in rewardData.users" v-if="index < 5">
						<img :src="item.headimg">
					</li>
				</ul>
			</div>
			<p class="person">共获得{{rewardData.total_count}}次赞赏	<i class="icon-nav"></i></p>
		</section>

		<section class="reward-cont">
			<div class="price-list">
				<div class="tip" v-for="(item, index) in priList" :class="{choose: activeName===item }" @click ="selected(item)">
					<div class="right-tip" v-if="activeName===item"><img src="static/img/re_choose.svg"></div>
					<h2 class="bolder">￥	{{item.price}}</h2>
					<p>{{item.tyle}}</p>
				</div>
			</div>
			<p class="other" @click="otherPri()">其他金额</p>
			<div class="give" @click="submit()">
				赞赏
			</div>
			<div class="reference">
				支持作品创作的打赏费用将100%转入音乐人账户
			</div>
		</section>
		<section class="re-tip" v-if="otherRew">
			<div class="sub-bt">
				<i class="icon-close" @click="closeOther()"></i>
				<h2 class="bolder">其他金额</h2>
				<input ref="personPri" type="tel" name="" placeholder="可输入1-888整数">
				<button @click="submitOther()">赞赏</button>
			</div>
		</section>
	</div>
</template>
<script type="es6">
	import md5 from 'js-md5'
	import axios from 'axios'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				rewardData: {},
				rewardHead: '',
				activeName: [],
				rewardChild: {},
				priList: [{price:'1.00',tyle: '值得支持'},{price:'5.00',tyle: '作品很赞'},{price:'10.00',tyle: '神作'}],
				priceRew: '',
				otherRew: false
			}
		},
		created() {
      let timestamp = Date.parse(new Date()) / 1000
      let token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/track/reward_users@3ad3ebb04b5c94cd234e16a6aef9c8ae') 
      axios({
        method: 'get',
        // urlApi=http://wawa.fm
        url: 'urlApi/app/v1/track/reward_users',
        params: {
          api_key: '0fcf845a413e11beb5606448eb8abbc4',
          timestamp: timestamp,
          track_id: this.playerData.id /*17050000604*/

        },
        headers:{
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          // 'Access-Control-Allow-Origin':'http://localhost:8080',
          'Authorization':'wawa ' + token
        }
      }).then( rtn => {
      		this.rewardData = rtn.data
          this.rewardChild = this.rewardData.users
      })
      token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/track/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')
      axios({
        method: 'get',
        url: 'urlApi/app/v1/track/info',
        params: {
          api_key: '0fcf845a413e11beb5606448eb8abbc4',
          timestamp: timestamp,
          user_id: 0,
          id: this.$route.params.id
        },
        headers:{
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          // 'Access-Control-Allow-Origin':'http://localhost:8080',
          'Authorization':'wawa ' + token
        }
      }).then( rtn => {
      		this.rewardHead = rtn.data
      		console.log(this.rewardHead)
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
  	},
  	computed: {
    	...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  	},
  	methods: {
  		...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
  		selected: function(item,index) {
        this.activeName = item
        this.priceRew = parseInt(item.price)
        console.log(this.priceRew)
      },
      submit(){
      	if(this.priceRew){
      		window.location.href = 'http://wawa.fm/jsapi/weixi/pay/h5pay'+'?body='+this.rewardHead.songname+'&product=1&total_fee='+this.priceRew+'&track_id='+this.rewardHead.id
      	}else {
      		let instance = this.$toast('请选择赞赏金额')
      		setTimeout( () => {
      			instance.close()
      		},2500)
      	}
      	
      },
      submitOther(){
      	let nuM = this.$refs.personPri.value
      	if(nuM<=888&&nuM>=1&&parseInt(nuM)==nuM){
      		this.otherRew = false
      		window.location.href = '//wawa.fm/jsapi/weixi/pay/h5pay'+'?body='+this.rewardHead.songname+'&product=1&total_fee='+nuM+'&track_id='+this.rewardHead.id
      	} else {
					let instance = this.$toast('请输入正确的数字')
      		setTimeout( () => {
      			instance.close()
      		},2500)    		
      	}
      },
      otherPri(){
      	this.otherRew = true
      },
      closeOther(){
      	this.otherRew = false
      }
  	}
	}
</script>
<style lang='scss' scoped>
	#reward{
		background: #F5F5F5;
		position: fixed;
    top: 0;
    z-index: 1000;
    left: 0;
    right: 0;
    bottom: 0;
	}

/*header*/
	.header{
		width: 16rem;
		/*height: 11.712rem;*/
		text-align: center;
		box-sizing: border-box;
		background: #ffffff;
		padding-top: 1.9rem;
		padding-bottom: 1.49rem;
	}
	.header>.wrap-img{
		width: 3.072rem;
		height: 3.072rem;
		margin:0 auto;
		overflow: hidden;
		border-radius: 50%;
	}
	.header>.wrap-img>img{
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
	.header>h1{
		margin-top: 0.747rem;
		color: #555555;
		font-family: "PingFangSC-Medium";
		font-size: 0.768rem;
		text-align: center;
	}
	.header>p{
		margin-top: 0.35rem;
		color: #555555;
		font-family: "PingFangSC-Light";
		text-align: center;
	}
	.header>p:nth-child(3){
		font-size: 0.6rem
	}
	.header>p.person{
		font-size: 0.427rem;
	}
	.header >.reward-person{
		overflow: hidden;
		margin-top: 0.768rem;
		height: 1.278rem;
	}
	.header >.reward-person >ul{
		box-sizing: content-box;
		text-align: center;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}
	.header >.reward-person >ul>li{
		width: 1.278rem;
		height: 1.278rem;
		overflow: hidden;
		border-radius: 50%;
		float: left;
		box-shadow: 0 0 0px 0.1rem #ffffff;

	}
	.header >.reward-person >ul>li+li{
		margin-left: -0.639rem;
	}
	.header >.reward-person >ul>li>img{
		width: 100%;
		height: 100%;
	}

/*content*/
	.reward-cont{
		background: #F5F5F5 100%;
		padding-top: 1.43rem;
		/*height: 14.015rem;*/
	}
	.reward-cont >.price-list{
		padding: 0 12px;
		display: flex;
		justify-content: space-between;
	}
	.reward-cont >.price-list >.tip{
		width: 4.31rem;
		height: 4.31rem;
		background: #ffffff;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.reward-cont >.price-list >.tip>.right-tip{
		position: absolute;
		width: 0.512rem;
		height: 0.512rem;
		top: 6px;
		right: 6px;
		border-radius: 50%;
		overflow: hidden;
	}
	.reward-cont >.price-list >.tip>.right-tip>img{
		width: 100%;
		height: 100%;
	}
	.reward-cont >.price-list >.tip>h2{
		color: #555555;
		font-size: 0.767rem;
		font-family: "Avenir-Black";
	}
	.reward-cont >.price-list >.tip>p{
		margin-top: 0.15rem;
		color: #555555;
		font-size: 0.427rem;
		font-family: "PingFangSC-Light";
	}

	.choose{
		box-sizing: border-box;
		border:1px solid rgba(111,131,237,1);
	}
	.reward-cont>p{
		color: rgba(97,120,240,1);
		font-size: 0.512rem;
		font-family: "PingFangSC-Medium";
		margin-top: 22px;
		text-align: center;
	}
	.reward-cont>.give{
		margin-top: 1.6rem;
		margin-left: 12px;
		margin-right: 12px;
		border-radius: 6px;
		background: rgba(111,131,237,1);
		font-size: 0.767rem;
		color: #ffffff;
		font-family: "PingFangSC-Medium";
		text-align: center;
		height: 2.05rem;
		line-height: 2.05rem;
	}
	.reward-cont>.reference{
		margin-top: 0.555rem;
		font-size: 0.427rem;
		color: #999999;
		font-family: "PingFangSC-Light";
		text-align: center;
		height: 2.05rem;
		line-height: 2.05rem;
	}

/*弹框*/
	.re-tip{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.72);
	}
	.sub-bt{
		margin: auto;
		margin-top: calc( 40% );
		border-radius: 12px;
		background: #ffffff;
		width: 13.44rem;
		height: 8.7rem;
		position: relative;
	}
	.sub-bt>.icon-close{
		position: absolute;
		font-size: 0.47rem;
		color: #BDBDBD;
		float: right;
		right: 0.512rem;
		top: 0.512rem;
	}
	.sub-bt>h2{
		color: #000000;
		text-align: center;
		font-family: "PingFangSC-Semibold";
		font-size: 0.768rem;
		padding-top: 1.3rem;
	}
	.sub-bt>input{
		width: calc( 100% - 1.536rem);
		height: 1.534rem;
		margin: 0 0.768rem;
		margin-top: 1.2rem;
		background: #efefef;
		padding-left: 0.512rem;
		box-sizing: border-box;
		border-radius: 4px;
		font-size: 0.7rem;
		border: 0;
		font-family: "PingFangSC-Regular";
		color: #B5B5B5;
	}
	.sub-bt>button{
		margin: 0 3.84rem;
		margin-top: 1.024rem;
		background: #6F83ED;
		width: 5.76rem;
		height: 1.54rem;
		text-align: center;
		line-height: 1.54rem;
		color: #ffffff;
		border-radius: 6px;
		font-size: 0.6rem;
		font-family: "PingFangSC-Medium";
	}
</style>