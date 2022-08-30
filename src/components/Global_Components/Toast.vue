<template>
  <transition name="fade">
    <div id="toast" v-show="toast.show">{{ toast.text }}</div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Toast",
  computed: {
    ...mapState({
      toast: (state) => state.sys.toast,
    }),
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
#toast {
  position: fixed;
  font-weight: bolder;
  top: 5%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: var(--color-text);
  background: var(--toast-color);
  box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(12px);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 6px 12px;
}
body.dark #toast {
  backdrop-filter: blur(16px) contrast(120%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>