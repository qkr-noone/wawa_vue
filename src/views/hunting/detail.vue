  <template>
	<div id="hun-detail">
		<keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
		<div class="hun-detail-header">
			<div class="wrap">
				<img :src="huntDetail.cut_cover">
			</div>
			<div class="play">
				<i class="playtrack"><i class="icon-play" @click="addPlayList()"></i></i>
			</div>
		</div>

		<div class="hun-content">
			<h1 class="bolder">{{huntDetail.title}}</h1>
			<p>第{{huntDetail.number}}期<i class="icon-listen"></i>{{huntDetail.play_count}}</p>
			<div>
				<pre>{{huntDetail.description}}
				</pre>
			</div>
		</div>

		<div class="hun-list">
			<ul>
				<li v-for="(item, index) in huntDetail.tracks" >
					<a @click="playSong(index)">
						<span>{{index+1}}</span>
						<div>
							<img :src="item.res_cover">
						</div>
						<div>
							<h4 class="bolder">{{item.songname}}</h4>
							<p >{{item.singer}}</p>
						</div>
					</a>
				</li>
			</ul>
			<div class="listen-person">
				<ul>
					<li v-for="(item, index) in huntDetail.listen" v-if="index < 5">
						<img :src="item.headimg">
					</li>
				</ul>
				<p @click="loadWa()">下载挖哇App一起聆听</p>
			</div>
		</div>

	<!-- <div>
      <header class="m_box_title">
        <h1 class="bolder">往期推荐</h1>
      </header>
      <ul class="m_blist" id="musician_news">
        <div>
          <li v-for="(item,index) in huntDetail.recommend" to="">
          	<router-link :to="{path:'/hunting/detail',query:{id: item.id} }" @click="scrollbar()">
              <div><img :src="item.res_cover+'?width=300'"/></div>
              <h1 class="bolder">{{item.title}}</h1>
              <p>{{item.description}}</p>
          	</router-link>
          </li>
        </div>          
      </ul>
    </div> -->

    <!-- <div class="comment" v-if="commentList.length">
    	<header class="m_box_title">
        <h1 class="bolder">最新评论</h1>
      </header>
    	<ul>
    		<li v-for="(item,index) in commentList">
    			<div class="user-logo">
    				<img :src="item.from_headimg">
    			</div>
    			<div class="user-comment">
    				<h4>{{item.from_username}}</h4>
    				<p>{{item.create_at.slice(0,9)}}</p>
    				<span>
    					<div v-if="item.to_user==0">{{item.content}}</div>
    					<div v-else><span>回复 {{item.to_username}} :{{item.content}}</span>
    						<div>{{item.to_username}}的评论 : {{item.to_content}}
    						</div>
    					</div>
    				</span>
    			</div>
    		</li>
    	</ul>
    </div> -->
    
	</div>
</template>

<script type="es6">
	import md5 from 'js-md5'	
	import axios from 'axios'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				iconState: false,
				oneTime:true, //只点击一次
				huntDetail: '',
				commentList: '',
				page: 1,
        countState: true
			}
		},
		computed: {
  	  ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
  	},
		methods: {
			...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
			playSong: function(index) {
        if(this.huntDetail.tracks!=this.playList){
          this.setPlayList(this.huntDetail.tracks)
        }
				this.setPlayerData(this.huntDetail.tracks[index])
				this.iconState = true
        this.audio.play()
  	    this.setPlayState(true)
        this.setCurrentIndex(index)
  	    let instance = this.$toast('即将播放..')
  	    setTimeout(() => {
  	    	instance.close()
  	    },2500)
        if(this.countState){
          this.addCount()
          this.countState = false
        }
			},

			addPlayList: function() {
        this.setPlayList(this.huntDetail.tracks)
				if (this.oneTime) {
					let instance = this.$toast('即将播放..')
  	    	setTimeout(() => {
  	    		instance.close()
  	    	},2500)
  	    	this.oneTime =false
				}
        this.setCurrentIndex(0)
        this.setPlayerData(this.playList[this.currentIndex])
        this.audio.play()
        this.setPlayState(true)
        if(this.countState){
          this.addCount()
          this.countState = false
        }
			},

      getGuid(){
        var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            j = 0,
            k = 0,
            res1 = '',
            res2 = '';
        for (var i = 0; i < 10; i++) {
            j = Math.floor(Math.random() * 36);
            k = Math.floor(Math.random() * 36);
            res1 += data[j];
            res2 += data[k];
        }
        return res1 + new Date().getTime() + res2;
      },
      addCount(){
        const timestamp = Date.parse(new Date()) / 1000
        const token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/log/add@3ad3ebb04b5c94cd234e16a6aef9c8ae')
        if(!localStorage.getItem('GUID')){
          localStorage.setItem('GUID', this.getGuid())
        }      
        axios({
          method: 'post',
          url: 'urlApi/app/v1/log/add',
          data: {
            api_key: '0fcf845a413e11beb5606448eb8abbc4',
            timestamp: timestamp,
            user_id: 0,
            product: 1,
            platform: 3,
            unionid: localStorage.getItem('GUID'),
            source_type: 2,
            source_id: this.$route.query.id,      
            category: 1
          },
          transformRequest: [
            function(data){
              let ret = ''
              for (let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }
          ],
          headers:{
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization':'wawa ' + token
          }
        }).then( rtn => {
          // console.log(rtn.data)
        })/*.catch( rtn => {
          console.log(rtn.error)
        })*/
      },
  	  routeChange() {
    		let timestamp = Date.parse(new Date()) / 1000
    		let token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/album/info@3ad3ebb04b5c94cd234e16a6aef9c8ae')

    		axios({
    		  method: 'get',
    		  async: 'flase',
    		  // urlApi=http://wawa.fm
    		  url: 'urlApi/app/v1/album/info',
    		  params: {
	  		    api_key: '0fcf845a413e11beb5606448eb8abbc4',
    		    timestamp: timestamp,
    		    id: this.$route.query.id
    		  },
    		  headers:{
      		  'X-Requested-With': 'XMLHttpRequest',
      		  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      	  	// 'Access-Control-Allow-Origin':'http://localhost:8080',
      	  	'Authorization':'wawa ' + token
      		}
    		}).then( rtn => {
        	this.huntDetail = rtn.data
          // this.setPlayList(this.huntDetail.tracks)

        	/*timestamp = Date.parse(new Date())
        	token = md5('api_key=0fcf845a413e11beb5606448eb8abbc4&timestamp=' + timestamp + '&rest_url=/app/v1/comment/list@3ad3ebb04b5c94cd234e16a6aef9c8ae')
        	axios({
    	  		method: 'get',
    	  		// urlApi=http://wawa.fm
    	  		url: 'urlApi/app/v1/comment/list',
    	  		params: {
	  	  		  api_key: '0fcf845a413e11beb5606448eb8abbc4',
    	  		  timestamp: timestamp,
    	  		  page: 1,
    	  		  size: 10,
    	  		  source_type: 4,
    	  		  source_id: this.huntDetail.id
    	  		},
    	  		headers:{
      	  		'X-Requested-With': 'XMLHttpRequest',
      	  		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        			// 'Access-Control-Allow-Origin':'http://localhost:8080',
        			'Authorization':'wawa ' + token
      			}
    			}).then( rtnData => {
        		this.commentList = rtnData.data
        		console.log(this.commentList)
        		this.scrollbar()
    			})*/
    		})
  	  },
      loadWa() {
        window.location.href = 'https://wawa.fm/static/app/wawa/download.html'
      },
  	 /* preloadImages: function(arr) {
            var newimages = [],
                loadedimages = 0,
                postaction = function() {};
            arr = (typeof arr != "object") ? [arr] : arr;

            function imageloadpost() {
                loadedimages++
                if (loadedimages == arr.length) {
                    postaction(newimages);
                }
            }
            for (var i = 0; i < arr.length; i++) {
                newimages[i] = new Image()
                newimages[i].src = arr[i]
                newimages[i].onload = function() {
                    imageloadpost()
                }
                newimages[i].onerror = function() {
                    imageloadpost()
                }
            }
            return {
                done: function(f) {
                    postaction = f || postaction
                }
            }
        },*/
		},
		/*beforeCreate() {
			this.preloadImages([
           'http://up.wawa.fm/18,e0e2b2ce7111',   //灰1.64
           'http://up.wawa.fm/15,e0e5dc7fcbc1',  //灰1                
           'http://up.wawa.fm/20,e0e40b52d9ab',  //蓝1                
           'http://up.wawa.fm/20,e0e341bffeb3',  //蓝1.64
           'http://up.wawa.fm/20,e0e7b919093c'   //二维码
       ]);
		},*/
		created() {
  		this.routeChange()
  	},
  	deactivated () {
      this.setNavToggle(false)
      this.setIsTr(false)
      this.setIsDemaskNav(false)
			this.$destroy()
		},
  	mounted() {
      let audio = document.getElementById("audio")
      this.audio = audio
    	this.setRouterUrl(this.$route.path)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
  	}
	}
</script>
<style lang="scss" scoped>
	#hun-detail{
		margin-bottom: 4rem;
	}
/*头部*/
	.hun-detail-header {
		position: relative;
	}
	.hun-detail-header .wrap {
		width: 16rem;
		height: 9.77rem;
		overflow: hidden;
	}
	.hun-detail-header .wrap >img {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat center;
		position: relative;
	}
	.hun-detail-header .wrap >img:after {
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		content: url('/static/h5/static/img/placeholder_1.png?width=320');
	}
	.hun-detail-header .play {
		position: absolute;
		bottom: -1.15rem;
		right: 0.768rem;
	}
	.play>i.playtrack {
    position: relative;
    background: rgba(119,119,119,1) no-repeat center;
    border-radius: 50%;
    background-size: 100%;
    cursor: pointer;
    width: 2.3rem;
    height: 2.3rem;
    color: #777777;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .play>i.playtrack> i {
    color: #ffffff;
    /*margin-left: 0.02rem;*/
    position: absolute;
    top: 0.85rem;
    left: 0.89rem;
    font-size: 0.74rem;
  }

/*内容*/
	.hun-content{
		padding: 0.8rem 0.767rem;
		padding-bottom: 0;
	}
	.hun-content >h1 {
		font-size:1.023rem;
		font-family: "PingFangSC-Medium";
		color: #555555;
		line-height: 1.1rem;
		margin-right: 2.6rem;
	}
	.hun-content >p{
		font-size: 0.6rem;
		font-size: "PingFangSC-Regular";
		color: #999999;
		margin-top: 0.8rem;
    line-height: 0.8rem;
    text-align: justify;
    height: 0.8rem;
    line-height: 0.8rem;
    font-family: "PingFangSC-Regular";
	}
	.hun-content >p>i{
		color: #cccccc;
		font-size: 0.45rem;
    padding-left: 1.024rem;
    padding-right: 0.256rem;
	}
	.hun-content >div pre{
		margin-top: 0.8rem;
		font-family: "PingFangSC-Light";
		font-size: 15px;
		white-space: pre-wrap;
    word-wrap: break-word;
    color: #555555;
    line-height: 1.35rem;
    letter-spacing: 0.024rem;
	}

/*播放列表*/
	.hun-list ul{
  	width: 100%;
  	overflow: hidden;
  }
  .hun-list >ul >li{
  	margin: 0.9rem 0;
  	
  }
  .hun-list ul >li >a{
  	margin-left: 0.6rem;
  	display: flex;
  	flex-direction: row;
  	justify-content: flex-start;
  	color: #555555;
  }
  .hun-list >ul >li >a span{
  	width: 0.5rem;
  	font-size: 0.6rem;
  	color: #999999;
  	font-family: "PingFangSC-Medium";
  	display: flex;
  	justify-content: center;
  	align-items: center;
  }
  .hun-list >ul >li >a div:nth-child(2){
  	width: 2.25rem !important;
  	height: 2.25rem !important;
  	border-radius: 0.3rem;
  	margin-left: 0.6rem;
  	overflow: hidden;
  }
  .hun-list >ul >li >a div:nth-child(2) >img{
  	width: 100%;
  	height: 100%;
  	background-repeat: no-repeat center;
    position: relative;
  }
  .hun-list >ul >li >a div:nth-child(2) >img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_1.png?width=200');
  }
  .hun-list >ul >li >a div:nth-child(3){
  	margin-left: 0.6rem;
  	width: 11rem;
  	overflow: hidden;
  	display: flex;
  	flex-direction: column;
  	justify-content: space-around;
  }
  .hun-list> ul >li >a div:nth-child(3) >h4 {
  	font-size: 0.65rem;
  	font-family: "PingFangSC-Medium";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

  }
	.hun-list >ul >li >a div:nth-child(3) >p {
		font-size: 12px;
		color:#999999;
  	font-family: "PingFangSC-Regular";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
	}
	.click{
		color: #6178F0 !important;
	}

	.hun-list >.listen-person{
		overflow: hidden;
		margin-top: 1rem;
		height: 1.278rem;
	}
	.hun-list >.listen-person >ul{
		width: 50%;
		height: 100%;
		box-sizing: border-box;
		padding-left: 0.66rem;
		float: left;
	}
	.hun-list >.listen-person >ul>li{
		width: 1.278rem;
		height: 1.278rem;
		overflow: hidden;
		border-radius: 50%;
		float: left;
		box-shadow: 0 0 0px 0.1rem #ffffff;

	}
	.hun-list >.listen-person >ul>li+li{
		margin-left: -0.639rem;
	}
	.hun-list >.listen-person >ul>li>img{
		width: 100%;
		height: 100%;
    position: relative;
	}
  .hun-list >.listen-person >ul>li>img:after{
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_1.png?width=100');
  }
	.hun-list >.listen-person >p{
		display: block;
		width: 43%;
		float: right;
		box-sizing: border-box;
		padding-right: 0.6rem;
		line-height: 1.278rem;
		font-size: 0.512rem;
		color:#9B9B9B;
		font-family: "PingFangSC-Regular"
	}
	.hun-list >.listen-person >p{
		text-align: right;
	}

/*往期推荐*/
  .m_blist{
  	padding: 0 12px; 
  	box-sizing: border-box; 
  	overflow: hidden; 
  }
  .m_box_title{ 
  	height: 60px; 
  	overflow: hidden; 
  	margin-top: 1.8rem;
  }
	.m_box_title>h1{ 
		height: 60px; 
		line-height: 62px; 
		margin-left: 12px; 
		font-size: 20px; 
		float: left; 
		color: #555; 
	}
	.m_box_title>a{ 
		height: 44px; 
		padding: 0 12px 0 40px; 
		margin: 8px 0; 
		float: right; 
		color: #bbb; 
		text-align: center; 
		line-height: 44px; 
	}

  .m_blist> div > li{
  	width: 9.98rem;
  	height: 8.454rem; 
  	float: left; 
  	margin-right: 28px; 
  	overflow: hidden;
  }
  .m_blist> div > li >a{
  	width: 100%;
  	position: relative; 
  	overflow: hidden;
  }
  .m_blist> div > li>a>button{
  	height: 36px; width: 36px; 
  	position: absolute; bottom: 56px; 
  	right: 0; 
  }
  .m_blist> div > li>a>button>i{
  	width: 22px; height: 24px; 
  	background-color: rgba(0,0,0,.4); 
  	border-radius: 24px; margin: 6px; 
  	color: #fff; text-align: center; 
  	line-height: 24px; font-size: 10px; padding-left: 2px 
  }
  .m_blist> div > li>a>div{
  	width: 100%; 
  	overflow: hidden; 
  }
  .m_blist> div > li>a>div img{
  	width: 100%;
  	background-repeat: no-repeat center;
  }
  .m_blist> div > li>a>h1{
  	overflow: hidden;
  	color: #555; font-size: 0.6rem; 
  	font-family: "PingFangSC-Medium";
  	margin-top: 0.511rem; 
  	text-align: left;
  }
  .m_blist> div > li>a>p{
  	font-size: 0.512rem;
  	display: block;
  	line-height: 1.2rem;
  	font-family: "PingFangSC-Regular";
  	color: #999999; 
  	margin-top:0.1rem;  
  	overflow: hidden;
  	text-overflow: ellipsis;
    /*-webkit-line-clamp: 4;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;*/
  }

/*隐藏滚动条*/
  #musician_news,#tracks {overflow: hidden;}

	#musician_news > div,
	#tracks > div{
		white-space: nowrap; overflow-x: auto; height: 110%;
	}
	#musician_news > div::-webkit-scrollbar,
	#tracks > div::-webkit-scrollbar{ 
		width: 0px; height: 0px; 
		background-color:transparent;
	}
	#musician_news > div::-moz-scrollbar,#tracks > div::-moz-scrollbar{ width: 0px; height: 0px; background-color:transparent;} #musician_news > div::-ms-scrollbar,#tracks > div::-ms-scrollbar{ width: 0px; height: 0px; background-color:transparent;} #musician_news > div::-o-scrollbar,#tracks > div::-o-scrollbar{ width: 0px; height: 0px; background-color:transparent;} #musician_news > div::scrollbar,#tracks > div::scrollbar{ width: 0px; height: 0px; background-color:transparent;}

	#musician_news > div> li,
	#tracks > div > li{ 
		display: inline-block; float: initial;
	}
	#tracks > div > li >button { 
		background: transparent;border: none; 
	}
	#musician_news > div > li:last-child,
	#tracks > div > li:last-child{
		margin-right: 0
	}

/* 最新评论*/
	.comment>ul{
		width: 100%;
		padding: 0 0.6rem;
    box-sizing: border-box;
	}
	.comment>ul > li{
		display: flex;
		justify-content:flex-start;
		overflow: hidden;
		margin-bottom: 1.8rem;
	}
	.comment>ul > li> div.user-logo{
		width: 1.536rem;
		height: 1.536rem;
		overflow: hidden;
		border-radius: 50%;
	}
	.comment>ul > li> div> img{
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
	}

	.comment>ul > li> div.user-comment{
		padding-left: 0.512rem;
		width: 12.8rem;
		overflow: hidden;
	}
	.comment>ul > li> div.user-comment h4{
		color: #6178F0;
		font-family: "PingFangSC-Regular";
		font-size: 0.512rem;
		line-height: 0.512rem;
		margin-bottom: 0.2rem;
	}
	.comment>ul > li> div.user-comment p{
		color: #999999;
		font-family: "PingFangSC-Light";
		font-size: 0.216rem;
	}
	.comment>ul > li> div.user-comment>span{
		width: 100%;
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #555555;
		font-family: "PingFangSC-Light";
		font-size: 0.6rem;
		letter-spacing: 0.0213rem;
		padding-top: 0.555rem;
	}
	.comment>ul > li> div.user-comment>span>div>span{
		width: 100%;
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #555555;
		font-family: "PingFangSC-Light";
		font-size: 0.6rem;
		letter-spacing: 0.0213rem;
		padding-bottom: 0.4rem;
	}
	.comment>ul > li> div.user-comment>span >div>div{
		padding-left: 0.3rem;
		box-sizing: border-box;
		width: 100%;
		background-color: rgba(218,218,218,0.41);
		border-radius: 12px;
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #555555;
		font-family: "PingFangSC-Light";
		font-size: 0.6rem;
		letter-spacing: 0.0213rem;
		padding-top: 0.65rem;
	}
</style>