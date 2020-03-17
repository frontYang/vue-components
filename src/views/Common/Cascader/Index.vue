<template>
  <div class="page">
    <ui-cascader
      ref="cascader"
      v-model="selectedIdArr"
      :data="cityData"
      :title="['省份']"
    />
    <p>选中数据：</p>
    <pre style="border:1px solid #ddd; max-height: 200px;overflow: auto;">{{selectedData}}</pre>
    <p>选中id:</p>
    <pre style="border:1px solid #ddd; max-height: 200px;overflow: auto;">{{JSON.stringify(selectedIdArr)}}</pre>
  </div>
</template>

<script>
import UiCascader from '@/components/UiCascader/Index'
import cityData from './city.json'

export default {
  data() {
    return {
      cityData: cityData,
      selectedData: [],
      selectedIdArr: [11, 12, 13, 14, 15, 21, 22]
    }
  },
  components: {
    'ui-cascader': UiCascader
  },
  computed: {

  },
  watch: {
    selectedIdArr() {
      this.selectedData = this.$refs['cascader'].selectedData
    }
  }
}
</script>

<style scoped lang="scss">
</style>
