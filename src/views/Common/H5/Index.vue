<template>
  <div class="page">
    <ui-h5 />
  </div>
</template>

<script>
import UiH5 from '@/components/UiH5/Index'
import { mapState } from 'vuex'

export default {
  name: 'H5',
  components: {
    'ui-h5': UiH5
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['h5'])
  },
  mounted() {},
  methods: {}
}
</script>

