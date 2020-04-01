<template>
  <!-- 视图 -->
  <div class="ui-h5__view"></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['h5'])
  },
  mounted() {},
  methods: {
    ...mapMutations(['setElement'])
  }
}
</script>

<style scoped lang="scss">
.ui-h5__view {
  width: 375px;
}
</style>
