<template>
  <div id="banner">
    <div class="banner-wrapper">
      <div
        class="banner-item"
        :class="
          index === pageChose
            ? 'middle'
            : index === prePage
            ? 'left'
            : index === nextPage
            ? 'right'
            : ''
        "
        v-for="(banner, index) in bannerList"
        :key="index"
      >
        <img :src="banner.imageUrl" alt="" loading="lazy" />
      </div>
    </div>
    <button
      class="icon iconfont icon-left-arrow-key"
      id="left-arrow"
      @click="changePage(prePage)"
    ></button>
    <button
      class="icon iconfont icon-left-arrow-key"
      id="right-arrow"
      @click="changePage(nextPage)"
    ></button>
    <div class="pagenation-wrapper">
      <span
        :class="pageChose === index ? 'chose' : ''"
        v-for="(item, index) in bannerList"
        :key="index"
        @mouseover="changePage(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bannerList"],
  data() {
    return {
      pageChose: 0,
      bannerInterval: "",
    };
  },
  computed: {
    prePage() {
      return (
        (this.pageChose - 1 + this.bannerList.length) % this.bannerList.length
      );
    },
    nextPage() {
      return (this.pageChose + 1) % this.bannerList.length;
    },
  },
  watched: {},
  mounted() {
    this.setBannerInterval();
  },
  methods: {
    setBannerInterval() {
      this.bannerInterval = setInterval(() => {
        this.pageChose = (this.pageChose + 1) % this.bannerList.length;
      }, 3000);
    },
    clearBannerInterval() {
      clearInterval(this.bannerInterval);
    },
    changePage(pageIndex) {
      this.clearBannerInterval();
      this.pageChose = pageIndex;
      this.setBannerInterval();
    },
  },
};
</script>

<style lang="less" scoped>
#banner {
  position: relative;
  margin: 30px auto;
  height: 300px;
  max-width: 850px;
  min-width: 600px;
  .banner-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .banner-item {
      position: absolute;
      bottom: 50%;
      left: 50%;
      width: 50%;
      height: 80%;
      transform: translateX(-50%) translateY(50%);
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 10px;
      transition: var(--tran-03);
      z-index: 0;
      > img {
        display: none;
        width: 100%;
        border-radius: 10px;
        opacity: 0.5;
        object-fit: cover;
      }
      &.middle,
      &.left,
      &.right {
        > img {
          display: block;
        }
      }
      &.middle {
        width: 70%;
        height: 90%;
        z-index: 100;
        > img {
          opacity: 1;
        }
      }
      &.left {
        left: 2%;
        transform: translateX(0) translateY(60%);
        z-index: 50;
      }
      &.right {
        left: 98%;
        transform: translateX(-100%) translateY(60%);
        z-index: 50;
      }
    }
  }
  #left-arrow,
  #right-arrow {
    position: absolute;
    top: 50%;
    z-index: 200;
    width: 40px;
    height: 40px;
    font-size: 15px;
    text-align: center;
    font-weight: 900;
    color: #b4b4b4;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    transition: var(--tran-03);
    &:hover {
      color: rgb(233, 233, 233);
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  #left-arrow {
    left: 2%;
    transform: translateY(-50%);
  }
  #right-arrow {
    right: 2%;
    transform: translateY(-50%) rotate(180deg);
  }
  .pagenation-wrapper {
    position: absolute;
    top: 85%;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1000;
    > span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 4px;
      background-color: rgba(0, 0, 0, 0.5);
      &.chose {
        background-color: #da2828;
      }
    }
  }
}
</style>