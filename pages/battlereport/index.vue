<template>
  <div class="container">
    <div class="bigcontainer">
      <h1 class="h1">Submit battle report</h1>
      <p class="paragraph">
        Use this form to submit the results of your battles. Once the form is
        received, I'll update the website and relevant leaderboards with the
        results.
      </p>
      <div class="line"></div>
      <div class="w-form">
        <form
          id="wf-form-Battle-Report"
          name="wf-form-Battle-Report"
          data-name="Battle Report"
          _lpchecked="1"
        >
          <label for="Player-2" class="field-label">Player 1 Team</label>
          <a-select
            style="width: 120px"
            placeholder="Player 1 Team..."
            @change="selectPlayer1"
          >
            <a-select-option
              v-for="(item, key) in factions"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option> </a-select
          ><label for="Player" class="field-label">Player 2 Team</label
          ><a-select
            style="width: 120px"
            placeholder="Player 2 Team..."
            @change="selectPlayer2"
          >
            <a-select-option
              v-for="(item, key) in factions"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option> </a-select
          ><label for="Game-Type" class="field-label">Game Type</label>
          <input
            id="Power-Level"
            type="text"
            class="text-field w-input"
            maxlength="256"
            name="Power-Level"
            data-name="Power Level"
            placeholder="e.g. Sweep and Clear, Recon Patrol, etc."
            required=""
          /><label for="Power-Level" class="field-label"
            >Power Level/Points</label
          ><a-select
            style="width: 120px"
            placeholder="25, 35 etc..."
            @change="selectPL"
          >
            <a-select-option :key="25" :value="25"> 25 </a-select-option>
            <a-select-option :key="35" :value="35"> 35 </a-select-option>
            <a-select-option :key="50" :value="50"> 50 </a-select-option>
            <a-select-option :key="100" :value="100">
              100
            </a-select-option> </a-select
          ><label for="Planet" class="field-label">Planet</label>
          <p class="hint">
            (If you forgot to pick one before the battle, agree on a planet with
            your opponent, or roll randomly)
          </p>
          <a-select
            style="width: 120px"
            placeholder="Doridia, Kjelstan etc..."
            @change="selectBattleground"
          >
            <a-select-option
              v-for="(item, key) in battlegrounds"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
          <label for="Player-3" class="field-label">Winning Team</label>
          <p class="hint">(In the case of a draw, just write 'Draw')</p>
          <a-select
            style="width: 120px"
            placeholder="Winning team..."
            @change="selectWinner"
          >
            <a-select-option
              v-for="(item, key) in factions"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option></a-select
          >
          <label for="Battle-Report" class="field-label">Battle Report</label
          ><textarea
            id="Battle-Report"
            placeholder="Write any interesting or relevant details about the battle. The more the merrier."
            maxlength="5000"
            name="Battle-Report"
            data-name="Battle Report"
            class="textarea w-input"
          ></textarea
          ><label for="Marked-for-Greatness" class="field-label"
            >Marked for Greatness</label
          ><textarea
            id="Marked-for-Greatness"
            placeholder='Record here the Marked for Greatness units for both armies (eg. "John the Primaris Captain and Bill the Necron Plasmacyte")'
            maxlength="5000"
            name="Marked-for-Greatness"
            data-name="Marked for Greatness"
            class="textarea w-input"
          ></textarea
          ><input
            type="submit"
            value="Submit"
            data-wait="Please wait..."
            class="w-button"
          />
        </form>
        <div class="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div class="w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
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
    const battlegrounds: any[] = []
    const factions: any[] = []
    const pl: number = 25
    return {
      loading: false,
      error: null,
      post: null,
      pl: 25,
      battlegrounds,
      factions,
      winner: '',
      selectedBattleground: '',
      selectedPlayer1: '',
      selectedPlayer2: '',
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
    selectBattleground(planet: string) {
      this.selectedBattleground = planet
    },
    selectPlayer1(player1: string) {
      this.selectedPlayer1 = player1
    },
    selectPlayer2(player2: string) {
      this.selectedPlayer2 = player2
    },
    selectPL(pl: number) {
      this.pl = pl
    },
    selectWinner(winner: string) {
      this.winner = winner
    },
    async fetchData() {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const planetsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.BATTLEGROUNDS
      )
      const vm = this
      try {
        const snapshot = await planetsRef.get()
        const docs = snapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.battlegrounds = []
        docs.forEach((battleground: any) => {
          vm.battlegrounds.push(battleground.data().name)
        })
      } catch (e) {
        alert(e)
      }

      const factionsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.FACTIONS
      )
      try {
        const snapshot = await factionsRef.get()
        const docs = snapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.factions = []
        docs.forEach((faction: any) => {
          vm.factions.push(faction.data().name)
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
