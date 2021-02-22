<template>
  <div class="container">
    <div class="bigcontainer">
      <div class="sectionmain">
        <h1 class="h1">Battlegrounds of the Telemon System</h1>
      </div>
      <div class="sectionmain">
        <img
          src="https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb706c0e826a72079b9a4f_Telemon%20System%20Map.svg"
          loading="lazy"
          alt=""
          class="image-3"
        />
        <div class="div-block-12">
          <h1 class="h3">The Telemon System</h1>
          <p class="paragraph">
            The Telemon system was, until recently, completely unremarkable.
            It's four planets offer no strategic advantage in warfare, and the
            only resources of any value have been harvested long ago. Although
            one planet holds a small T'au population, the system itself is
            relatively unclaimed from a military perspective.
          </p>
          <div
            v-for="(item, key) in battlegrounds"
            :key="key"
            class="battleground"
          >
            <h1 class="h5">{{ item.name }}</h1>
            <p class="paragraph">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="sectionmain-vert">
        <div class="div-planetcontainers">
          <div class="collection-list-wrapper-3 w-dyn-list">
            <div role="list" class="w-dyn-items w-row">
              <div
                v-for="(item, key) in battlegrounds"
                :key="key"
                role="listitem"
                class="collection-item-4 w-dyn-item w-col w-col-3"
              >
                <img
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime.png"
                  alt=""
                  sizes="300px"
                  srcset="
                    https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime-p-500.png  500w,
                    https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime-p-800.png  800w,
                    https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime.png       1000w
                  "
                  class="image-planet"
                />
                <h1 class="h2">{{ item.name }}</h1>
                <h1 class="h5">Controlled by:</h1>
                <h1 class="h5 grey w-condition-invisible">Contested</h1>
                <h1 :style="item.color" class="h5">
                  {{ item.winner }}
                </h1>
                <div class="div-extract">
                  <h1 class="h6">Combat Effect</h1>
                  <div class="paragraph i">
                    {{ item.rulesFluff }}
                  </div>
                  <div class="line"></div>
                  <div class="paragraph">
                    {{ item.rules }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sectionmain-vert">
        <h1 class="h2">war zone points</h1>
        <a-table :columns="columnsLeaderboard" :data-source="data"> </a-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { getBattleGround } from '~/store/index'
import constants from '~/store/constants'
import { Battleground, Faction, Team } from '~/store/types'
const data: any = []
const columnsLeaderboard = [
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    sorter: (a, b) => a.team.length > b.team.length,
  },
]
export default {
  transition: 'page',
  data() {
    const battlegrounds: Battleground[] = []
    return {
      loading: false,
      error: null,
      post: null,
      data,
      columnsLeaderboard,
      battlegrounds,
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
      const battlegroundsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.BATTLEGROUNDS
      )
      const factionsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.TEAMS
      )
      const vm = this
      try {
        const snapshot = await battlegroundsRef.get()
        const factions = await factionsRef.get()
        const docs = snapshot.docs
        const factionDocs = factions.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }

        // Battlegrounds.
        vm.battlegrounds = []
        docs.forEach(async (battleground: any) => {
          const bg: Battleground = battleground.data()
          vm.battlegrounds.push(bg)
          const bgName = await getBattleGround(bg.name)
          vm.columnsLeaderboard.push({
            dataIndex: `WZP-${bgName}`,
            key: `WZP-${bgName}`,
            title: bg.name,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a[`WZP-${bgName}`] > b[`WZP-${bgName}`],
          })
        })

        // Factions
        factionDocs.forEach((faction: any) => {
          const f: Team = faction.data()
          const row: Object = {}
          Object.keys(f).forEach((key) => {
            if (key.match(/WZP/)) {
              row[key] = f[key]
            }
          })
          vm.data.push({
            team: f.Name,
            ...row,
          })

          vm.battlegrounds.forEach(async (bg) => {
            const bgName = await getBattleGround(bg.name)
            if (!bg.winningPoints || bg.winningPoints < f[`WZP-${bgName}`]) {
              bg.winningPoints = f[`WZP-${bgName}`]
              bg.winner = f.Name
              bg.color = `color: ${f.TeamColor}`
            }
          })
        })

        // Determine
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
