<template>
  <div class="container"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
  transition: 'page',
  data() {
    return {
      loading: false,
      error: null,
      post: null,
    }
  },
  watch: {
    // call again the method if the route changes
    // $route: 'fetchData',
  },
  // This allows us to use our global state within this page.
  // computed: mapState(['isLoading', 'currentProof']),
  // Our methods will go here...
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
  },
  mounted() {},
  methods: {},
})
</script>

<style></style>
