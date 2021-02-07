<template>
  <div class="container">
    <div class="bigcontainer">
      <h1 class="h1">The Factions of the telemon crusade</h1>
      <div class="line"></div>
      <FactionTwo v-for="(item, key) in factions" :key="key" :faction="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import constants from '~/store/constants'
// What we export here will be avaliable in our template.
export default {
  transition: 'page',
  data() {
    const factions: any[] = []
    return {
      loading: false,
      error: null,
      post: null,
      factions,
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
      try {
        const snapshot = await factionsRef.get()
        const docs = snapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.factions = []
        docs.forEach((faction: any) => {
          vm.factions.push(faction.data())
        })
      } catch (e) {
        alert(e)
      }
      // make sure this request is the last one we did, discard otherwise
      if (vm.$route.params.id !== fetchedId) return
      this.loading = false
    },
  },
}
</script>