<template>
  <div class="ui-editor">
    <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
  />
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

const bg = 'https://rescdn.qqmail.com/zh_CN/htmledition/images/xinzhi/bg/a_09.jpg'
export default {
  name: 'ui-editor',
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      content: '',
      editorOption: {
        // Some Quill options...
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  components: {
    'quill-editor': quillEditor
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
    this.content = this.value
  },
  methods: {
    onEditorBlur(quill) {
      // console.log('editor blur!', quill)
      console.log(quill.container.innerHTML)
      this.$emit('input', quill.container.innerHTML)
    },
    onEditorFocus(quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      // console.log('editor ready!', quill)
      this.editor.root.style.background = `url(${bg}) repeat-x #0e9dbb`
      this.editor.root.style.minHeight = '400px'
      this.editor.root.style.padding = '100px 55px 200px'
    },
    onEditorChange({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
    }
  }

}
</script>

<style lang="scss">
@import '@/assets/styles/_common.scss';

</style>
