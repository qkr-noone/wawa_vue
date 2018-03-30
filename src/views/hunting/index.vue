<template>
  <div id="hunting">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <div>
      <ul class="m_alist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <albumBox :album="item" v-for="item in huntingData"></albumBox>
        <!-- <li v-for="item in huntingData">
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
            <p>{{item.description}}</p>
          </router-link>
        </li> -->
      </ul>

      <div class="load-state" v-show="loadState">
        <img src="http://wawa.fm/static/img/app/loading.gif">
      </div>
    </div>
  </div>
</template>


<script type="es6">
import { vueH5 } from '../../common/utils'
import { mapState, mapMutations } from 'vuex'
import albumBox from '../../components/albumBox'
export default {
	data(){
		return {
			huntingData:'',
      page: 1,
      newLoad: '',
      flag: true,
      loadState: false
		}
	},
  components: { albumBox },
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },

  created() {
    vueH5.taskAxios({
      method: 'get',
      url:'album/list',
      data: {
        page: this.page,
        size: 10,
        category: 1,
        user_id: ''
      }
    },( rtn => {
        this.huntingData = rtn.data
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

  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),

    loadMore() {
      // 防止跳出页面后滚动继续加载
      if (this.flag) {
        this.loading = true;
        this.loadState = true
        setTimeout(() => {
          this.page++       
          vueH5.taskAxios({
            method: 'get',
            url: 'album/list',
            data: {
              page: this.page,
              size: 10,
              category: 1,
              user_id: ''
            }
          },( rtnData => {
              if (rtnData.data.length) {
                this.newLoad = rtnData.data
                for (let i =0; i < rtnData.data.length; i++) {
                  this.huntingData.push(this.newLoad[i]);
                }
              } else {
                this.loadState = false
                this.flag = false
                return false
              }
              this.loading = false;
              this.loadState = false
          }))       
        }, 2500);
      }
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


.m_alist>li+li {
  box-sizing: border-box;
  padding-top: 1.7rem;
}

.load-state{ height: 30px; }
.load-state >img{height: 100%;text-align: center; margin: auto;}

</style>

