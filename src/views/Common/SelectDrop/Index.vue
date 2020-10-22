<template>
  <div class="page">
    <ui-select-drop v-model="val" />
  </div>
</template>

<script>
import UiSelectDrop from '@/components/UiSelectDrop/Index'
export default {
  components: {
    'ui-select-drop': UiSelectDrop
  },
  data() {
    return {
      val: 'http://localhost:8082/#/common/selectdrop'
    }
  },
  mounted() {}
}
</script>
