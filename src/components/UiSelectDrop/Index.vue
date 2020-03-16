<template>
  <!-- 模拟选项下拉 -->
  <div class="ui-select-drop">
    <el-select v-model="selectVal" :placeholder="placeholder" @blur="blur" @visible-change="visibleChange" filterable clearable>
      <el-option v-for="(item, index) in data" :key="index" :label="item[prop.label]" :value="item[prop.value]">
        {{item[prop.label]}}
        <el-link
          class="link-preview"
          type="primary"
          :underline="false"
          @click.stop="preview(item[prop.value])">预览</el-link>
      </el-option>
    </el-select>

    <!-- 预览 -->
    <div class="iframe-wrap" v-if="previewUrl !== ''">
      <div class="iframe-wrap-inner">
        <iframe :src="previewUrl"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    prop: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    placeholder: {
      type: String,
      default() {
        return '请选择'
      }
    },
    data: {
      type: Array,
      default() {
        return [
          {
            label: 'aaa',
            value: window.location.href
          },
          {
            label: 'vbvv',
            value: window.location.href + '?'
          }
        ]
      }
    }
  },
  data() {
    return {
      selectVal: '',
      previewUrl: ''
    }
  },
  watch: {
    selectVal: {
      handler() {
        this.$emit('input', this.selectVal)
      }
    }
  },
  created() {
    this.selectVal = this.value
  },
  methods: {
    // 预览
    preview(url) {
      this.previewUrl = url
    },

    visibleChange(value) {
      !value && (this.previewUrl = '')
    },

    blur(e) {
      this.previewUrl = ''
    }
  }
}
</script>

<style scoped lang="scss">
.ui-select-drop{
  position: relative;

  .iframe-wrap {
    /* position: absolute;
    top: 45px;
    right: -186px; */
    position: relative;
    top: 45px;
    display: inline-block;
    margin-left: 20px;
    vertical-align: top;
    width: 170px;
    height: 352px;
    border: 10px solid #333;
    border-top: 43px solid #333;
    border-bottom: 43px solid #333;
    border-radius: 43px;
    background-color: #333;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 99;

    .iframe-wrap-inner{
      width: 375px;
      height: 663px;
      transform: scale(.4);
      transform-origin: 0 0;
    }

    iframe{
      position: absolute;
      top:0 ;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  }

}
.link-preview{
  float: right;
}
</style>
