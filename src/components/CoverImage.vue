<template>
  <div
    id="cover-image"
    :class="{
      'cover-hover': coverHover,
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="cover-container">
      <img :src="imageUrl" :style="imageStyle" loading="lazy" />
      <transition v-if="coverHover || alwaysShowShadow" name="fade">
        <div
          v-if="hover || alwaysShowShadow"
          class="shadow"
          :style="shadowStyle"
        ></div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fixedSize: { type: Number, default: 0 },
    playButtonSize: { type: Number, default: 22 },
    coverHover: { type: Boolean, default: true },
    alwaysShowPlayButton: { type: Boolean, default: false },
    alwaysShowShadow: { type: Boolean, default: false },
    clickCoverToPlay: { type: Boolean, default: false },
    ShadowMargin: { type: Number, default: 12 },
    radius: { type: Number, default: 12 },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    imageStyle() {
      let style = {};
      if (this.fixedSize !== 0) {
        style.width = this.fixedSize + "px";
        style.height = this.fixedSize + "px";
      }
      if (this.type === "artist") style.borderRadius = "50%";
      return style;
    },
    shadowStyle() {
      let style = {};
      style.backgroundImage = `url(${this.imageUrl})`;
      if (this.type === "artist") style.borderRadius = "50%";
      return style;
    },
  },
};
</script>

<style lang="less" scoped>
#cover-image {
  position: relative;
  &:hover {
    cursor: pointer;
  }
  .cover-container {
    position: relative;
    img {
      width: 100%;
      border-radius: 0.75em;
      aspect-ratio: 1 / 1;
      border: 1px solid rgba(0, 0, 0, 0.04);
    }
    .shadow {
      position: absolute;
      top: 12px;
      height: 100%;
      width: 100%;
      filter: blur(16px) opacity(0.6);
      transform: scale(0.92, 0.96);
      z-index: -1;
      background-size: cover;
      border-radius: 0.75em;
      aspect-ratio: 1 / 1;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>