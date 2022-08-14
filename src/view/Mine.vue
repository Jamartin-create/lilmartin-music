<template>
  <div class="container">首页</div>
</template>

<script>
export default {
  name: "mine-music",
  components: {},
  data() {
    return {};
  },
  created() {
    this.loadBasicData();
  },
  mounted() {
    this.loadBasicData();
  },
  methods: {
    loadBasicData() {
      this.$store.dispatch("user/fetchUserAccount");
      this.$store.dispatch("user/fetchUserPlayList");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
</style>