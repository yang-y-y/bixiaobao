<template lang="html">
  <div class="loading-page" v-if="loading">
    <!-- <i class="el-icon-loading"></i> -->
    <!-- <p style="font-size:12px">Please wait a moment</p> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
    .loading-page{
      position: fixed;
      z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        /* background: rgba(196, 196, 196, 0.1); */
        text-align: center;
        font-size: 30px;
        font-family: sans-serif;
        line-height: 100vh;
        text-align: center;
        color: rgb(99, 99, 99);
    }
</style>