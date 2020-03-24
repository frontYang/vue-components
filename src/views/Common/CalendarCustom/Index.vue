<template>
  <div class="page">
    <ui-calendar-custom v-model="selected"/>
  </div>
</template>

<script>
import UiCalendarCustom from '@/components/UiCalendarCustom/Index'
export default {
  data() {
    return {
      selected: ['2020-03-07', '2020-03-21']
    }
  },
  components: {
    'ui-calendar-custom': UiCalendarCustom
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
