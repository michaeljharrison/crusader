<template>
  <div class="container">
    <div class="bigcontainer">
      <h1 class="h2">Leaderboard</h1>
      <a-table
        :columns="columnsLeaderboard"
        :data-source="data"
        :loading="loadingData"
      >
        <div slot="Name" slot-scope="Name, record" class="column center">
          <TeamIcon :team-slug="record.Slug"></TeamIcon>
          <p :style="record.TeamColor">{{ Name }}</p>
        </div>
      </a-table>
      <h1 class="h2">BattleLog</h1>
      <a-table
        :columns="columnsBattleLog"
        :data-source="brData"
        :loading="loadingBRData"
      >
        <NuxtLink
          slot="Name"
          slot-scope="Name, record"
          :to="'/crusader/combatLog/' + record.Slug"
          >{{ Name || 'UNAMED BATTLE' }}</NuxtLink
        >
        <span slot="Date" slot-scope="Date, record">{{
          record['Created On']
        }}</span>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import constants from '~/store/constants'
import TeamIcon from '~/components/TeamIcon.vue'
import { BattleReport, Faction, Team } from '~/store/types'
const columnsLeaderboard = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    scopedSlots: { customRender: 'Name' },
    // defaultSortOrder: 'descend',
  },
  {
    title: 'Faction',
    dataIndex: 'Faction',
    key: 'Faction',
  },
  {
    title: 'Player Name',
    dataIndex: 'Player',
    key: 'Player',
  },
  {
    title: 'Played',
    key: 'Battles Played',
    dataIndex: 'Battles Played',
    sorter: (a: Team, b: Team) => a['Battles Played'] > b['Battles Played'],
  },
  {
    title: 'Won',
    key: 'Battles Won',
    dataIndex: 'Battles Won',
    sorter: (a: Team, b: Team) => a['Battles Won'] > b['Battles Won'],
  },
  {
    title: 'Win Ratio',
    key: 'winRate',
    dataIndex: 'winRate',
    defaultSortOrder: 'descend',
    sorter: (a: Team, b: Team) =>
      Math.round((a['Battles Won'] / a['Battles Played']) * 100) >
      Math.round((b['Battles Won'] / b['Battles Played']) * 100),
  },
]
const columnsBattleLog = [
  {
    title: 'Name',
    key: 'Name',
    dataIndex: 'Name',
    scopedSlots: { customRender: 'Name' },
    // defaultSortOrder: 'descend',
    sorter: (a: BattleReport, b: BattleReport) => a.Name > b.Name,
  },
  {
    key: 'Like',
    scopedSlots: { customRender: 'Like' },
  },
  {
    title: 'Date',
    key: 'Created On',
    dataIndex: 'Created On',
    defaultSortOrder: 'descend',
    sorter: (a: BattleReport, b: BattleReport) => {
      return (
        new Date(Date.parse(a['Created On'])) >
        new Date(Date.parse(b['Created On']))
      )
    },
    // slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'Date' },
  },
  {
    title: 'Planet',
    dataIndex: 'Battleground',
    key: 'Battleground',
    sorter: (a: BattleReport, b: BattleReport) =>
      a.Battleground > b.Battleground,
  },
  {
    title: 'Team 1',
    dataIndex: 'Team 1',
    key: 'Team 1',
    sorter: (a: BattleReport, b: BattleReport) => a['Team 1'] > b['Team 1'],
  },
  {
    title: 'Team 2',
    dataIndex: 'Team 2',
    key: 'Team 2',
    sorter: (a: BattleReport, b: BattleReport) => a['Team 2'] > b['Team 2'],
  },
  {
    title: 'Mission',
    dataIndex: 'Mission',
    key: 'Mission',
    sorter: (a: BattleReport, b: BattleReport) => a.Mission > b.Mission,
  },
  {
    title: 'PL',
    key: 'Power Level',
    dataIndex: 'Power Level',
    sorter: (a: BattleReport, b: BattleReport) =>
      a['Power Level'] > b['Power Level'],
  },
  {
    title: 'Winner',
    key: 'Winning Team',
    dataIndex: 'Winning Team',
    sorter: (a: BattleReport, b: BattleReport) =>
      a['Winning Team'] > b['Winning Team'],
  },
]

const data: Faction[] = []
const brData: BattleReport[] = []
export default {
  components: {
    TeamIcon,
  },
  data() {
    return {
      loadingData: true,
      loadingBRData: true,
      data,
      brData,
      columnsLeaderboard,
      columnsBattleLog,
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
    this.fetchCombatLog()
  },
  methods: {
    async likeReport(report) {
      this.$message.success(`Like submitted!`)
      const newBRData = this.brData
      const brIndex = newBRData.findIndex((row) => row.Slug == report.Slug)
      if (newBRData[brIndex].Likes) {
        newBRData[brIndex].Likes += 1
      } else {
        newBRData[brIndex].Likes = 1
      }
      this.brData = newBRData
    },
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
        vm.data = []
        docs.forEach((teamDoc: any) => {
          const t: Team = teamDoc.data()
          t.winRate = `${Math.round(
            (t['Battles Won'] / t['Battles Played']) * 100
          )}%`
          t.TeamColor = `color: ${t.TeamColor}`
          vm.data.push(t)
        })
        vm.loadingData = false
      } catch (e) {
        alert(e)
      }
      // make sure this request is the last one we did, discard otherwise
      if (vm.$route.params.id !== fetchedId) return
      this.loading = false
    },
    async fetchCombatLog() {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const brRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.BATTLEREPORTS
      )
      const vm = this
      try {
        const snapshot = await brRef.get()
        const docs = snapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.brData = []
        docs.forEach((battleReport: any) => {
          const br: BattleReport = battleReport.data()
          if (!br.Name) {
            br.Name = battleReport.id
            br.Slug = battleReport.id
          }
          if (br['Created On']) {
            br['Created On'] = new Date(
              Date.parse(br['Created On'])
            ).toDateString()
          }
          if (!br.Disabled) vm.brData.push(br)
        })
        vm.loadingBRData = false
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
