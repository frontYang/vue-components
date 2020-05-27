<template>
  <div class="ui-upload-group">
    <!-- 首层创意分类tab -->
    <tabs-box v-model="tabValue" :tabs="tabs" :content-len="contentLen" />

    <!-- 首层tab内容 -->
    <div v-for="(item, key) in content" :key="key" :class="contentCls(key)">
      <div class="content-item">
        <!-- 多个创意 -->
        <div class="upload-group">
          <div
            v-if="contentValue[key].length === 0"
            class="empty-box"
            @click="addEvent(key)"
          >
            <el-button
              class="btn-plus"
              type=""
              icon="el-icon-plus"
              size=""
            >
              添加创意
            </el-button>
          </div>
          <content-box
            v-else
            v-model="contentValue[key]"
            :tab-value="tabValue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabsBox from './TabsBox/Index'
import ContentBox from './ContentBox/Index'
import CONFIG from './config'

export default {
  components: {
    'tabs-box': TabsBox,
    'content-box': ContentBox
  },
  data() {
    return {
      tabValue: 'CREATIVE_IMAGE_MODE_LARGE',

      tabs: CONFIG.TABS,

      // 内容占位元素
      content: CONFIG.CONTENT_ELEMENTS,

      // 内容值
      contentValue: {
        CREATIVE_IMAGE_MODE_LARGE: [],
        CREATIVE_IMAGE_MODE_VIDEO: [],
        CREATIVE_IMAGE_MODE_VIDEO_VERTICAL: [],
        CREATIVE_IMAGE_MODE_GROUP: [],
        CREATIVE_IMAGE_MODE_SMALL: [],
        CREATIVE_IMAGE_MODE_LARGE_VERTICAL: []
      }
    }
  },
  computed: {
    contentLen() {
      const result = {}
      Object.keys(this.contentValue).forEach((key) => {
        result[key] = this.contentValue[key].length
      })
      return result
    },
    contentCls() {
      return (key) => {
        const cls = ['section-content']
        key !== this.tabValue && cls.push('hide')
        return cls
      }
    }
  },
  methods: {
    // 新增
    addEvent(key) {
      this.contentValue[key].push(CONFIG.CONTENT_VALUE[key])
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_common";
.ui-upload-group {
  border: 1px solid #ddd;
  border-radius: 5px;
  .hide {
    display: none !important;
  }

  .section-content {
    min-height: 200px;
    position: relative;
  }

  .btn-plus {
    position: absolute;
    top: 50%;
    left: 50%;
    border: none;
    background: #f8f8f8;
    transform: translate(-50%, -50%);
  }

  .empty-box {
    text-align: center;
    border: 1px dashed #ddd;
    background: #f8f8f8;
    position: absolute;
    width: 98%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    /* &::before{
      content: '';
      display: block;
      margin: 5px auto;
      width: 390px;
      height: 136px;
      background: url('~@/assets/images/none.png') no-repeat center;
      background-size: 60%;
    } */
  }
}
</style>
