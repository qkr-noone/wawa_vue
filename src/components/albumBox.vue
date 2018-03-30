<template>
  <li class="m_ali">
    <router-link :to="{path:'/hunting/detail',query:{id: album.id}}">
      <div class="wrap-img"><img :src="album.res_cover+ '?width=500'" /></div>
      <h1 class="bolder">{{album.title}}</h1>
      <div class="m_listtags">
        <span>第{{album.number}}期</span>
        <span>
            <i class="icon-listen"></i>
            <p>{{album.play_count}}</p>
          </span>
      </div>
      <!-- 限制字数 -->
      <p>{{album.description}}</p>
    </router-link>
  </li>

</template>
<script type="es6">
  export default { 
    name: 'albumBox', 
    data() { 
      return{} 
    },
    props:['album']
  }
</script>
<style type="scss" scoped>
/*公共样式*/

  .bolder{ font-weight: bolder; font-family: "AvenirLTStd-Medium","Roboto-Light","PingFangSC-Medium","Microsoft YaHei",Helvetica,sans-serif;}

/*推荐乐人 音乐合辑*/
  
  .m_ali {
    width: 100%;
    overflow: hidden;
  }
  
  .m_ali a {
    width: 100%;
    overflow: hidden;

  }
  
  .m_ali+li {
    box-sizing: border-box;
    padding-top: 0.8rem;
  }
  
  .m_ali>a>.wrap-img {
    width: 14.8rem;
    border-radius: 10px;
    overflow: hidden;
    height: 9.03rem;
  }
  
  .m_ali>a>.wrap-img>img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat center;
    background: url(/static/h5/static/img/placeholder_1.png?width=420);
  }

  .m_ali>a>h1 {
    line-height: 27px;
    color: #555;
    font-size: 18px;
    padding: 14px 0 4px 0;
    text-align: justify;
  }
  
  .m_ali>a>p {
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
      margin-right: 1.024rem;
    }
    .m_listtags>span:nth-child(2){
      width: 10rem;
    }
    .m_listtags>span:nth-child(2)>i {
      float: left;
      margin-right: 0.256rem;
    }
    .m_listtags>span:nth-child(2)>p {
      float: left;
      line-height: 0.8rem;
      height: 0.8rem;
    }
    .m_listtags>span>a,
    .m_listtags>span>i {
      height: 0.8rem;
      line-height:0.8rem;
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
