<template>
  <a-timeline-item class="loreFragment" :style="">
    <div class="header">
      <div class="left">
        <TeamIcon :teamSlug="lore.Type" />
      </div>
      <div class=":right">
        <h6>{{ lore.Name }}</h6>
        <p>{{ lore.Date }}</p>
      </div>
    </div>

    <p v-html="lore.Contents"></p
  ></a-timeline-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import TeamIcon from '~/components/TeamIcon.vue'
import { LoreFragment, Team } from '~/store/types'
import constants from '~/store/constants'

export default Vue.extend({
  transition: 'page',
  props: ['fragment'],
  data() {
    const lore: LoreFragment = this.fragment
    const teamColor: String = null
    return {
      loading: false,
      lore,
      teamColor,
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
    this.fetchData()
  },
  mounted() {
    // this.fetchImages()
  },
  methods: {
    async fetchData() {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const factionsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.TEAMS
      )
      const vm = this
      if (!this.lore['Related Team']) return
      try {
        const teamRef = await factionsRef.doc(`${this.lore['Related Team']}`)
        if (!teamRef) {
          console.error('Doc does not exist.')
          return
        }
        const teamSnapshot = await teamRef.get()
        const teamData: Team = await teamSnapshot.data()
        vm.teamColor = `background-color: ${
          (teamData && teamData.TeamColor) || 'blue'
        }`
      } catch (e) {
        alert(e)
      }
      // make sure this request is the last one we did, discard otherwise
      if (vm.$route.params.id !== fetchedId) return
      this.loading = false
    },
  },
})
</script>
