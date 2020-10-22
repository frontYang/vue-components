<template>
  <div class="page">
    <h1>首层单选，子层多选</h1>
    <ui-cascader
      ref="cascader"
      v-model="selectedIdArr"
      :data="cityData"
      :title="['省份']"
      :is-multi-first="false"
    />
    <p>选中数据：</p>
    <pre style="border: 1px solid #ddd; max-height: 200px; overflow: auto;">{{
      selectedData
    }}</pre>
    <p>选中id:</p>
    <pre style="border: 1px solid #ddd; max-height: 200px; overflow: auto;">{{
      JSON.stringify(selectedIdArr)
    }}</pre>
  </div>
</template>

<script>
import UiCascader from '@/components/UiCascader/Index'
import cityData from './city.json'

export default {
  components: {
    'ui-cascader': UiCascader
  },
  data() {
    return {
      cityData: cityData,
      selectedData: [],
      selectedIdArr: []
    }
  },
  computed: {},
  watch: {
    selectedIdArr() {
      this.selectedData = this.$refs['cascader'].selectedData
    }
  }
}
</script>
