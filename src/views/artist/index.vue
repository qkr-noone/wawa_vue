<template>
	<div id="artist">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

		<ul class="artist-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
			<li v-for="item in artistData" >
        <router-link :to="{ path:'/artist/detail',query: {id: item.id} }">
        <!-- <router-link to="/artist/detail"> -->
          <div><img :src="item.headimg + '?width=300'"></div>
          <div>
            <h4 class="bolder">{{item.nickname}}</h4>
            <p v-if='item.labels.length==0'>暂无</p>
            <p v-else>{{item.labels[0].label_zh}}&nbsp;·&nbsp;{{item.track_count}}首歌&nbsp;·&nbsp;{{item.play_count}}次播放</p>
          </div>
          <i class="icon-next"></i>
        </router-link>				
			</li>
		</ul>
    <div class="load-state" v-show="loadState">
      <img src="http://wawa.fm/static/img/app/loading.gif">
    </div>
	</div>
</template>
<script type="es6">
import { vueH5 } from '../../common/utils'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			artistData:'',
      newLoad:'',
      page: 1,
      flag: true,
      loadState: false
		}
	},
  created() {
    vueH5.taskAxios({
      method: 'get',
      url: 'musician/list',
      data: {
        page: this.page,
        size: 10,
        category: 3
      }
    },( rtn => {
        this.artistData = rtn.data
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
    document.documentElement.scrollTop = 0
  },
  methods: {
    ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
    loadMore() {
      if(this.flag){
        this.loading = true
        this.loadState = true
        setTimeout(() => {
          this.page++      
          vueH5.taskAxios({
            method: 'get',
            url: 'musician/list',
            data: {
              page: this.page,
              size: 10,
              category: 3
            }
          },( rtnData => {
            if (rtnData.data.length) {
              this.newLoad = rtnData.data
              for (let i = 0; i < rtnData.data.length; i++) {
                this.artistData.push(this.newLoad[i]);
              }
            }else {
              this.loadState = false
              this.flag = false
              return false
            }
            this.loading = false
            this.loadState = false
          }))     
        }, 1500);
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@font-face{ font-family: "AvenirLTStd-Light"; src: url('../../../../fonts/AvenirLTStd-Light.otf')}   
@font-face{ font-family: "AvenirLTStd-Medium"; src: url('../../../../fonts/AvenirLTStd-Medium.otf')}
@font-face{ font-family: "AvenirLTStd-Black"; src: url('../../../../fonts/AvenirLTStd-Black.otf')}

#artist {margin-bottom: 78px; margin-top: 12px}
.m_box{ box-sizing: border-box; }
.m24{ margin: 24px 0 }
.bolder{ font-weight: bolder; font-family: "AvenirLTStd-Medium","Roboto-Light","PingFangSC-Medium","Microsoft YaHei",Helvetica,sans-serif;}

.artist-list li a{ display: flex; align-content: space-between;	box-sizing: border-box;height: 100%;}
/*.artist-list li:nth-child(1){padding-bottom: 10px;padding-right: 8px;padding-left: 12px;}*/
.artist-list li{padding: 15px 8px 15px 12px;}
.artist-list li >a> div:nth-child(1){ width: 3rem;height: 3rem; border-radius: 50%;overflow: hidden;}
.artist-list li >a> div:nth-child(1)>img{width: 100%;height: 100%;position: relative;}
.artist-list li >a> div:nth-child(1)>img:after{width: 100%;height: 100%;position: absolute;top:0; left: 0;content: url('/static/h5/static/img/placeholder_2.png?width=200');}
.artist-list li >a> div:nth-child(2){ flex: auto; display: flex; flex-direction: column; justify-content:space-around;align-items: left; box-sizing: content-box; padding-left: 10px;}
.artist-list li >a> div:nth-child(2) > h4{ color: #595959; text-align: left;font-size: 15px;}
.artist-list li >a> div:nth-child(2) > p{ color: #9a9a9a; box-sizing: border-box;font-size: 12px;text-align: left;}
.artist-list li >a> i{ width: 5%; display: flex;  align-items: center; color: #bbb; font-size: 12px;}
.load-state{ height: 30px; }
.load-state >img{height: 100%;text-align: center; margin: auto;}
</style>