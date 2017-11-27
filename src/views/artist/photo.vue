<template>
	<div id="photo">

    <div class="photo-content" v-for="(list,index) in photoData">
      <div class="wrap" v-if="list.items.length==1">
        <div class="wrap-img-1">
          <img v-for="(item,index) in list.items" :src="item.res_cover" @click="container(item.res_cover)">
        </div>
      </div>
      <div class="wrap" v-else-if="list.items.length==2">
        <div class="wrap-img-2">
          <div v-for="(item,index) in list.items" @click="container(item.res_cover)"><img :src="item.res_cover"></div>
        </div>

      </div>
      <div class="wrap" v-else-if="list.items.length==3">
        <div class="wrap-img-3">
          <div v-for="(item,index) in list.items" @click="container(item.res_cover)"><img :src="item.res_cover"></div>
        </div>
      </div>
      <div class="wrap" v-else-if="list.items.length==4">
        <div class="wrap-img-4">
          <div v-for="(item,index) in list.items" @click="container(item.res_cover)"><img :src="item.res_cover"></div>
        </div>
      </div>
      <div class="wrap" v-else-if="list.items.length==5">
        <div class="wrap-img-5" >
          <div v-for="(item,index) in list.items" @click="container(item.res_cover)"><img :src="item.res_cover"></div>
        </div>
      </div>

      <div class="wrap" v-else>
        <div class="wrap-img-6">
          <div v-for="(item,index) in list.items" @click="container(item.res_cover)"><img :src="item.res_cover"></div>
        </div>
      </div>

      <h2 class="bolder">{{list.title}}</h2>
      <p>该相册下共有{{list.photo_count}}张图片</p>
      
    </div>

    <div class="tx" ref='txres' @click.stop="cancle()">
      <div><img :src="tx">
    </div></div>
	</div>
</template>
<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			photoData:'',
      tx: ''
		}
	},
  created() {
    const timestamp = Date.parse(new Date()) / 1000
    const page = 1 
    const size = 10
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/mp/photo/list@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: 'get',
      url: 'urlApi/app/v1/mp/photo/list',
      params: {
	      api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp,
        page: page,
        size: size,
        user_id: this.$route.query.id
      },
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization':'wawa ' + token
      }
    }).then( rtn => {
        this.photoData = rtn.data
        console.log(this.photoData)
    })
  },
  activated() {
  },
  deactivated() {
    this.setNavToggle(false)
    this.setIsTr(false)
    this.setIsDemaskNav(false)
    this.$destroy()
  },
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },
  mounted() {
    this.setRouterUrl(this.$route.path)
    document.documentElement.scrollTop = 0
    this.$refs.txres.style.visibility = 'hidden'
  },
  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
    container(res) {
      this.tx = res
      this.$refs.txres.style.visibility = 'visible'
    },
    cancle() {
      this.$refs.txres.style.visibility = 'hidden'
    }
  }
}
</script>
<style lang='scss' scoped>
/*公共*/
  #photo{
    margin-bottom: 3.4rem;
  }
  .wrap{
    background: #ffffff;
    color: #ffffff;
  }
  .wrap-img-5,.wrap-img-4,.wrap-img-3,.wrap-img-2,.wrap-img-6{
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  .tx{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed; 
    width: 100%;
    height: 100%;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
  }
  .tx>div{
   width: calc( 100% - 60px); 
   margin-bottom: 68px; 
  }
  .tx>div>img{
    width: 100%;
  }

/*6*/
  .wrap-img-6{
    position: relative;
  }
  .wrap-img-6>div{
    box-sizing: border-box;
    float: left;
    width: 32%;
  }
  .wrap-img-6>div:nth-child(1){
    height: 49%;
    overflow: hidden;
    margin-right: 3px;
    margin-bottom: 3px;
  }
  .wrap-img-6>div:nth-child(1)>img{
    height: 100%;
  }
  .wrap-img-6>div:nth-child(2){
    height: 60%;
    overflow: hidden;
    margin-left: 3px;
    margin-bottom: 3px;
    margin-right: 3px;
  }
  .wrap-img-6>div:nth-child(2)>img{
    height: 100%;
  }
  .wrap-img-6>div:nth-child(3){
    height: 50%;
    overflow: hidden;
    margin-left: 3px;
    margin-bottom: 3px;
  }
  .wrap-img-6>div:nth-child(3)>img{
    height: 100%;
  }
  .wrap-img-6>div:nth-child(4){
    position: absolute;
    top: 51%;
    clear: both;
    height: 49%;
    overflow: hidden;
    margin-top: 3px;
    margin-right: 3px;
  }
  .wrap-img-6>div:nth-child(4)>img{
    height: 100%;
  }
  .wrap-img-6>div:nth-child(5){
    position: absolute;
    top: 61%;
    left: 33%;
    height: 40%;
    overflow: hidden;
    margin-right: 3px;
    margin-top: 3px;
    margin-left: 3px;
  }
  .wrap-img-6>div:nth-child(5)>img{
    height: 100%;
  }
  .wrap-img-6>div:nth-child(6){
    height: 50%;
    margin-left: 3px;
    margin-top: 3px;
    overflow: hidden;
  }
  .wrap-img-6>div:nth-child(6)>img{
    height: 100%;    
  }

/*5*/
  .wrap-img-5{
    position: relative;
  }
  .wrap-img-5>div{
    box-sizing: border-box;
    float: left;
    width: 32%;
  }
  .wrap-img-5>div:nth-child(1){
    height: 100%;
    margin-right: 3px;
    overflow: hidden;
  }
  .wrap-img-5>div:nth-child(1)>img{
    width: initial;
    height: 100%;
  }
  .wrap-img-5>div:nth-child(2){
    height: 59%;
    padding-left: 3px; 
    margin-right: 3px; 
    overflow: hidden;
  }
  .wrap-img-5>div:nth-child(2)>img{
    height: 100%;
  }
  .wrap-img-5>div:nth-child(3){
    height: 49%;
    overflow: hidden;
    margin-left: 3px;
    margin-bottom: 3px;
  }
  .wrap-img-5>div:nth-child(3)>img{
  }
  .wrap-img-5>div:nth-child(4){
    height: 49%;
    overflow: hidden;
    margin-left: 3px;
    margin-top: 3px;
  }
  .wrap-img-5>div:nth-child(4)>img{
    height:100%;
  }
  .wrap-img-5>div:nth-child(5){
    position: absolute;
    margin-top: 1px;
    top: 61%;
    left: 32%;
    height: 39%;
    width: 32%;
    margin-left: 6px;
    padding-right: 3px;
    overflow: hidden;
  }
  .wrap-img-5>div:nth-child(5)>img{
    width: 100%;
  }

/*4*/  
  .wrap-img-4{
    display: flex;
    justify-content: space-around;
  }
  .wrap-img-4>div>img{
    height: 100%;
  }
  .wrap-img-4>div{
    box-sizing: border-box;
    float: left;
    overflow: hidden;
    width: 32%;
  }
  .wrap-img-4>div:nth-child(1){
    height: 100%;
    margin-right: 3px;
  }
  .wrap-img-4>div:nth-child(2){
    height: 49%;
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 3px;
    overflow: hidden;
  }
  .wrap-img-4>div:nth-child(2)>img{
    height: initial;
    width: 100%;
  }
  .wrap-img-4>div:nth-child(3){
    height: 100%;
    margin-left: 3px;
  }
  .wrap-img-4>div:nth-child(3)>img{
    width: initial;
    height: 100%;
  }
  .wrap-img-4>div:nth-child(4){
    position: absolute;
    top: 50%;
    left: 32%;
    margin-left: 7px;
    width: 32%;
    margin-top: 3px;
    box-sizing: border-box;
    overflow: hidden;
    height: 49%;
  }
  .wrap-img-4>div:nth-child(4)>img{
    height: 100% ;
  }

/*3*/
  .wrap-img-3>div{
    width: 49%;
    overflow: hidden;
    float: left;
  }
  .wrap-img-3>div>img{
  
  }
  .wrap-img-3>div:nth-child(1){
    height: 100%;
    margin-right: 3px;
  }
  .wrap-img-3>div:nth-child(1)>img{
    height: 100%;
  }
  .wrap-img-3>div:nth-child(2){
    height: 49%;
    margin-left: 3px;
    margin-bottom: 3px; 
  }
  .wrap-img-3>div:nth-child(2)>img{
    width: 100%;
    height: initial;
  }
  .wrap-img-3>div:nth-child(3){
    height: 50%;
    margin-left: 3px;
    margin-top: 3px;
    display: flex;
  }
  .wrap-img-3>div:nth-child(3)>img{
    width: 100%;
    height: initial;
    padding-bottom: 0;  
  }

/*2*/
  .wrap-img-2{
    display: flex;
    justify-content: space-between;
  }
  .wrap-img-2>div{
    overflow: hidden;
    width: 50%;
    height: 100%;
  }
  .wrap-img-2>div:nth-child(2){
    margin-left: 6px;
  }
  .wrap-img-2>div>img{
    height: 100%;
  }
/*content 1*/
  .photo-content{
    width: 16rem;
    box-sizing: border-box;
    margin-top: 34px;
    padding: 0 12px;
    color: #555555;
  }
  .photo-content>h2{
    margin: 0.64rem 0;
    font-size: 14px;
    font-family: 'PingFangSC-Medium';
    overflow: hidden;
  }
  .photo-content>p{
    font-size: 12px;
    font-family: 'PingFangSC-Light';
    overflow: hidden;
  }
  .photo-content>.wrap{
    width: 100%;
    height: 9.13rem;
    overflow: hidden;
  }
  .photo-content>.wrap>.wrap-img-1{
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  .photo-content>.wrap>.wrap-img-1>img{
    width: 100%;
  }
</style>
