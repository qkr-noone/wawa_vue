<template>
	<div id="artist">

      <router-view></router-view>

		<ul class="artist-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
			<li v-for="item in artistData" >
        <router-link :to="{ path:'/artist/detail',query: {id: item.id} }">
        <!-- <router-link to="/artist/detail"> -->
          <img :src="item.headimg + '?width=300'">
          <div>
            <h4 class="bolder">{{item.nickname}}</h4>
            <p>{{item.labels[0].label_zh}}&nbsp;·&nbsp;{{item.track_count}}首歌&nbsp;·&nbsp;{{item.play_count}}次播放</p>
          </div>
          <i class="icon-next"></i>
        </router-link>				
			</li>
		</ul>
	</div>
</template>
<script type="es6">
import axios from 'axios'
import md5 from 'js-md5'
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			artistData:'',
      newLoad:'',
      page: 1
		}
	},
  created() {
    document.title = '乐人 - 独立文艺的音阅社区'
    const timestamp = Date.parse(new Date()) / 1000
    const category = 3
    // const page = 1
    const size = 10
    const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/musician/list@3ad3ebb04b5c94cd234e16a6aef9c8ae') 
    axios({
      method: 'get',
      // urlApi=http://wawa.fm
      url: 'urlApi/app/v1/musician/list',
      params: {
	      api_key: '0fcf845a413e11beb5606448eb8abbc4',
        timestamp: timestamp,
        page: this.page,
        size: size,
        category: category
      },
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Access-Control-Allow-Origin':'http://localhost:8080',
        'Authorization':'wawa ' + token
      }
    }).then( rtn => {
        this.artistData = rtn.data
    })
  },
  computed: {
    ...mapState(['playerData','playState','playList','currentIndex','routerUrl'])
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
        const category = 3
        const size = 10
        const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/musician/list@3ad3ebb04b5c94cd234e16a6aef9c8ae')
       
        axios({
          method: 'get',
          // urlApi=http://wawa.fm
          url: 'urlApi/app/v1/musician/list',
          params: {
            api_key: '0fcf845a413e11beb5606448eb8abbc4',
            timestamp: timestamp,
            page: this.page,
            size: size,
            category: category
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
            for (let i = 0; i < rtnData.data.length; i++) {
              this.artistData.push(this.newLoad[i]);
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
@font-face{ font-family: "AvenirLTStd-Light"; src: url('../../../../fonts/AvenirLTStd-Light.otf')}   
@font-face{ font-family: "AvenirLTStd-Medium"; src: url('../../../../fonts/AvenirLTStd-Medium.otf')}
@font-face{ font-family: "AvenirLTStd-Black"; src: url('../../../../fonts/AvenirLTStd-Black.otf')}

#artist {margin-bottom: 78px; margin-top: 12px}
.m_box{ box-sizing: border-box; }
.m24{ margin: 24px 0 }
.bolder{ font-weight: bolder; font-family: "AvenirLTStd-Medium","Roboto-Light","PingFangSC-Medium","Microsoft YaHei",Helvetica,sans-serif;}

.artist-list li a{ display: flex; align-content: space-between;	box-sizing: border-box;}
/*.artist-list li:nth-child(1){padding-bottom: 10px;padding-right: 8px;padding-left: 12px;}*/
.artist-list li{padding: 15px 8px 15px 12px;}
.artist-list li >a> img{ width:16%;height: 16%; border-radius: 50%;}
.artist-list li >a> div{ flex: auto; display: flex; flex-direction: column; justify-content:space-around;align-items: left; box-sizing: content-box; padding-left: 10px;}
.artist-list li >a> div > h4{ color: #595959; text-align: left;font-size: 15px;}
.artist-list li >a> div > p{ color: #9a9a9a; box-sizing: border-box;font-size: 12px;text-align: left;}
.artist-list li >a> i{ width: 5%; display: flex;  align-items: center; color: #bbb; font-size: 12px;}
</style>