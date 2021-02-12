<template>
<a-timeline-item class="loreFragment">
  <div class="header">
    <div class="left">
      <TeamIcon :teamSlug="lore.Type"/>
      </div>
      <div class=:right>
        <h6>{{lore.Name}}</h6>
        <p>{{lore.Date}}</p>
      </div>
  </div>
  
  <p v-html="lore.Contents"></p></a-timeline-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import TeamIcon from '~/components/TeamIcon.vue';
import {LoreFragment} from'~/store/types'
import constants from '~/store/constants'

export default Vue.extend({
  transition: 'page',
  props: ['fragment'],
  data() {
    const lore: LoreFragment = this.fragment;
    return {
      loading: false,
      lore,
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
  
