<template>
  <div class="container">
    <div class="bigcontainer">
      <h1 class="h2">Leaderboard</h1>
      <a-table :columns="columnsLeaderboard" :data-source="data"> </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import constants from '~/store/constants'
import { Faction } from '~/store/types'
const columnsLeaderboard = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'descend',
  },
  {
    title: 'Faction',
    dataIndex: 'faction',
    key: 'faction',
  },
  {
    title: 'Player Name',
    dataIndex: 'player',
    key: 'address',
  },
  {
    title: 'Played',
    key: 'played',
    dataIndex: 'played',
    sorter: (a, b) => a.played > b.played,
  },
  {
    title: 'Won',
    key: 'won',
    dataIndex: 'won',
    sorter: (a, b) => a.won > b.won,
  },
  {
    title: 'Win Ratio',
    key: 'winRate',
    dataIndex: 'winRate',
    defaultSortOrder: 'descend',
    sorter: (a, b) =>
      Math.round((a.won / a.played) * 100) >
      Math.round((b.won / b.played) * 100),
  },
]

const data: any[] = []
export default {
  data() {
    return {
      data,
      columnsLeaderboard,
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
        constants.COLLECTIONS.FACTIONS
      )
      const vm = this
      try {
        const snapshot = await factionsRef.get()
        const docs = snapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.data = []
        docs.forEach((faction: any) => {
          const f: Faction = faction.data()
          f.winRate = `${Math.round((f.won / f.played) * 100)}%`
          vm.data.push(f)
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

<style>
.container {
  margin: unset !important;
}
.bigcontainer {
  flex-grow: 1 !important;
}
</style>
