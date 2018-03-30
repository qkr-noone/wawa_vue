<template>
  <li class="m_cli">
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
                <span>&nbsp;{{item['play_count']}} </span>
        </span>
      </div>
    </router-link>
  </li>
</template>
<script type="es6">
	export default {
		data() {
			return{}
		},
		props: ['item']
	}
</script>
<style lang="scss" scoped>
	.bolder{ font-weight: bolder; font-family: "AvenirLTStd-Medium","Roboto-Light","PingFangSC-Medium","Microsoft YaHei",Helvetica,sans-serif;}

	.m_cli {
    width: 7.1rem;
    padding-top: 0.6rem;
    float: left;
    overflow: hidden;
  }

  li.m_cli:nth-child(even){
    margin-left: 0.6rem;
  }
  
  .m_cli>a {
    width: 100%;
    overflow: hidden;
  }
  
  .m_cli>a>.wrap {
    width: 7.1rem;
    height: 7.1rem;
    border-radius: 10px;
    overflow: hidden;    
  }
  
  .m_cli>a>.wrap>img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
    background: url(/static/h5/static/img/placeholder_1.png?width=500);
  }

  
  .m_cli>a>h1 {
    overflow: hidden;
    color: #555;
    text-align: left;
    height:  1.8rem;
    width: 100%;
    font-size: 0.6rem;
    margin: 8px 0;
    line-height: 0.9rem;
    color: #555555;
    font-family: "PingFangSC-Light";
  }
  .m_cli a>.m_c{
    overflow: hidden;
    height: 1.023rem;
    line-height: 1.023rem;
    color:#999999;
    font-size: 12px;
    text-align: center;
  }
  .m_cli a>.m_c>span:nth-child(1){
    float: left;
    height: 100%;
  }
  .m_cli a>.m_c>span:nth-child(1)> .mc-wrap{
    height: 100%;
    overflow: hidden;
    border-radius: 100%;
    float: left;
  }
  .m_cli a>.m_c>span:nth-child(1)> span{
    margin-left: 0.3rem;
    width: 3.5rem;
    overflow: hidden;
    text-align: left;
    height: 100%;
  }
  .m_cli a>.m_c>span:nth-child(1)> .mc-wrap>img{
    height: 100%;
  }
  .m_cli a>.m_c>span:nth-child(2){
    float: right;
  }
  .m_cli a>.m_c>span:nth-child(2)> i.icon-listen{
    font-size: 10px;
    color: #cccccc;
  }

</style>