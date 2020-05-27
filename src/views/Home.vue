<template>
  <div class="page page-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_var.scss";
.el-header {
  background: $bgHeaderNav;
}
</style>
