<template>
  <div class="page">
    <ui-calendar-custom v-model="selected" />
    <p>选中数据：</p>
    <pre style="border: 1px solid #ddd; max-height: 200px; overflow: auto;">{{
      selected
    }}</pre>
  </div>
</template>

<script>
import UiCalendarCustom from '@/components/UiCalendarCustom/Index'
export default {
  components: {
    'ui-calendar-custom': UiCalendarCustom
  },
  data() {
    return {
      selected: [
        '2020-03-07',
        '2020-03-14',
        '2020-03-28',
        '2020-03-21',
        '2020-04-05',
        '2020-04-12',
        '2020-04-19',
        '2020-04-26'
      ]
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
