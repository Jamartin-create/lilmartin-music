<template>
  <div>
    Mine
  </div>
</template>

<script>
export default {
    name: 'mine-music',
    created(){
      this.loadBasicData()
    },
    mounted(){
      this.loadBasicData()
    },
    methods:{
      loadBasicData(){
        this.$store.dispatch('user/fetchUserAccount')
        this.$store.dispatch('user/fetchUserPlayList')
      }
    },
}
</script>

<style>

</style>