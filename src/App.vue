<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss"></style>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  components: {}
}
</script>
