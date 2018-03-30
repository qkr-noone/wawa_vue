<template>
	<div id="dynamic">
    <div class="dy-content" v-for="(item,index) in dynamicData" > <!-- @click="detail(item.id)" -->
      <div class="wrap">
        <img :src="item.res_cover +'?width=500'">
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
import { vueH5 } from '../../common/utils'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			dynamicData: ''
		}
	},
  created() { //点击后跳转到banner/article content 存在外部链接
    vueH5.taskAxios({
      method: 'get',
      url: 'doc/listbyuid',
      data: {
        page: 1,
        size: 10,
        category: 5,
        user_id: this.$route.query.id
      }
    },( rtn => {
        this.dynamicData = rtn.data
    }))
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