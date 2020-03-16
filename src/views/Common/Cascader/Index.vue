<template>
  <div class="page">
    <ui-cascader
      v-model="selectedData"
      :data="cityData"
      :title="['省份']"
    />
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
