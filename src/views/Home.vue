<template>
  <div class="app-wrapper">
    <Nav />
    <div :class="{hasTagsView:true}" class="main-container">
      <div :class="{'fixed-header':false}">
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import Nav from './Nav'
import AppMain from './AppMain'
import TagsView from './TagsView/index'
export default {
  name: 'Home',
  components: {
    Nav,
    AppMain,
    TagsView
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {

  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog

.el-popup-parent--hidden {

  .fixed-header {
    padding-right: 15px;
  }
}
</style>

<!--<template>
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
</style>-->
