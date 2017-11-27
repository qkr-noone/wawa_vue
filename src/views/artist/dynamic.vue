<template>
	<div id="dynamic">
    <div class="dy-content" v-for="(item,index) in dynamicData" @click="detail(item.id)">
      <div class="wrap">
        <img :src="item.res_cover">
      </div>
      <h2 class="bolder">{{item.title}}</h2>
      <p>{{item.description}}</p>
    </div>

    <!-- <div class="dy-content" >
      <div class="wrap">
        <img src="static/img/dynamicT.png">
      </div>
      <h2 class="bolder">今年土星撞地球的时候我会有一场个演，如果不撞，那就不演了</h2>
      <p>事情远远不如你想的顺利</p>
    </div>

    <div class="dy-content" >
      <div class="wrap">
        <img src="static/img/dynamicT.png">
      </div>
      <h2 class="bolder">今年土星撞地球的时候那就不演了</h2>
      <p>事情远远不如你想的顺利</p>
    </div> -->

	</div>
</template>
<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			dynamicData: ''
		}
	},
  created() {
    const timestamp = Date.parse(new Date()) / 1000
    const page = 1 
    const size = 10
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/doc/listbyuid@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: 'get',
      url: 'urlApi/app/v1/doc/listbyuid',
      params: {
	      api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp,
        page: page,
        size: size,
        category: 5,
        user_id: this.$route.query.id
      },
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization':'wawa ' + token
      }
    }).then( rtn => {
        this.dynamicData = rtn.data
        console.log(this.dynamicData)
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
  },
  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
    detail(Uid){
      this.$router.push({ name:'bannerArticle', params:{id: Uid} })
    }
  }
}
</script>
<style lang='scss' scoped>
  #dynamic{
    margin-bottom: 3.4rem;
  }
  .dy-content{
    padding: 1.7rem 0.6rem 0 0.6rem;
    width: width;
  }
  .dy-content>.wrap{
    width: 14.8rem;
    height: 9.13rem;
    overflow: hidden;
    border-radius: 8px;
    color: #555555;
  }
  .dy-content>.wrap>img{
    width: 100%;
    height: 100%;
  }
  .dy-content>h2{
    margin-top: 12px;
    font-size: 18px;
    line-height: 24px;
    font-family: "PingFangSC-Medium"
  }
  .dy-content>p{
    font-size: 12px;
    margin-top: 12px;
    line-height: 12px;
    font-family: "PingFangSC-Light"
  }
</style>