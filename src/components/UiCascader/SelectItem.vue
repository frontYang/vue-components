<template>
  <div class="ui-cascader__select">
    <div class="select-header">
      <span class="select-header-title">{{ title }}</span>
      <span
        v-if="clear"
        class="select-header-clear"
        @click="$emit('on-clear')"
      >清空全部</span>
    </div>
    <div class="selecter-content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectItem',
  props: {
    title: {
      type: String
    },
    clear: {
      type: Boolean
    }
  }
}
</script>
<style lang="scss" scoped>
.ui-cascader__select {
  background-color: #fff;
  border: solid 1px #dee4f5;

  .select-header {
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    color: #333;
    border-bottom: solid 1px #dee4f5;
    background-color: #fafbfe;

    .select-header-title,
    .select-header-clear {
      height: 34px;
      line-height: 34px;
      vertical-align: middle;
    }

    .select-header-clear {
      color: #598fe6;
      float: right;
      cursor: pointer;
    }
  }

  .selecter-content {
    height: 246px;
    width: 100%;
    padding-bottom: 8px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
