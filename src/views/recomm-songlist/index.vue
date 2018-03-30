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
        <recomSongList :item="item" v-for="(item, index) in songList"></recomSongList>
      </ul>

    </div>
  </div>
</template>


<script type="es6">
import { vueH5 } from '../../common/utils'
import { mapState, mapMutations } from 'vuex'
import recomSongList from '../../components/recomSongList'

export default {
	data() {
		return {
			songList: '',
			page: 1,
			databaseList: true, //判断是否还有请求的数据,防止持续请求
      flag: true
		}
	},
  components: { recomSongList },
	created() {
    vueH5.taskAxios({
      method: 'get',
      url: 'playlist/list',
      data: {
        size: 10,
        category: 1,
        page:this.page
      }
    },( rtn => {
        this.songList = rtn.data
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
    loadMore() {
      if (this.flag) {
        this.loading = true;
        setTimeout(() => {
        this.page++      
        if(this.databaseList){
          vueH5.taskAxios({
            method: 'get',
            url: 'playlist/list',
            data: {
              page: this.page,
              category: 1,
              size: 10
            }
          },( rtnData => {
              if (rtnData.data.length) {
                this.newLoad = rtnData.data
                for (let i =0; i < rtnData.data.length; i++) {
                  this.songList.push(this.newLoad[i]);
                }
              } else {
                return this.databaseList=false
              }
              this.loading = false;
          }))
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
  
</style>
