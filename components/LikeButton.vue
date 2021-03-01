<template>
  <div class="likeButton">
    <vue-star animate="animated rubberBand" color="#F05654">
      <a slot="icon" class="fa fa-heart" @click="handleClick"></a>
    </vue-star>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueStar from 'vue-star'
export default Vue.extend({
  data: {},
  components: {
    VueStar,
  },
  methods: {
    async like() {
      this.$message.success(`Battle report liked.`)
    },
  },
})
</script>
