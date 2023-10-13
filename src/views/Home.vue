<template>
  <div class="home">
    <!-- 顶部栏 -->
    <div class="home-header">
      <div class="left_box company">
        <el-popover
          placement="bottom"
          title="版本信息"
          width="200"
          trigger="click"
          >
          <div slot="reference" class="el-icon-info"></div>
          <div>
            ver: {{buildDate}}
          </div>
        </el-popover>
        {{title}}
      </div>
      <div class="right_box">
        <el-button type="danger" size="small" @click="signOut" class="sign_out">注销</el-button>
      </div>
    </div>
    <!-- 侧边菜单栏 + 内容区域 -->
    <div class="home-body">
      <!-- 侧边菜单栏 -->
      <div class="home-body-aside">
        <aside-menu />
      </div>
      <!-- 内容区域 -->
      <div class="home-body-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AsideMenu from "@/components/AsideMenu"; // 侧边栏菜单
import configs from '@configs'
export default {
  name: "home",
  components: {
    AsideMenu
  },
  data() {
    return {
      title: configs.title,
      buildDate: process.env.VUE_APP_TIME
    };
  },
  methods: {
    signOut() {
      this.$confirm("确定退出吗?", "退出账户", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() =>{
          sessionStorage.removeItem('token')
          this.$router.replace("/login");
          this.$message({ type:'success', message:'已退出账户'})
      })
    }
  }
};
</script>
<style scoped lang="less">
.home {
  @asideWidth: 200px; // 侧边栏宽度
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &-header {
    background-color: rgba(64, 158, 255, 1);
    line-height: 60px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    z-index: 999;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    .company {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
    .user {
      color: #fff;
      font-size: 18px;
      margin-right: 10px;
    }
  }
  &-body {
    flex: 1;
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    // 侧边栏
    &-aside {
      width: @asideWidth;
      box-shadow: 1px 0 4px rgba(0, 0, 0, 0.2);
    }
    &-content {
      flex: 1;
      overflow-y: scroll;
      height: 100%;
      box-sizing: border-box;
      padding: 30px;
    }
  }
}
</style>

