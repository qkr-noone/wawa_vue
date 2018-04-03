<template>
  <div id="recomm-single">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <section>
      <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <li v-for ="item in recommSong">
          <router-link :to="{ path: '/recomm-single/detail', query: { id: item.id }}">
            <div><img :src="item.res_cover + '?width=200'"></div>
            <!-- onerror="onerror=null;src='http://www.lanrenzhijia.com/images/default.gif'" -->
            <h4 class="bolder">{{item.songname}}</h4>
            <p>{{item.singer}}</p>
          </router-link>
        </li>
      </ul>
      <div class="load-state" v-show="loadState">
        <img src="http://wawa.fm/static/img/app/loading.gif">
      </div>
    </section>
  </div>
</template>


<script type="es6">
import { vueH5 } from '../../common/utils'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return{
			recommSong: '',
			page: 1,
			databaseList: true, //判断是否还有请求的数据,防止持续请求
      flag: true,
      loadState: false
		}
	},
  created() {
    vueH5.taskAxios({
      method: 'get',
      url: 'track/recommend_list',
      data: {
        size: 10,
        page:this.page
      }
    },( rtn => {
        this.recommSong = rtn.data
    })) 

  },
  // 防止跳出页面后滚动继续加载
  activated () {
    this.flag = true
  },
  deactivated () {
    this.setNavToggle(false)
    this.setIsTr(false)
    this.setIsDemaskNav(false)
    this.flag = false
  },
  mounted() {
    this.setRouterUrl(this.$route.path)
  },
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },

  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
  	//  Q 1.到底了不要请求
    loadMore() {
    	if (this.flag) {
        this.loading = true
        this.loadState = true
        setTimeout(() => {
          this.page++       
          if(this.databaseList){
            vueH5.taskAxios({
              method: 'get',
              url: 'track/recommend_list',
              data: {
                page: this.page,
                size: 10
              }
            },( rtnData => {
                if (rtnData.data.length) {
                  this.newLoad = rtnData.data
                  for (let i =0; i < rtnData.data.length; i++) {
                    this.recommSong.push(this.newLoad[i]);
                  }
                } else {
                  this.loadState = false
                  return this.databaseList=false
                }
                this.loadState = false
                this.loading = false;
            }))
          }                  
        }, 2500);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
	#recomm-single{
		margin-bottom: 4rem;
	}

	section> ul {
    overflow: hidden;
    font-family: "PingFangSC-Medium";
    padding:0 0.6rem;
  }
  section> ul >li {
    width: 7.1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    float: left;
    overflow: hidden;
  }
  section> ul >li:nth-child(even){
    margin-left: 0.6rem;
  }
  section> ul >li >a{width: 100%;}
  section> ul >li >a >div{
    overflow: hidden;
  }
  section> ul >li >a >div:nth-child(1){
    width: 7.1rem;
    height: 7.1rem;
    overflow: hidden;
    border-radius: 8px;
  }
  section> ul >li >a >div img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
    position: relative;
  }
  section> ul >li >a >div img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_2.png');
  }
  section> ul >li> a> h4{
    font-size: 0.7rem;
    color: #555555;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    padding-top: 0.5rem;
    font-family: "PingFangSC-Medium";
  }
  section> ul >li> a > p{
    color: #999999;
    font-size: 0.6rem;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    padding-top: 0.25rem;
    font-family: "PingFangSC-Light";
   }
  .load-state{ height: 30px; }
  .load-state >img{height: 100%;text-align: center; margin: auto;}
</style>