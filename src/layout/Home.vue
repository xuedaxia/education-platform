<template>
  <el-container class="home-container" v-title data-title="旅游预订系统" >
    <!-- 头部区域 -->
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt />
        <span>旅游预订系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px': '200px'">
        <!-- 侧边栏菜单区 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="indexPath"
        >
          <!-- 一级菜单 -->
          <el-submenu index="users">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-user"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index= "/admins" @click="saveNavstate('/admins')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>用户列表</span>
              </template>
            </el-menu-item>
           
          </el-submenu>
          <el-submenu index="goods">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-goods"></i>
              <!-- 文本 -->
              <span>预订管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/flights"  @click="saveNavstate('/flights')" >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>航班管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/hotels"  @click="saveNavstate('/hotels')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>宾馆管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/cars"  @click="saveNavstate('/cars')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>出租车管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="orders">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-tickets"></i>
              <!-- 文本 -->
              <span>订单管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/orders"  @click="saveNavstate('/orders')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="percenter">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-home"></i>
              <!-- 文本 -->
              <span>个人中心</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/myorders"  @click="saveNavstate('/myorders')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>我的预订</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
 .home-container {
   height: 100%;
 }
 
.el-header {
  background-color: #333744;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 50px;
      padding-bottom: 10px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.logo {
  height: 80px;
  width: auto;
  padding-top: 15px;
  img {
    height: 60px;
    width: auto;
  }
}
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  
}
</style>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      indexPath: ''
    }
  },
  created() {
    this.indexPath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
     // window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollapse() {
     this.isCollapse = ! this.isCollapse
    },
    saveNavstate (indexPath) {
      window.sessionStorage.setItem('activePath',indexPath)
      this.indexPath = indexPath
    }
  }
};
</script>