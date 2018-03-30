<template>
	<div id="banner-article">
		<keep-alive>
      <router-view></router-view>
    </keep-alive>  
    
		<div class="ban-article">
			<h2 class="bolder" >{{bannerArticle.title}}</h2>
			<p>文 / {{bannerArticle.author}}</p>
			<p>{{bannerArticle.review_at | dateFormat}} &nbsp;&nbsp;&nbsp;&nbsp;{{bannerArticle.view_count}}人看过</p>
			<div>
				<img :src="bannerArticle.res_cover +'?width=500'">
			</div>
		</div>
		<div class="content" v-html="bannerArticle.content" @click="addSongPlay($event)">
			{{bannerArticle.content}}
		</div>
		
	<!-- <div>
      <header class="m_box_title">
        <h1 class="bolder">相似推荐</h1>
      </header>
      <ul class="m_blist" id="musician_news">
        <div>
          <li v-for="(item,index) in bannerArticle.recommend" to="">
          	<router-link :to="{path:'/banner/article',query:{id: item.id} }">
              <div><img :src="item.res_cover+'?width=300'"/></div>
              <h1 class="bolder">{{item.title}}</h1>
              <p>{{item.description}}</p>
          	</router-link>
          </li>
        </div>          
      </ul>
    </div> -->

    <!-- <div class="comment" v-if="bannerComment.length">
    	<header class="m_box_title">
        <h1 class="bolder">最新评论</h1>
      </header>
    	<ul>
    		<li v-for="(item,index) in bannerComment">
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
import { vueH5, getGuid } from '../../common/utils'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				bannerArticle: '',
				bannerComment: '',
				songListId: [],
				testData: false,
				data: ''
			}
		},
    computed: {
      ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
    },
    filters: {
      dateFormat(value){
        if(value){
          return value.slice(0, 10)
        }
      }
    },
		methods: {
			...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),

  	  routeChange() {
    		vueH5.taskAxios({
    		  method: 'get',
    		  url: 'doc/info',
    		  data: {
    		    user_id: 0,
    		    category: 2,
    		    id: this.$route.params.id
    		  }
    		},( rtn => {
        	this.bannerArticle = rtn.data
    		}))
  	  },

  	  addSongPlay(event){
        if(event){ // Q 1. 防止报错..
  	  	  if(event.target.getAttribute('id').length===11&&event.target.nodeName === 'I'){
  	  		let instance = this.$toast('即将播放..')
  	  		setTimeout( () => {
  	  			instance.close()
  	  		},2500)

          // IOS audio
          this.audio.play()
          this.audio.pause()
      		vueH5.taskAxios({
      		 	method: 'get',
      		 	url: 'track/info',
      		 	data: {
      		 	  user_id: 0,
      		 	  id: event.srcElement.id
      		 	}
      		},( rtn => {
      			this.data = rtn.data
            this.playList.push(rtn.data)
            let index = this.playList.length - 1
            this.setCurrentIndex(index)            
      			this.setPlayerData(this.playList[index])
            this.audio.play()
      			this.setPlayState(true)
      	  }))
  	  	  }
        }
  	  },
      addCount(){
        if(!localStorage.getItem('GUID')){
          localStorage.setItem('GUID', getGuid())
        }      
        vueH5.taskAxiosForm({
          method: 'post',
          url: 'log/add',
          data: {
            user_id: 0,
            product: 1,
            platform: 3,
            unionid: localStorage.getItem('GUID'),
            source_type: 4,
            source_id: this.$route.params.id,      
            category: 7
          }
        })
      }

		},
		created() {
  		this.routeChange()  
  	},
    deactivated(){
      this.setNavToggle(false)
      this.setIsTr(false)
      this.setIsDemaskNav(false)
    },
  	mounted() {
      let audio = document.getElementById("audio")
      this.audio = audio
  		this.addSongPlay(event)
      this.setRouterUrl(this.$route.path)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      this.addCount()
  	},
  	watch:{
  		'$route':'routeChange'
  	}
}
</script>

<style lang='scss' scoped>
  #banner-article{
    margin-bottom: 4rem;
  }
/*头部*/
  .ban-article{
    padding-top: 0.9rem;
    /*display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;*/
    color: #555555;
  }
  .ban-article >h2{
    text-align: center;
    font-size: 0.9rem;
    font-family: "PingFangSC-Semibold"
    letter-spacing：0.213rem;
    min-height: 1.25rem;
    padding: 0 1rem;
  }
  .ban-article >p:nth-child(2){
    text-align: center;
    font-size: 0.512rem;
    margin-top: 0.512rem;
    color: #666666;
    font-family: "PingFangSC-Light";
  }
  .ban-article >p:nth-child(3){
    text-align: center;
    font-size: 0.427rem;
    margin-top: 0.363rem;
    font-family: "PingFangSC-Light";
  }
  .ban-article >div{
    width: 100%;
    height: 8.87rem;
    overflow: hidden;
    margin-top: 0.81rem;
    background-color: url('/static/h5/static/img/placeholder_1.png?width=375');
  }
  .ban-article >div>img{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .ban-article >div>img:after{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: url('/static/h5/static/img/placeholder_1.png?width=375');
  }

/*相似推荐*/
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
    border-radius: 0.3rem;
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
