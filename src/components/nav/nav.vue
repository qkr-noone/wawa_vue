<template>
  <div class="nav">
    <el-row class="block-col-2">      
      <el-col :span="24">
        <span class="demonstration"></span>
        <el-dropdown trigger="click" id="nav-list">
          <span class="el-dropdown-link">
          <i class="iconfont icon-menu"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>1</el-dropdown-item>
            <el-dropdown-item>2</el-dropdown-item>
            <el-dropdown-item>3</el-dropdown-item>
            <el-dropdown-item>4</el-dropdown-item>
            <el-dropdown-item>5</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>


<script type="es6">
// import {mapState} from 'vuex'
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style lang='scss' scoped>
#nav-list{
  float: right;
}
.icon-menu{
  width: 50px;
  height: 50px;
  font-size: 50px;
}
</style>

