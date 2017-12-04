<template>
  <div id="songlist">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <div>
      <ul class="m_clist" 
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <li v-for="(item, index) in songList">
          <router-link :to="{ path:'/recomm-songlist/detail', query: { id: item.id} }">
            <div class="wrap">
            	<img :src="item['res_cover']+'?width=300'" />
            </div>
            <h1 class="bolder">{{item['title']}}</h1>
            <div class="m_c">
              <!-- 图片跨度 -->
              <span>
                <div class="mc-wrap"><img :src="item['headimg']"></div>
                <span>{{item['nickname']}}</span>
              </span>
              <span>
                <i class="icon-listen"></i>
                <span>&nbsp;{{item['play_count']}}&nbsp;</span>
              </span>
            </div>
          </router-link>
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
			songList: '',
			page: 1,
			databaseList: true, //判断是否还有请求的数据,防止持续请求
      flag: true
		}
	},
	created() {
    const timestamp = Date.parse(new Date()) / 1000
    const size = 10
    const category = 1
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/playlist/list@3ad3ebb04b5c94cd234e16a6aef9c8ae')
    axios({
      method: 'get',
      // urlApi=http://wawa.fm
      url: 'urlApi/app/v1/playlist/list',
      params: {
	      api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp,
        size: size,
        category: category,
        page:this.page
      },
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Access-Control-Allow-Origin':'http://localhost:8080',
        'Authorization':'wawa ' + token
      }
    }).then( rtn => {
        this.songList = rtn.data
    }) 
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
    loadMore() {
      if (this.flag) {
        this.loading = true;
        setTimeout(() => {
        this.page++
        const timestamp = Date.parse(new Date()) / 1000
        const category = 1
        const size = 10
        const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/playlist/list@3ad3ebb04b5c94cd234e16a6aef9c8ae')
       
       if(this.databaseList){
          axios({
            method: 'get',
            // urlApi=http://wawa.fm
            url: 'urlApi/app/v1/playlist/list',
            params: {
              api_key: '0fcf845a413e11beb5606448eb8abbc4',
              timestamp: timestamp,
              page: this.page,
              category: category,
              size: size
            },
            headers:{
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Access-Control-Allow-Origin':'http://localhost:8080',
            'Authorization':'wawa ' + token
            }
          }).then( rtnData => {
              if (rtnData.data.length) {
                this.newLoad = rtnData.data
                for (let i =0; i < rtnData.data.length; i++) {
                  this.songList.push(this.newLoad[i]);
                }
              } else {
                return this.databaseList=false
              }
              this.loading = false;
          })
        }       
        }, 2500);
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  #songlist {
    margin-bottom: 4rem;
  }

 /*推荐歌单*/
  .m_clist {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    padding: 0 0.6rem;
  }
  
  .m_clist>li {
    width: 7.1rem;
    padding-top: 0.6rem;
    float: left;
    overflow: hidden;
  }

  .m_clist>li:nth-child(even){
    margin-left: 0.6rem;
  }
  
  .m_clist>li>a {
    width: 100%;
    overflow: hidden;
  }
  
  .m_clist>li>a>.wrap {
    width: 7.1rem;
    height: 7.1rem;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .m_clist>li>a>.wrap>img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
    position: relative;
  }
  .m_clist>li>a>.wrap>img:after {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_2.png');
  }
  .m_clist>li>a>h1 {
    overflow: hidden;
    color: #555;
    text-align: left;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    height:  1.8rem;
    width: 100%;
    font-size: 0.6rem;
    margin: 8px 0;
    line-height: 0.9rem;
    color: #555555;
    font-family: "PingFangSC-Light";
  }
  .m_clist>li a>.m_c{
    overflow: hidden;
    height: 1.023rem;
    line-height: 1.023rem;
    color:#999999;
    font-size: 12px;
    text-align: center;
  }
  .m_clist>li a>.m_c>span:nth-child(1){
    float: left;
    height: 100%;
  }
  .m_clist>li a>.m_c>span:nth-child(1)> .mc-wrap{
    width: 1.023rem;
    height: 1.023rem;
    overflow: hidden;
    border-radius: 100%;
    float: left;
  }
  .m_clist>li a>.m_c>span:nth-child(1)> span{
    margin-left: 0.3rem;
    width: 3.5rem;
    text-align: left;
    overflow: hidden;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .m_clist>li a>.m_c>span:nth-child(1)> .mc-wrap>img{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .m_clist>li a>.m_c>span:nth-child(1)> .mc-wrap>img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_2.png');
  }
  .m_clist>li a>.m_c>span:nth-child(2){
    float: right;
  }
  .m_clist>li a>.m_c>span:nth-child(2)> i.icon-listen{
    font-size: 10px;
  }


  
</style>
