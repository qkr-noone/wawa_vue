<template>
  <li class="m_bli">
    <router-link :to="{ path:'/recomm-single/detail',query:{id: item.id} }">
      <div>
        <img :src="item['res_cover']+'?width=300'" />
      </div>
      <h1 class="bolder">{{item['songname']}}</h1>
      <h2>{{item['singer']}}</h2>
      <button  @click.stop="recomPlay(item)"  @click.prevent ><i class="icon-play"></i></button>
    </router-link>
  </li>
</template>
<script type="es6">
import { mapState, mapMutations } from 'vuex'
  export default { 
    name: 'recomSingle', 
    data() { 
      return{} 
    },
    props:['item'],
    computed: {
      ...mapState(['playerData','playState','playList','currentIndex','routerUrl','navToggle','isTr','isDemaskNav'])
    },
    mounted() {
      let audio = document.getElementById("audio")
      this.audio = audio
    },
    methods: {
      ...mapMutations(['setPlayerData','setPlayState','setPlayList','setCurrentIndex','setRouterUrl','setNavToggle','setIsTr','setIsDemaskNav']),
      recomPlay(item){
        this.setPlayerData(item)
        let tip = false
        this.playList.forEach((data)=>{
          if(data.id === item.id){
            return tip = true
          }
        })
        if(!tip){
          this.playList.splice(this.currentIndex+1, 0,item)
          let instance = this.$toast('即将播放')
          setTimeout(() =>{
            instance.close()
          },2500)
        }
        this.audio.play()
        this.setPlayState(true)
        return false
      }
    }
  }
</script>
<style type="scss" scoped>
/*公共样式*/

  .bolder{ font-weight: bolder; font-family: "AvenirLTStd-Medium","Roboto-Light","PingFangSC-Medium","Microsoft YaHei",Helvetica,sans-serif;}
  button:focus{  outline: -webkit-focus-ring-color auto 0px;outline: focus-ring-color auto 0px; }

/* 最新入驻 推荐单曲*/

  .m_bli{ width: 32%; float: left; margin-right: 28px; overflow: hidden; }
  .m_bli >a{ position: relative; overflow: hidden; width: 100%;}
  .m_bli>a>button{ height: 36px; width: 36px; position: absolute; bottom: 50px; right: 0;     background: transparent;}
  .m_bli:last-child>a>button{
    margin-right: 8px;
  }
  .m_bli>a>button>i{ width: 22px; height: 24px; background-color: rgba(0,0,0,.4); border-radius: 24px; margin: 6px; color: #fff; text-align: center; line-height: 24px; font-size: 10px; padding-left: 2px }
  .m_bli>a>div{
    border-radius: 8px;
     overflow: hidden;
     width: 4.792rem; 
     height: 4.792rem; 
     visibility: visible;
     background: url(/static/h5/static/img/placeholder_1.png?width=500);
   }
  .m_bli>a>div> img{width: 100%;height: 100%;background-repeat: no-repeat center;min-height: 4rem; background: url(/static/h5/static/img/placeholder_1.png?width=500);}
  .m_bli>a>div> img:after{width: 100%;height: 100%;background-repeat: no-repeat center;min-height: 4rem; content: url(/static/h5/static/img/placeholder_1.png?width=500);}
  .m_bli>a>h1{ line-height: 20px; height: 20px; overflow: hidden; color: #555; font-size: 13px; margin-top:8px; text-align: left;text-overflow: ellipsis;}
  .m_bli>a>h2{ line-height: 20px; height: 20px;text-overflow: ellipsis; font-size: 12px; color: #999999; margin-bottom:2px;  text-align: left; white-space: nowrap;overflow: hidden;}
</style>
