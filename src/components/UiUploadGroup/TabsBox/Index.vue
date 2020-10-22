<template>
  <!-- 首层创意分类tab -->
  <div class="tabs-box f-flex">
    <div
      v-for="(item, key) in tabs"
      :key="key"
      :class="itemCls(key)"
      @click="toggleTab(key)"
    >
      {{ item }}({{ contentLen[key] }})
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'CREATIVE_IMAGE_MODE_LARGE'
    },
    contentLen: {
      type: Object
    },
    tabs: {
      type: Object
    }
  },
  data() {
    return {}
  },
  computed: {
    itemCls() {
      return (key) => {
        const cls = ['tabs-box__item']
        key === this.value && cls.push('current')
        return cls
      }
    }
  },
  methods: {
    toggleTab(key) {
      this.$emit('input', key)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_common";

.tabs-box {
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;

  .tabs-box__item {
    text-align: center;
    padding: 0 20px;
    font-size: 14px;
    cursor: pointer;

    &:hover,
    &.current {
      color: $primary;
    }
  }
}
</style>
