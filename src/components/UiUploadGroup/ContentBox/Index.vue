<template>
  <el-form :model="formData" :rules="rules" size="small" label-width="90px">
    <div class="content-box">
      <!-- 创意tab -->
      <div class="box-tabs">
        <div :class="tabCls(index)" v-for="(item, index) in value" :key="index">
          <span @click="onTab(index)">创意{{ index + 1 }}</span>
          <i class="el-icon-close" @click="onDelete(index)"></i>
        </div>
        <el-button class="btn-plus" type="primary" size="small" icon="el-icon-plus" @click="onAdd">添加创意</el-button>
      </div>

      <!-- 创意内容 -->
      <div class="box-content">
        <template v-for="(item, index) in value">
          <div :class="contentCls(index)" :key="index">
            <div class="item" v-for="(ele, index) in ELEMENTS" :key="index">
              <!-- 图片 -->
              <el-form-item label="创意内容：" v-if="ele.type === 'image'">
                <!-- <image-box :element="ele" :data="item"/> -->
                <upload label="上传图片" :tip="ele.description" />
              </el-form-item>

              <!-- 组 -->
              <template v-if="ele.type === 'group'">
                <el-form-item label="创意内容：">
                  <template v-for="(eleGroup, eleGroupIndex) in ele.elements">
                    <!-- 图片 -->
                    <!-- <image-box v-if="eleGroup.type === 'image'" :element="eleGroup" :data="item" :key="eleGroupIndex"/> -->
                    <upload label="上传图片" :tip="element.description" :key="eleGroupIndex" />
                    <!-- 视频 -->
                    <!-- <video-box v-if="eleGroup.type === 'video'" :element="eleGroup" :data="item" :key="eleGroupIndex"/> -->
                    <upload
                      v-if="eleGroup.type === 'video'"
                      label="上传视频"
                      :tip="element.description"
                      :key="eleGroupIndex"
                    />
                  </template>
                </el-form-item>
              </template>

              <!-- 标题 -->
              <template v-if="ele.type === 'text'">
                <el-form-item label="创意标题：">
                  <el-input v-model="item.title" placeholder="请输入创意标题"></el-input>
                </el-form-item>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </el-form>
</template>

<script>
import CONFIG from '../config'
import Upload from './Upload'
export default {
  components: {
    upload: Upload
  },
  props: {
    tabValue: {
      type: String
    },
    value: {
      type: Array
    }
  },
  data() {
    return {
      tabIndex: 0,
      formData: {},
      rules: {}
    }
  },
  computed: {
    ELEMENTS() {
      return CONFIG.CONTENT_ELEMENTS[this.tabValue].elements
    },
    contentCls() {
      return (index) => {
        const cls = ['box-content__item']
        index !== this.tabIndex ? cls.push('hide') : cls.filter((v) => v !== 'hide')
        return cls
      }
    },
    tabCls() {
      return (index) => {
        const cls = ['box-tabs__item']
        index === this.tabIndex && cls.push('current')
        return cls
      }
    }
  },
  methods: {
    // 切换创意
    onTab(index) {
      this.tabIndex = index
    },
    // 增加创意
    onAdd() {
      const data = this.value
      data.push(CONFIG.CONTENT_VALUE[this.tabValue])
      this.$emit('input', data)
    },

    // 删除创意
    onDelete(index) {
      const data = this.value
      data.splice(index, 1)
      this.$emit('input', data)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/_common';
.content-box {
  .box-tabs {
    display: flex;
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
    .box-tabs__item {
      padding: 0 15px;
      font-size: 14px;
      cursor: pointer;
      &:hover,
      &.current {
        color: $primary;
      }
    }
    .btn-plus {
      margin: 5px 0;
    }
  }

  .box-content__item {
    &.hide {
      display: none !important;
    }

    .item {
      padding: 10px;
    }
  }
  .upload {
    width: 250px;
    display: inline-block;
  }
}
</style>
