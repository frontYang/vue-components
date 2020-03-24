<template>
  <div class="page">
    <ui-editor v-model="content"/>
  </div>
</template>

<script>
import UiEditor from '@/components/UiEditor/Index'

export default {
  data() {
    return {
      content: '<h2>I am Example</h2>'
    }
  },
  components: {
    'ui-editor': UiEditor
  },
  mounted() {
  },
  methods: {}

}
</script>

<style lang="scss">
@import '@/assets/styles/_common.scss';

</style>
