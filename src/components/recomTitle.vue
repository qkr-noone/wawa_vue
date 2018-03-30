<template>
	<header class="m_box_title" id="recomTitle">
	  <h1 class="bolder">{{titleDoc.title}}</h1>          
	  <router-link :to="titleDoc.to"><i class="icon-next" ></i></router-link>
	</header>
</template>
<script type="es6">
  export default { 
  	name: 'recomTitle', 
  	data() { 
  		return{} 
  	},
  	props:['titleDoc']
  }
</script>
<style lang="scss" scope>
  .m_box_title{ height: 60px; overflow: hidden; }
  .m_box_title>h1{ height: 60px; line-height: 62px; margin-left: 12px; font-size: 20px; float: left; color: #555; }
  .m_box_title>a{ height: 44px; padding: 0 12px 0 40px; margin: 8px 0; float: right; color: #bbb; text-align: center; line-height: 44px; }
</style>