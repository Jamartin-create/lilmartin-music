<template>
  <div id="sidebar" :class="isClose ? 'close' : ''">
    <header>
      <div class="image-text">
        <span class="image">
          <img
            :src="
              userProfile.avatarUrl
                ? userProfile.avatarUrl
                : defaultUserInfo.avatar
            "
            alt=""
          />
        </span>
        <div class="text nickname-text">
          <span class="nickname">{{
            userProfile.nickname
              ? userProfile.nickname
              : defaultUserInfo.nickname
          }}</span>
          <span class="lastloginIP">
            {{
              userProfile.provinceLabel
                ? userProfile.provinceLabel
                : defaultUserInfo.ip
            }}
          </span>
        </div>
      </div>
      <i
        class="toggle iconfont icon-left-arrow-key"
        @click="isClose = !isClose"
      ></i>
    </header>
    <div class="menu-bar">
      <div class="menu">
        <li class="search-box">
          <i
            class="icon iconfont icon-search"
            @click="
              isClose = false;
              changePage('search');
            "
          ></i>
          <input
            v-model="searchKeywords"
            type="text"
            placeholder="搜索..."
            @keydown.enter="changePage('search')"
          />
        </li>
        <ul class="menu-links">
          <li
            class="nav-link"
            v-for="menu in menuList"
            :key="menu.name"
            @click="changePage(menu.name)"
          >
            <a
              href="javascript:;"
              :class="activeNav === menu.name ? 'active' : ''"
            >
              <i class="icon iconfont" :class="menu.iconClassName"></i>
              <span class="text nav-text">{{ menu.label }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="bottom-content">
        <li @click="logoutConfirm">
          <a href="#" :class="activeNav === 'login' ? 'active' : ''">
            <i class="icon iconfont icon-Logout"></i>
            <span class="text nav-text">{{
              isLoging() ? "登出" : "登录"
            }}</span>
          </a>
        </li>
        <li class="mode">
          <div class="sun-moon">
            <i class="icon iconfont icon-sun sun"></i>
            <i class="icon iconfont icon-moon moon"></i>
          </div>
          <span class="mode-text text">{{
            sysSetting.isLight ? "Light mode" : "Dark mode"
          }}</span>
          <div class="toggle-switch">
            <span class="switch" @click="changeMode"></span>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { doLogout, isLoging } from "@/util/auth";
import { sideBarList } from "@/js/navBarLists";
export default {
  name: "side-bar",
  data() {
    return {
      menuList: sideBarList,
      isClose: false,
      defaultUserInfo: {
        avatar:
          "http://cdn.jamartin.top/uploads/big/cbce862f0fcd8405ecf285e16674c8e6.png",
        nickname: "音乐发烧友",
        ip: "请登录哦",
      },
      activeNav: this.menuSelected,
      searchKeywords: "",
    };
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.user.profile,
      sysSetting: (state) => state.sys.setting,
    }),
    menuSelected() {
      return this.$route.name ? this.$route.name : "home";
    },
  },
  mounted() {
    this.changePage(this.menuSelected);
  },
  created() {},
  methods: {
    changePage(name) {
      this.activeNav = name;
      if (name === "search") {
        if (this.searchKeywords === "") {
          return;
        }
        this.$router.push({ name, query: { keywords: this.searchKeywords } });
        this.$bus.$emit("research", this.searchKeywords);
        return;
      }
      this.$router.push({ name });
    },
    changeMode() {
      this.$store.dispatch("sys/changeMode");
    },
    logoutConfirm() {
      if (isLoging() && window.confirm("确认退出吗")) {
        this.changePage("login");
        doLogout();
      } else if (!isLoging()) {
        this.changePage("login");
      }
    },
    isLoging() {
      return isLoging();
    },
  },
};
</script>

<style lang="less" scoped>
#sidebar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 10px 14px;
  background-color: var(--sidebar-color);
  transition: var(--tran-03);
  z-index: 100;
  //所有的li标签
  li {
    height: 50px;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .icon,
  .text {
    color: var(--text-color);
    transition: var(--tran-03);
  }

  .icon {
    min-width: 60px;
    border-radius: 6px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .text {
    font-size: 17px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 1;
  }

  header {
    position: relative;
    .image-text {
      display: flex;
      align-items: center;
      .image {
        min-width: 60px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 40px;
          border-radius: 50%;
        }
      }
      .nickname-text {
        display: flex;
        flex-direction: column;
        .nickname {
          margin-top: 2px;
          font-size: 18px;
          font-weight: 600;
        }
        .lastloginIP {
          font-size: 16px;
          margin-top: -2px;
          display: block;
        }
      }
    }
    .toggle {
      position: absolute;
      top: 50%;
      right: -26px;
      background-color: var(--primary-color);
      color: var(--sidebar-color);
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
      transform: translateY(-50%) rotate(0deg);
      transition: var(--tran-03);
    }
  }
  li a {
    height: 100%;
    width: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    border-radius: 6px;
    transition: var(--tran-03);
    &:hover,
    &.active {
      background-color: var(--primary-color);
      .text,
      .icon {
        color: var(--primary-color-light);
      }
    }
  }

  .menu-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 55px);
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .menu {
      margin-top: 40px;
      .search-box {
        background-color: var(--primary-color-light);
        border-radius: 6px;
        cursor: pointer;
        transition: var(--tran-03);
        input {
          outline: none;
          border: none;
          height: 100%;
          width: 100%;

          background-color: var(--primary-color-light);
          color: var(--text-color);
          border-radius: 6px;
          font-size: 17px;
          font-weight: 500;
          transition: var(--tran-03);
        }
      }
    }
    .bottom-content {
      .mode {
        background-color: var(--primary-color-light);
        transition-timing-function: var(--tran-03);
        position: relative;
        border-radius: 6px;
        .sun-moon {
          height: 50px;
          width: 60px;
          i {
            position: absolute;
            &.moon {
              opacity: 0;
            }
          }
        }
        .toggle-switch {
          position: absolute;
          right: 0;
          height: 100%;
          min-width: 60px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .switch {
            position: relative;
            height: 22px;
            width: 40px;
            border-radius: 25px;
            background-color: var(--toggle-color);
            transition: var(--tran-03);
            &::before {
              content: "";
              position: absolute;
              width: 15px;
              height: 15px;
              top: 50%;
              left: 5px;
              background-color: var(--sidebar-color);
              border-radius: 50%;
              transform: translateY(-50%);
              transition: var(--tran-03);
            }
          }
        }
      }
    }
  }
}
#sidebar.close {
  width: 88px;
  .text {
    opacity: 0;
  }
  header {
    .toggle {
      transform: translateY(-50%) rotate(180deg);
    }
  }
}

body.dark {
  #sidebar {
    header {
      .toggle {
        color: var(--text-color);
      }
    }
    li {
      a {
        &:hover,
        &.active {
          .icon,
          .text {
            color: var(--text-color);
          }
        }
      }
    }
    .menu-bar {
      .bottom-content {
        .mode {
          .sun-moon {
            i {
              &.sun {
                opacity: 0;
              }
              &.moon {
                opacity: 1;
              }
            }
          }
        }
        .toggle-switch {
          .switch {
            &::before {
              left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>