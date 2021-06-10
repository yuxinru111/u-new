<template>
  <el-container>
    <el-aside :width="isCollapse ? '65px' : '220px'">
      <h1>小U商城后台</h1>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#333"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">管理中心</span>
        </el-menu-item>
        <div v-for="(item, index) in menus" :key="item.id">
          <!-- 菜单 -->
          <el-menu-item :index="item.url" v-if="item.type == 2">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <!-- 目录 -->
          <el-submenu :index="String(index)" v-else>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 子菜单 -->
            <el-menu-item
              :index="val.url"
              v-for="val in item.children"
              :key="val.id"
            >
              <span slot="title">{{ val.title }}</span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <el-button
            type="primary"
            icon="el-icon-s-fold"
            size="mini"
            @click="isCollapse = !isCollapse"
          ></el-button>
        </div>
        <div class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>
                <div @click="big">全屏预览</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="quit">安全退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import screenfull from "screenfull";
export default {
  data() {
    return {
      isCollapse: false,
      username: JSON.parse(localStorage.getItem("userInfo") || "{}").username,
      menu: [],
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    this.menus = userInfo.menus;
    console.log(this.menus);
  },
  methods: {
    quit() {
      // 信息显示跳转成功
      this.$message({
        message: "退出成功",
        type: "success",
      });
      // 清除存储数据
      localStorage.removeItem("userInfo");
      // 跳转到登录页面
      this.$router.push("/login");
    },
    big() {
      screenfull.toggle();
    },
  },
  components: {},
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;

  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #333;

  line-height: 200px;
  overflow-y: hidden;
}
.el-aside h1 {
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #444;
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 400;
  /* 强制不换行 */
  white-space: nowrap;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-container {
  height: 100vh;
}
.el-menu {
  border: 0;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px #444;
  z-index: 1;
  background: #fff;
}
</style>