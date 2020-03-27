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
import { quillEditor, Quill } from 'vue-quill-editor'
import quillSnowStyle from './quillSnowStyle'
import * as editorUtil from './config'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'ui-editor',
  props: {
    value: {
      type: Object,
      default() {
        return {
          content: '',
          bg: ''
        }
      }
    }
  },
  data() {
    return {
      content: '',
      bg: '',
      editorOption: {
        placeholder: 'Insert text here',
        modules: {
          toolbar: {
            container: container.concat([['image-bg', 'del-bg']]),
            handlers: {
              image: function(value) {
                QuillWatch.emit(this.quill.id)
              },
              'image-bg': (value) => {
                editorUtil.customUpload(this.editor).then((src) => {
                  this.bg = src
                })
              },
              'del-bg': (value) => {
                this.bg = ''
              }
            }
          },
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          ImageExtend: Object.assign(editorUtil.uploadConfig, {
            response: (res) => {
              return res.data.src
            }
          })
        },
        initCustom() {
          // 初始化背景按钮
          const bgImageButton = document.querySelector('.ql-image-bg')
          bgImageButton.style.cssText = 'width:80px; border:1px solid #ccc; border-radius:5px;'
          bgImageButton.innerText = 'background'

          // 初始化删除背景按钮
          const delBgButton = document.querySelector('.ql-del-bg')
          delBgButton.style.cssText = 'width: 110px; margin-left: 5px; border:1px solid #ccc; border-radius:5px;'
          delBgButton.innerText = 'del background'
        }
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {
    bg: {
      handler() {
        this.initBg()
        this.value.bg = this.bg
      }
    }
  },
  components: {
    'quill-editor': quillEditor
  },
  mounted() {
    this.editorOption.initCustom()
    this.bg = this.value.bg
    this.content = this.value.content
  },
  methods: {
    /* 初始化背景 */
    initBg() {
      if (this.bg && this.bg !== '') {
        this.$utils.loadImage(this.bg).then((res) => {
          this.editor.root.style.background = `url(\'${this.bg}\') no-repeat`
          this.editor.root.style.backgroundSize = `${res.width}px ${res.height}px`
          this.editor.root.style.minHeight = `${res.height}px`
        })
      } else {
        this.editor.root.style.background = ''
      }
    },
    /* 更新提交的内容 */
    updateContentSubmit() {
      const html = this.editor.container.firstElementChild.innerHTML
      const style = `background: ${this.editor.root.style.background}; background-size: ${this.editor.root.style.backgroundSize}; min-height: ${this.$refs.myQuillEditor.quill.root.style.minHeight}`
      this.value.content = `<style>${quillSnowStyle}</style><div style='${style}'>${html}</div>`
    },
    onEditorBlur(quill) {
      this.updateContentSubmit()
      this.$emit('on-blur', quill)
    },
    onEditorFocus(quill) {
      this.$emit('on-focus', quill)
    },
    onEditorReady(quill) {
      this.initBg()
      this.$emit('on-ready', quill)
    },
    onEditorChange({ quill, html, text }) {
      this.content = html
      this.$emit('on-change', { quill, html, text })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/_common.scss';
</style>
