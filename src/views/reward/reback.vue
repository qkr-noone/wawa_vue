<template>
  <div id="reback">
    <div style="width: 100%;display: flex;flex-direction: column;justify-content: space-between;align-items: center; background: #F5F5F5;">
      <div style=" overflow: hidden;border-radius: 8px; background: rgb(255, 255, 255);  padding: 23px; width: 100%; box-sizing: border-box;">
        <img style="width: 100%; height: 100%;" src="static/img/reward.png">
        <p style="margin:32px 23px;font-size: 18px;line-height: 30px;">“十分感谢你的支持，像荒野里开出一朵花”</p>
        <p style="float: right; margin-right: 23px;font-size: 12px;">--挖哇</p>
      </div>
      <a style="width: 100px;height:40px; border-radius:8px;line-height: 40px;background:#6F83ED;
    text-decoration: none; text-align: center; margin: auto; margin-top:23px;color: #fff;font-size: 12px;" onclick="javascript:history.back(-1);">返回</a>
    </div>
  </div>
</template>

<script type="es6">
	export default {
		data() {
			return{
				
			}
		},
		methods: {
		}
	}
</script>
<style lang='scss' scoped>
	#reback{
		overflow: hidden;
	}
</style>
