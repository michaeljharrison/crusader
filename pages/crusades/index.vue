<template>
  <div class="container">
    <div class="bigcontainer"></div>
  </div>
</template>

<script lang="ts">
// import constants from '~/store/constants'
// import { BattleReport, Faction, Team } from '~/store/types'
export default {
  data() {
    return {}
  },
  components: {},
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  // This allows us to use our global state within this page.
  // computed: mapState(['isLoading', 'currentProof']),
  // Our methods will go here...
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  methods: {
    async fetchData() {},
  },
}
</script>
