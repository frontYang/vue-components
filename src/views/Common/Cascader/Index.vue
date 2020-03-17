<template>
  <div class="page">
    <ui-cascader
      v-model="selectedData"
      :data="cityData"
      :title="['省份']"
    />
    <p>结果数据：</p>
    <pre style="border:1px solid #ddd; max-height: 200px;overflow: auto;">{{selectedData}}</pre>
    <p>提交id：</p>
    <pre style="border:1px solid #ddd; max-height: 200px;overflow: auto;">{{JSON.stringify(selectedData.map(v => v.id))}}</pre>
  </div>
</template>

<script>
import UiCascader from '@/components/UiCascader/Index'
import cityData from './city.json'

export default {
  data() {
    return {
      cityData: cityData,
      prop: {
        check: 'check',
        children: 'children',
        id: 'id',
        value: 'value'
      }
      // selectedData: []
    }
  },
  components: {
    'ui-cascader': UiCascader
  },
  computed: {
    selectedData() {
      return this.$utils.findCheck(this.cityData, this.prop)
    }
  },
  mounted() {},
  methods: {
  }
}
</script>

<style scoped lang="scss">
</style>
