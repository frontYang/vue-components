<template>
  <div class="page page-upload-group">
    <ui-upload-group />
  </div>
</template>

<script>
import UiUploadGroup from '@/components/UiUploadGroup/Index'
export default {
  data() {
    return {}
  },
  components: {
    'ui-upload-group': UiUploadGroup
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.page-upload-group {
  padding: 20px;
}
</style>
