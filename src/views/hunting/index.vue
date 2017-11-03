<template>
  <div id="hunting">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>   
    <div>
      <ul class="m_alist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li to="" v-for="item in huntingData">
          <router-link :to="{ path:'/hunting/detail',query:{id: item.id} }">
            <div class="wrap-img"><img :src="item.res_cover + '?width=1000'" /></div>
            <h1 class="bolder">{{item.title}}</h1>
            <div class="m_listtags">
              <span>第{{item.number}}期</span>
              <span>
                <i class="icon-listen"></i>
                <p>{{item.play_count}}</p>
              </span>
            </div>
            <!-- 限制字数 -->
            <p>{{item.description}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			huntingData:'',
      page: 1,
      newLoad: ''
		}
	},
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl'])
  },

  created() {
    document.title = '猎乐 - 独立文艺的音阅社区'
    // console.log(this.$route.path)
    // console.log(this.$route)
    // var self = this
    const timestamp = Date.parse(new Date()) / 1000
    const category = 1
    // const page = 3
    const size = 10
    const user_id = ''
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/album/list@3ad3ebb04b5c94cd234e16a6aef9c8ae')
   
    axios({
      method: 'get',
      // urlApi=http://wawa.fm
      url: 'urlApi/app/v1/album/list',
      params: {
        api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp,
        page: this.page,
        size: size,
        category: category,
        user_id: user_id
      },
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin':'http://localhost:8080',
        'Authorization':'wawa ' + token
      }
    }).then( rtn => {
        this.huntingData = rtn.data
    })

    /*window.scroll(function () {
      let scrollTop = this.scrollTop()
      let scrollHeight = document.height()
      let windowHeight = this.height()
      if (scrollTop + windowHeight === scrollHeight) {
        console.log(this.scrollHeight)
      }
    })*/
  },

  mounted() {
    this.setRouterUrl(this.$route.path)
  },

  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl']),

    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.page++
        const timestamp = Date.parse(new Date()) / 1000
        const category = 1
        const size = 10
        const user_id = ''
        const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/album/list@3ad3ebb04b5c94cd234e16a6aef9c8ae')
       
        axios({
          method: 'get',
          // urlApi=http://wawa.fm
          url: 'urlApi/app/v1/album/list',
          params: {
            api_key: '0fcf845a413e11beb5606448eb8abbc4',
            timestamp: timestamp,
            page: this.page,
            size: size,
            category: category,
            user_id: user_id
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
                this.huntingData.push(this.newLoad[i]);
              }
            } else {
              return false
            }
            this.loading = false;
        })        
      }, 2500);
    }
  }
}
</script>
<style lang='scss' scoped>
@font-face {
  font-family: "AvenirLTStd-Light";
  src: url('../../../../fonts/AvenirLTStd-Light.otf')
}

@font-face {
  font-family: "AvenirLTStd-Medium";
  src: url('../../../../fonts/AvenirLTStd-Medium.otf')
}

@font-face {
  font-family: "AvenirLTStd-Black";
  src: url('../../../../fonts/AvenirLTStd-Black.otf')
}

#hunting {
  margin-bottom: 78px;
  margin-top: -12px
}

.m_alist {
  padding: 0 0.6rem;
  box-sizing: border-box;
  margin-top: 1.2rem;
  overflow: hidden;
  width: 100%;
}

.m_alist>li {
  width: 100%;
  overflow: hidden;
}

.m_alist>li a {
  width: 100%;
  overflow: hidden;
}

.m_alist>li+li {
  box-sizing: border-box;
  padding-top: 1.7rem;
}

.m_alist>li>a>.wrap-img {
  width: 14.8rem;
  border-radius: 8px;
  overflow: hidden;
  background: url('/static/img/placeholder_2.png?width=500');
}

.m_alist>li>a>.wrap-img>img {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat center;
}

.m_alist>li>a>h1 {
  line-height: 27px;
  color: #555;
  font-size: 18px;
  padding: 14px 0 8px 0;
  text-align: justify;
}

.m_alist>li>a>p {
  font-size: 14px;
  font-size: 14px;
  color: #666;
  line-height: 22px;
  margin-top: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}

  .m_listtags {
    overflow: hidden;
    height: 0.8rem;
    line-height: 0.8rem;    
    font-family: "PingFangSC-Regular";
  }
  .m_listtags>span {
    height: 0.8rem;
    line-height: 0.8rem;
    overflow: hidden;
    font-size: 0.6rem;
    color: #999999;
  }
  .m_listtags>span:nth-child(1) {
    float: left;
    margin-right: 0.6rem;
  }
  .m_listtags>span:nth-child(2){
    width: 10rem;
  }
  .m_listtags>span:nth-child(2)>i {
    float: left;
    line-height: 0.8rem;
    margin-right: 0.325rem;
  }
  .m_listtags>span>a,
  .m_listtags>span>i {
    height: 0.7rem;
    line-height:0.7rem;
  }
  .m_listtags>span>i {
    margin-right: 0.15rem;
    color: #cccccc;
    font-size: 0.45rem;
  }
  .m_listtags>span>img {
    float: left;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 0.45rem;
    margin-right:1.5px;
  }


</style>

