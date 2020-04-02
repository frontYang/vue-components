<template>
  <p class="base-text">{{ text }}</p>
</template>

<script>
export default {
  props: {
    value: {
      type: Array
    }
  },
  computed: {
    text() {
      const data = this.value.filter((v) => v.type === 'text')[0]
      const textData = data.data.filter((v) => v.prop === 'text')[0]
      return textData.value
    }
  }
}
</script>

<style scoped lang="scss"></style>
