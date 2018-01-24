### 快速上下滚动时，在苹果手机有一瞬间的留白
		在路由添加 scrollBehavior()=>({y:0})
		图片加上宽度，
#### 跨越和代理服务器上传问题
		在confit 文件下的index文件使用代理 进行配置	

this.$route.query.id;

 一个事件多个方法  @click="selected(item),nav()"  fn(){selected(dd) nav() }


 <router-link :to="{ path:'/home/game', query: { num:  1} }">  

 concat() 方法用于连接两个或多个数组。
该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
语法
arrayObject.concat(arrayX,arrayX,......,arrayX)

vue 的公共样式可以放或者导入从 最外面的index  


localStorage.getItem


router-link会阻止click事件  router-link中加.native才能生效


addCart(goods){
        this.$set(goods, 'num', 1)
        this.setCart(goods)
     },

Computed property "playerData" was assigned to but it has no setter.
需要使用this.setPlayerData()方法对playerdata数据操作


vuex 中的 {__ob__: Observer}


animation-play-state: paused|running


create-keyframe-animation   添加动画

<img src="../../../static/img/star.png">

<img src="static/img/star.png">  script 和 <img src="">	像这样 都可以用
在样式中需要写 在dev 是 可以直接 background: url(/static/img/star.png)
但是在build 时候是读取不到的，在build 是需要重新定位图片地址 如：background: url(/static/h5/static/img/star.png)

在vue学习中遇到给router-link 标签添加事件@click 、@mouseover等无效的情况
所以如果在想要在router-link上添加事件的话需要@click.native这样写


Vue-- 监听路由变化，数据无法更新？

提醒一下，当使用路由参数时，例如从 /user/foo 导航到 user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。 意思很明显了：虽然路由参数发生了变化，但组件还是那个组件，Vue生命周期也还没结束，此时并不会刷新数据。（开发spa页面，一切都是以路由为起点的，路由变化，页面跟着变化）

不过，官网也提出了相应的解决方案：复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象：



Q: vue 2.0 使用@click.self 绑定自身事件不触发是怎么回事？
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->

A:
<div v-on:click.self="close" ref="pop">
    <button></button>
</div>

<!--

给组件绑定原生事件

有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on 

-->

<my-component v-on:click.native.self="close"></my-component>

close(e) {
    console.log(e.target)
    this.$refs.pop.style.display = 'none'
}

this.refs.refName.style.webkitAnimationPlayState = 'paused'


定义和用法
scrollTo() 方法可把内容滚动到指定的坐标。
语法
scrollTo(xpos,ypos)
window.scrollTo(100,500)

this.$refs.lyricList.scrollTo(0, 0, 1000)

scrollToElement


let lineEl = this.$refs.lyricLine[lineNum - 5]
this.$refs.lyricList.scrollToElement(lineEl, 1000)


this.$refs.lyricList.$el.style[transitionDuration] = 0
this.$refs.middleL.style.




opacity = 1 - this.touch.percent


created: function () {
  const router = this.$router;
  router.go({path:'/home/main'});
}

router.redirect({
  '*':"/home/main"
});  



vue-router中v-link指令特性

控制台报错： The play() request was interrupted by a call to pause()



<li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
methods:
selectItem(item, index) {
        this.$emit('select', item, index)
      },

vm.$emit( event, […args] )

参数：

{string} event
[...args]
触发当前实例上的事件。附加参数都会传给监听器回调。


1) detailData.user.nickname 不能三点及以上 需要代替
2) 使用代替后 可以使用 filters



computed :
监听多个数据或者一个数据来维护返回一个状态值 ，只要其中一个或多个数据发生了变化，则会从新计算整个函数体，从新返回状态值
watch :
只有一个一个监听据，只要这个数据发生变化，就会在返回两个参数，第一个是当前的值，第二个是变化前的值，每当变化的时候，则会触发函数体的里的逻辑行为，来进逻辑后续操作


watch
'test.dd'(){}


timeupdate 事件在音频/视频（audio/video）的播放位置发生改变时触发。
该事件可以在以下情况被调用:
播放音频/视频（audio/video）
移动音频/视频（audio/video）播放位置
提示： timeupdate 事件通常与 Audio/Video 对象的 currentTime 属性一起使用，该属性返回音频/视频（audio/video）的播放位置（以秒计）。

当浏览器能够开始播放指定的音频/视频时，会发生 canplay 事件。
let audio = document.getElementById("audio")
  audio.addEventListener('canplay',()=>{
  <!-- duration 放在canplay事件可以防止duration NaN -->
    this.duration = parseInt(audio.duration)
    console.log(2,this.duration)
  })
当音频/视频处于加载过程中时，会依次发生以下事件：
loadstart
durationchange
loadedmetadata
loadeddata
progress
canplay
canplaythrough


在苹果手机中，类似列表上下滑动，会不流畅时，给列表最外面层添加样式

在  overflow:scroll部分，也就是需要滑动的层处，加css:  -webkit-overflow-scrolling: touch;

test项目: verflow-y: auto;  -webkit-overflow-scrolling: touch;

Error: listen EADDRINUSE :::8080  vue中端口被占用

vue h5 项目bug 优化   
  播放 this.audio.play()  
  banner 传值id 网络数据请求不好  读取缓存
  vue player 居中 
    
  vue player next 安卓返回退出时，歌曲暂停（nubia 流浪器） 
    
  乐文详情头部默认图位置 
    
  火狐浏览器不支持 line-clamp: 2  无法兼容  
    乐人详情信息收起
  菜单 menu 位置  

  IOS safari 下audio 权限问题      
ios 中safari浏览器的audio 很多属性不可用  ajax 请求中不能直接播放    
  页面渲染是audio src资源需要有=》audio不能报错    
  在vue中每次首次播放都需要有资源并且使其已播放或者已加载   
ajax 请求中不能直接播放 ===》 "if (this.isIOS()) {     // ios单独处理 安卓不需要
 this.$refs.audio.play()
 this.$refs.audio.pause()
}"    使其首次播放时播放暂停
      
ios audio 资源加载很慢 切换歌曲 资源太大 file320 调试为file192  资源格式调小   
      


================== Q.js ====================
http://www.xuanfengge.com/web-route-frame.html?utm_source=tuicool&utm_medium=referral

1. Q.reg(注册路由)
2. Q.pop 实现在每次 URL 变更时发生回调
 Q.init({
  pop:navchange
 })
3. 导航条需要在每次页面变更时修改导航条样式
4. 翻页和分类页 传参数
