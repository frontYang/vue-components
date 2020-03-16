<template>
  <div class="page">
    <ui-select-drop v-model="val"/>
  </div>
</template>

<script>
import UiSelectDrop from '@/components/UiSelectDrop/Index'
export default {
  data() {
    return {
      val: 'http://localhost:8082/#/common/selectdrop'
    }
  },
  components: {
    'ui-select-drop': UiSelectDrop
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
</style>
