<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="logout">
        <a href="javascript:;" @click="logout">退出</a>
      </div>
      <div class="title">
        <h1>电商管理系统</h1>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- default-active:默认选中的菜单 -->
        <!-- el-submenu：子菜单 -->
        <!-- template:子菜单的内容 -->
        <!-- el-menu-item-group：子菜单的分组 -->
        <!-- el-menu-item：子菜单的选项 -->
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-document"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-document"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-setting"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 配置嵌套路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("你确定要退出吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   删除token
          localStorage.removeItem("token");
          // 跳转login组件
          this.$router.push("/login");
          //   提示退出成功消息
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    .logo {
      width: 180px;
      height: 60px;
      margin-top: 10px;
      float: left;
      background: url("../assets/logo.png") no-repeat;
      background-size: 100% auto;
    }
    .logout {
      width: 180px;
      height: 60px;
      line-height: 60px;
      text-align: right;
      float: right;
      a {
        color: green;
        text-decoration: none;
      }
    }
    .title {
      text-align: center;
      height: 60px;
      line-height: 60px;
    }
  }
  .el-aside {
    background-color: #545c64;
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #d4dfe4;
  }
}
</style>
