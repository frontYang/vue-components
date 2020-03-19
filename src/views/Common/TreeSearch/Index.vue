<template>
  <div class="page">
    <ui-tree-search v-model="value" :tree-data="data" />
  </div>
</template>

<script>
import UiTreeSearch from '@/components/UiTreeSearch/Index'
import cityData from './city'

export default {
  data() {
    return {
      data: cityData,
      value: ''
    }
  },
  components: {
    'ui-tree-search': UiTreeSearch
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
