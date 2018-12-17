<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo">
            <div class="profile">
        <div class="avatar img-circle">
            <img src="../assets/w2.gif">
        </div>
        <h4>罗扒皮</h4>
        </div>
        </div>
        <el-menu
        class="el-menu-admin"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened='true'
        :collapse='iscollapse'
        :router='true'>
        <!-- <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

          </el-submenu> -->
           <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item index="categoryFirst">
              <i class="el-icon-menu"></i>
              <span slot="title">一级分类</span>
            </el-menu-item>
            <el-menu-item index="categorySecond">
              <i class="el-icon-menu"></i>
              <span slot="title">二级分类</span>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>商品管理</span>
            </template>
          </el-submenu> -->
           <el-menu-item index="productList">
              <i class="el-icon-star-on"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header id='test'>
          <span class="myicon myicon-menu toggle-btn" @click='iscollapse = !iscollapse'></span>
          <span class="system-title">电商后台管理系统</span>
          <div>
            <span class="welcome">你好：罗扒皮</span>
            <el-button type="text" @click='logout'>退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default{
  data () {
    return {
      iscollapse: false
    }
  },
  methods: {
    logout () {
      // 跳转到登录页面
      this.$router.push({name: 'Login'})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    loginout () {

    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #2f4050;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2f4050;
  }
  .logo {
   .profile {
    height: 160px;
    padding-top: 25px;
    text-align: center;
    background-color: #243443;
   .avatar {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    overflow: hidden;
    border: 3px solid rgba(255, 255, 255, 0.3);
}
.img-circle {
    border-radius: 50%;
    img{
        display: block;
        width: 100%;
    }
}
h4 {
    color: #a9b0c2;
    font-size: 16px;
}
}
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
