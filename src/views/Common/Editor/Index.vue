<template>
  <div class="page">
    <ui-editor
      v-model="val"
      @on-blur="emitBlur"
      @on-focus="emitFocus"
      @on-change="emitChange"
      @on-ready="emitReady"
    />
    <el-button size="small" type="primary">保存</el-button>
  </div>
</template>

<script>
import UiEditor from '@/components/UiEditor/Index'

export default {
  data() {
    return {
      val: {
        content: '',
        bg: 'https://dummyimage.com/500x700&text=background'
      }
    }
  },
  components: {
    'ui-editor': UiEditor
  },
  mounted() {
  },
  methods: {
    emitBlur(quill) {},
    emitFocus(quill) {},
    emitChange({ quill, html, text }) {},
    emitReady(quill) {}
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/_common.scss';

</style>
