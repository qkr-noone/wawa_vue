<template>
  <div id="article">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> 

    <div class="m_box m24">

      <ul class="m_alist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
          <recomBox :item="item" v-for="(item, index) in articleData"></recomBox>
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
import recomBox from '../../components/recomBox'
export default {
  data(){
    return {
      articleData:[],
      newLoad: '',
      page: 1,
      flag: true,
      loadState: false
    }
  },
  components: { recomBox  },
  created() {
    vueH5.taskAxios({
      method: 'get',
      url: 'doc/list',
      data: {
        page: this.page,
        size: 10,
        category: 4
      }
    }, ( rtn => {
        this.articleData = rtn.data
    }),( rtn => {
      console.log(rtn.error)
    }))
  },
  activated() {
    this.flag = true
  },
  deactivated() {
    this.setNavToggle(false)
    this.setIsTr(false)
    this.setIsDemaskNav(false)
    this.flag = false
  },
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  },

  mounted() {
    this.setRouterUrl(this.$route.path)
  },

  methods:{
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
    loadMore() {
      if (this.flag) {
        this.loading = true
        this.loadState = true
        setTimeout(() => {
          this.page++
          vueH5.taskAxios({
            method: 'get',
            url: 'doc/list',
            data: {
              page: this.page,
              size: 10,
              category: 4
            }
          },( rtnData => {
              if (rtnData.data.length) {
                this.newLoad = rtnData.data
                for (let i =0; i < rtnData.data.length; i++) {
                  this.articleData.push(this.newLoad[i]);
                }
              } else {
                this.loadState = false
                this.flag = false
                return false
              }              
              this.loading = false
              this.loadState = false
          }))
        }, 2500)
      }
    }
  }
}
</script>
<style lang='scss' scoped>

/* 列表 */
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

  #article {
    margin-bottom: 78px;
    margin-top: -12px
  }

  .m_box {
    box-sizing: border-box;
  }

  .m24 {
    margin: 24px 0
  }

  .bolder {
    font-weight: bolder;
    font-family: "AvenirLTStd-Medium", "Roboto-Light", "PingFangSC-Medium", "Microsoft YaHei", Helvetica, sans-serif;
  }



  .m_alist {
    padding: 0 0.6rem;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
  }

  .m_alist>li+li {
    box-sizing: border-box;
    padding-top: 1.7rem;
  }

  .load-state {
    height: 30px;
  }

  .load-state>img {
    height: 100%;
    text-align: center;
    margin: auto;
  }


</style>

