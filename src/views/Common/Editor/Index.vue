<template>
  <div class="page">
    <ui-editor
      ref="editor"
      v-model="val"
      @on-blur="emitBlur"
      @on-focus="emitFocus"
      @on-change="emitChange"
      @on-ready="emitReady"
    />
    <el-button size="small" type="primary" @click="save">保存</el-button>

    <p>编辑器内容(包含quill样式引入)：</p>
    <pre style="border:1px solid #ddd; max-height: 200px;overflow: auto;">
      {{ val.content }}
    </pre>
    <p>背景图：</p>
    <pre style="border:1px solid #ddd; max-height: 200px;overflow: auto;">
      {{ val.bg }}
    </pre>
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
  mounted() {},
  methods: {
    save() {
      this.$refs.editor.updateContentSubmit()
    },
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
