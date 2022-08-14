<template>
  <div id="pannel">pannel</div>
</template>

<script>
export default {
  name: "pannel",
};
</script>

<style lang="less" scoped>
#pannel {
  width: 300px;
  position: absolute;
  right: 0;
  height: calc(100% - var(--player-height));
  padding: 10px 14px;
}
</style>