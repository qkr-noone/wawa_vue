<template>
  <!-- <mt-swipe :auto="3000" v-for="(item,index) in items">
    <mt-swipe-item>{{ item.index }}</mt-swipe-item>
  </mt-swipe> -->
  <div>
    <div class="container">
      <div class="banner" id="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item><img src="http://up.wawa.fm/16,edf4b7f4f46d?width=1200"></mt-swipe-item>
          <mt-swipe-item><img src="http://up.wawa.fm/16,edf4b7f4f46d?width=1200"></mt-swipe-item>
          <mt-swipe-item><img src="http://up.wawa.fm/16,edf4b7f4f46d?width=1200"></mt-swipe-item>
          <mt-swipe-item><img src="http://up.wawa.fm/16,edf4b7f4f46d?width=1200"></mt-swipe-item>
          <mt-swipe-item><img src="http://up.wawa.fm/16,edf4b7f4f46d?width=1200"></mt-swipe-item>
          <!-- <img src="../../../../img/4.jpg"> -->
        </mt-swipe>
      </div>

      <!-- <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">推荐乐人</h1>
          <i class="icon-next"></i>
        </header>
        <ul class="m_alist">
          <li>
            <img src="http://up.wawa.fm/20,f55a7a7cf5a7?width=800" />
            <h1 class="bolder">打玩艺儿乐队：专访丨二妹妹捎来了一封信 打玩艺儿是真正的好</h1>
            <div class="m_listtags"><span class="fl">文 / 半生</span><span class="fl"><i class="icon-view"></i><a>234221</a></span></div>
            <p>他们的音乐，是有“根儿”的灵魂，纯粹不做作</p>
          </li>
        </ul>
      </div>

      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">最新入驻</h1>
          <i class="icon-next"></i>
        </header>
        <ul class="m_blist">
          <li>
            <img src="http://up.wawa.fm/21,e1a572b27821?width=200&height=200" />
            <h1 class="bolder">小安</h1>
            <h2>Folk</h2>
          </li>
          <li>
            <img src="http://up.wawa.fm/5,4d9dd13f41a5?width=200&height=200" />
            <h1 class="bolder">新香水乐队</h1>
            <h2>Rock</h2>
          </li>
        </ul>
      </div>

      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">猎乐合辑</h1>
          <i class="icon-next"></i>
        </header>
        <ul class="m_alist">
          <li>
            <img src="http://up.wawa.fm/18,f3042e912022?width=800" />
            <h1 class="bolder">年轻人该有的生活方式</h1>
            <div class="m_listtags"><span class="fl">第178期</span><span class="fl"><i class="icon-listen"></i><a>926801</a></span></div>
            <p>童年虽早已不复返，但却历历在目</p>
          </li>
        </ul>
      </div>

      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">推荐单曲</h1>
          <i class="icon-next"></i>
        </header>
        <ul class="m_blist">
          <li>
            <img src="http://up.wawa.fm/18,f0ae898d035b?width=300" />
            <h1 class="bolder">跋山涉水遇见你</h1>
            <h2>龙锦乐队</h2>
            <button><i class="icon-play"></i></button>
          </li>
          <li>
            <img src="http://up.wawa.fm/18,f0ae898d035b?width=300" />
            <h1 class="bolder">跋山涉水遇见你</h1>
            <h2>龙锦乐队</h2>
            <button><i class="icon-play"></i></button>
          </li>
        </ul>
      </div>

      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">推荐悦读</h1>
          <i class="icon-next"></i>
        </header>
        <ul class="m_alist">
          <li>
            <img src="http://up.wawa.fm/19,f303974bc700?width=800" />
            <h1 class="bolder">最近三个月，这10个小习惯，让我的生活品质加倍提高！</h1>
            <div class="m_listtags"><span class="fl"><img src="http://up.wawa.fm/1,c29d6fb0cc07?width=40"><a>视觉系</a></span class="fl"><span class="fl"><i class="icon-view"></i><a>234221</a></span></div>
            <p>他们的音乐，是有“根儿”的灵魂，纯粹不做作</p>
          </li>
        </ul>
      </div>

      <div class="m_box m24">
        <header class="m_box_title">
          <h1 class="bolder">推荐歌单</h1>
          <i class="icon-next"></i>
        </header>
        <ul class="m_clist">
          <li class="mb20">
            <img src="http://up.wawa.fm/20,f29fb59194ca?width=500" />
            <h1 class="bolder">画面感十足的音乐.. 晕眩，漫游深海，与水母为伴</h1>
            <div class="m_listtags">
              <span class="fl"><img src="http://up.wawa.fm/15,f6646f44d4f6?width=40"><a>博仔</a></span>
              <span class="fr"><i class="icon-listen"></i><a>17579</a></span>
            </div>
          </li>
          <li class="mb20">
            <img src="http://up.wawa.fm/20,ee21df1b283c?width=500" />
            <h1 class="bolder">厌倦了以后抛弃所有的我 结果还是回到了这里</h1>
            <div class="m_listtags">
              <span class="fl"><img src="http://up.wawa.fm/17,f661f7015716?width=40"><a>andy在郑州</a></span>
              <span class="fr"><i class="icon-listen"></i><a>14279</a></span>
            </div>
          </li>
          <li class="mb20">
            <img src="http://up.wawa.fm/20,f29fb59194ca?width=500" />
            <h1 class="bolder">画面感十足的音乐.. 晕眩，漫游深海，与水母为伴</h1>
            <div class="m_listtags">
              <span class="fl"><img src="http://up.wawa.fm/15,f6646f44d4f6?width=40"><a>博仔</a></span>
              <span class="fr"><i class="icon-listen"></i><a>4462</a></span>
            </div>
          </li>
          <li class="mb20">
            <img src="http://up.wawa.fm/20,ee21df1b283c?width=500" />
            <h1 class="bolder">厌倦了以后抛弃所有的我 结果还是回到了这里</h1>
            <div class="m_listtags">
              <span class="fl"><img src="http://up.wawa.fm/17,f661f7015716?width=40"><a>andy在郑州</a></span>
              <span class="fr"><i class="icon-listen"></i><a>8711</a></span>
            </div>
          </li>
        </ul>
      </div> -->
    </div>

    
    <!-- <img src="http://up.wawa.fm/20,e5dc8721327d?width=320"> -->
    <!-- <mt-swipe :auto="3000" v-for="(item,index) in items">
      <mt-swipe-item>{{ item.index }}</mt-swipe-item>
    </mt-swipe> -->
  </div>
</template>



<script type="es6">
// import Axios from '../../service/config'
import { Swipe, SwipeItem } from 'mint-ui'
    export default {
    	name: 'swipe',
        data() {
            /*return {
                items:{}
            }*/
        },
        created(){
           /* Axios.get('api').then( rtn => {
                this.items = rtn.data
            })*/
        }
    }
</script>
<style type="lang" scoped>
.container{
    margin-bottom: 88px;
    font-size: 15px;
}
	div.mint-swipe{
		height: 50VW;
	}
    .mint-swipe-items-wrap > div >img{
    	width:100%;
    }
    .mint-swipe-items-wrap {
    	width: 100%;
    }
    .mint-swipe-indicators{
    	width: 100%;
    	background: #abcdef;
    }
    .mint-swipe-indicators {
    position: absolute;
    bottom: -30px !important;
    left: 10px !important;
    width: 100% !important;
	}
	.mint-swipe-indicator{
		width: 24%;
		height: 20px;
	}

@font-face{ font-family: "AvenirLTStd-Light"; src: url('../../../../fonts/AvenirLTStd-Light.otf')}   
@font-face{ font-family: "AvenirLTStd-Medium"; src: url('../../../../fonts/AvenirLTStd-Medium.otf')}
@font-face{ font-family: "AvenirLTStd-Black"; src: url('../../../../fonts/AvenirLTStd-Black.otf')}


.center{ text-align: center; }
.clear{ height: 1%; clear: both;} .fl{ float: left; } .fr{ float: right; } .hide{ display:none} .show{ display:block} .fc333{ color: #333 } .fc555{ color: #555 } .fc666{ color: #666 } .fc999{ color: #999 } .fmajor{ color: #6F84EE } .active{ color: #6178F0 } .fs18{ font-size: 18px } .fs16{ font-size: 16px } .fs14{ font-size: 14px }

.fs12{ font-size: 12px }
.touch:active{ box-shadow: inset 0 0 1000px rgba(0, 0, 0, .1);}
.hide{ display: none }
.page{ opacity: 0; -webkit-transition: opacity .3s ease-out; }
.page.show{ opacity: 1; }
.bolder{ font-weight: bolder; font-family: "AvenirLTStd-Medium","Roboto-Light","PingFangSC-Medium","Microsoft YaHei",Helvetica,sans-serif;}
.m24{ margin: 24px 0 }
.mb20{ margin-bottom: 20px }


    .mint-swipe-indicator.is-active{backgound:#6178F0}
    .m_banner_index{ height: 5px; width: 100%; overflow: hidden; position: absolute; bottom: 0; left: 0; background-color:rgba(0,0,0,.6);}
    .m_banner_index>li{ width: 20%; height: 5px; float: left; }
    .m_banner_index>li.cur{ background-color: #6178F0 }

.m_box{ box-sizing: border-box; }
.m_box_title{ height: 60px; overflow: hidden; }
.m_box_title>h1{ height: 60px; line-height: 62px; margin-left: 12px; font-size: 20px; float: left; color: #555; }
.m_box_title>i{ height: 44px; padding: 0 12px 0 40px; margin: 8px 0; float: right; color: #bbb; text-align: center; line-height: 44px; }

.m_alist{ padding: 0 12px; box-sizing: border-box; }
.m_alist>li{ width: 100%; }
.m_alist>li>img{ width: 100%; border-radius: 8px; }
.m_alist>li>h1{ line-height: 27px; color: #555; font-size: 18px; padding: 14px 0 8px 0; text-align: justify; }
.m_alist>li>p{ font-size: 14px; font-size: 14px; color: #666; line-height: 22px; margin-top: 8px }

.m_listtags{ overflow: hidden; height: 20px }
.m_listtags>span{ height: 20px; line-height: 20px; overflow: hidden; font-size: 12px; color: #999 }
.m_listtags>span.fl{ float: left; margin-right: 24px;  }
.m_listtags>span.fr{ float: right; }
.m_listtags>span>a,.m_listtags>span>i{ height: 20px; line-height: 20px;}
.m_listtags>span>i{ margin-right: 6px; color: #ccc; font-size: 10px;  }
.m_listtags>span>img{ float: left; width: 18px; height: 18px; border-radius: 18px; margin-right: 6px; }

.m_blist{ padding: 0 12px; box-sizing: border-box; overflow: hidden; }
.m_blist>li{ width: 32%; float: left; margin-right: 28px; position: relative; }
.m_blist>li>button{ height: 36px; width: 36px; position: absolute; bottom: 56px; right: 0; }
.m_blist>li>button>i{ width: 22px; height: 24px; background-color: rgba(0,0,0,.4); border-radius: 24px; margin: 6px; color: #fff; text-align: center; line-height: 24px; font-size: 10px; padding-left: 2px }
.m_blist>li>img{ width: 100%; border-radius: 8px; }
.m_blist>li>h1{ line-height: 20px; height: 20px; overflow: hidden; color: #555; font-size: 13px; margin-top:8px; }
.m_blist>li>h2{ line-height: 20px; height: 20px; font-size: 12px; color: #666; margin-bottom:2px;  }

.m_clist{ box-sizing: border-box; overflow: hidden; }
.m_clist>li{ width: calc(50% - 24px); float: left; margin-left: 12px; margin-right: 12px }
.m_clist>li>img{ width: 100%; border-radius: 8px; }
.m_clist>li>h1{ line-height: 18px; height: 36px; overflow: hidden; color: #555; font-size: 13px; margin:8px 0 4px 0; }


</style>

