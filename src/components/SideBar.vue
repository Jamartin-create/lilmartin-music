<template>
  <div class="container">
    <!-- 头像+昵称 -->
    <div class="logo-wrapper">
      <img :src="userinfo.avatar" alt="" />
      <h1 class="nickname">{{ userinfo.nickName }}</h1>
    </div>
    <!-- 菜单容器 -->
    <div class="menu-wrapper">
      <h1 class="menu-title">MENU</h1>
      <div class="menu-list">
        <div
          class="menu-node"
          v-for="menuNode in menuList"
          :key="menuNode.name"
          @click="changePage(menuNode.name)"
          :class="menuSelected === menuNode.name ? 'active' : ''"
        >
          <i class="iconfont" :class="menuNode.iconClassName"></i>
          <div class="menu-name">{{ menuNode.name }}</div>
        </div>
      </div>
    </div>
    <!-- 登录登出 -->
    <div class="log-in-out">
      <div
        class="menu-node"
        @click="changePage('login')"
        :class="menuSelected === 'login' ? 'active' : ''"
      >
        <i class="iconfont icon-lil-login"></i>
        <div class="menu-name">LogIn</div>
      </div>
    </div>
  </div>
</template>

<script>
import testAvatar from "@/assets/testimage/avatar.jpg";
export default {
  name: "side-bar",
  data() {
    return {
      userinfo: {
        avatar: testAvatar,
        nickName: "LilMartin",
      },
      menuList: [
        {
          name: "home",
          label: "Home",
          iconClassName: "icon-lil-home",
        },
        {
          name: "setting",
          label: "Setting",
          iconClassName: "icon-lil-setting",
        },
      ],
    };
  },
  computed: {
    menuSelected() {
      return this.$route.name;
    },
  },
  methods: {
    changePage(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 17vw;
  border-right: 1px solid rgba(216, 216, 216, 0.3);
  color: #9bb3ca;
  position: relative;

  display: flex;
  flex-direction: column;
  .logo-wrapper {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid rgba(216, 216, 216, 0.6);
    }
    .nickname {
      color: #797979;
      font-size: 24px;
    }
  }
  //菜单选项
  .menu-node {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    box-sizing: border-box;
    border-right: 8px solid transparent;
    height: 40px;
    line-height: 40px;
    i {
      font-size: 26px;
      width: 40px;
    }
    .menu-name {
      font-size: 22px;
      font-weight: bold;
      width: 150px;
    }
  }
  .active {
    box-sizing: border-box;
    color: #fa7c05;
    border-right: 8px solid #fa7c05;
  }
  //菜单列表容器
  .menu-wrapper {
    .menu-title {
      margin: 10% 0;
      padding-left: 34px;
      font-size: 24px;
    }
  }
  .log-in-out {
    position: absolute;
    width: 100%;
    bottom: 30px;
  }
}
</style>