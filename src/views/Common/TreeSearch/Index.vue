<template>
  <div class="page">
    <p>输入城市名可查看效果</p>
    <br>
    <ui-tree-search v-model="value" :tree-data="data" />
  </div>
</template>

<script>
import UiTreeSearch from '@/components/UiTreeSearch/Index'
import cityData from './city'

export default {
  components: {
    'ui-tree-search': UiTreeSearch
  },
  data() {
    return {
      data: cityData,
      value: ''
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
