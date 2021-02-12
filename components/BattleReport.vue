<template>
<a-timeline-item class="battleReport">
  <div class="header">
    <div class="left">
        <h6>{{br.Name}}</h6>
        <p>{{br.Date}}</p>
      </div>
      <div class=right>
        <TeamIcon :teamSlug="br['Team 1']"/>
        <TeamIcon :teamSlug="br['Team 2']"/>
      </div>
  </div>
  
  <p v-html="br['Battle Report']"></p></a-timeline-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import TeamIcon from '~/components/TeamIcon.vue';
import {BattleReport} from'~/store/types'
import constants from '~/store/constants'

export default Vue.extend({
  transition: 'page',
  props: ['fragment'],
  data() {
    const br: BattleReport = this.fragment;
    return {
      loading: false,
      br,
      post: null,
    }
  },
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
    // this.fetchData() 
  },
  mounted() {
     // this.fetchImages()
  },
  methods: {
  },
})
</script>
  
