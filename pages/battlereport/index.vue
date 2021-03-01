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
        <a-form
          id="wf-form-Battle-Report"
          name="wf-form-Battle-Report"
          data-name="Battle Report"
          _lpchecked="1"
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="handleSubmit"
        >
          <a-form-item>
            <label for="Player" class="field-label">Player 1 Team</label>
            <a-select
              v-decorator="[
                'Team 1',
                {
                  rules: [
                    { required: true, message: 'Please select first player' },
                  ],
                },
              ]"
              style="width: 120px"
              placeholder="Player 1 Team..."
              @change="selectPlayer1"
            >
              <a-select-option
                v-for="(item, key) in factions"
                :key="key"
                :value="item.Slug"
              >
                {{ item.Name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <label for="Player" class="field-label">Player 2 Team</label
            ><a-select
              v-decorator="[
                'Team 2',
                {
                  rules: [
                    { required: true, message: 'Please select second player' },
                  ],
                },
              ]"
              style="width: 120px"
              placeholder="Player 2 Team..."
              @change="selectPlayer2"
            >
              <a-select-option
                v-for="(item, key) in factions"
                :key="key"
                :value="item.Slug"
              >
                {{ item.Name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <label for="Game-Type" class="field-label">Game Type</label>
            <a-select
              v-decorator="[
                'Mission',
                {
                  rules: [
                    { required: true, message: 'Please select a game type.' },
                  ],
                },
              ]"
              style="width: 120px"
              placeholder="Sweep and Clear, the Relic etc..."
              @change="selectMission"
            >
              <a-select-option
                v-for="(item, key) in missions"
                :key="key"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <label for="Power-Level" class="field-label"
              >Power Level/Points</label
            ><a-select
              v-decorator="[
                'Power Level',
                {
                  rules: [
                    { required: true, message: 'Please select power level!' },
                  ],
                },
              ]"
              style="width: 120px"
              placeholder="25, 35 etc..."
              @change="selectPL"
            >
              <a-select-option :key="25" :value="25"> 25 </a-select-option>
              <a-select-option :key="35" :value="35"> 35 </a-select-option>
              <a-select-option :key="50" :value="50"> 50 </a-select-option>
              <a-select-option :key="100" :value="100"> 100 </a-select-option>
            </a-select></a-form-item
          >
          <a-form-item>
            <label for="Planet" class="field-label">Planet</label>
            <p class="hint">
              (If you forgot to pick one before the battle, agree on a planet
              with your opponent, or roll randomly)
            </p>
            <a-select
              v-decorator="[
                'Battleground',
                {
                  rules: [{ required: true, message: 'Please select planet!' }],
                },
              ]"
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
          </a-form-item>
          <a-form-item>
            <label for="Player-3" class="field-label">Winning Team</label>
            <p class="hint">(In the case of a draw, just write 'Draw')</p>
            <a-select
              v-decorator="[
                'Winning Team',
                {
                  rules: [
                    { required: true, message: 'Please select a winner!' },
                  ],
                },
              ]"
              style="width: 120px"
              placeholder="Winning team..."
              @change="selectWinner"
            >
              <a-select-option
                :key="selectedPlayer1"
                :value="selectedPlayer1.Slug"
              >
                {{ selectedPlayer1.Name }}
              </a-select-option>
              <a-select-option
                :key="selectedPlayer2"
                :value="selectedPlayer2.Slug"
              >
                {{ selectedPlayer2.Name }}
              </a-select-option>
              <a-select-option key="draw" value="draw"> Draw </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <label for="Battle-Report" class="field-label">Battle Report</label
            ><a-input
              id="Battle-Report"
              v-decorator="[
                'Battle Report',
                {
                  rules: [],
                },
              ]"
              placeholder="Write any interesting or relevant details about the battle. The more the merrier."
              maxlength="5000"
              name="Battle-Report"
              data-name="Battle Report"
              class="textarea w-input"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <label for="Marked-for-Greatness" class="field-label"
              >Marked for Greatness</label
            ><a-input
              id="Marked-for-Greatness"
              v-decorator="[
                'Marked for Greatness',
                {
                  rules: [
                    {
                      required: true,
                      message:
                        'Please input both players marked for greatness options.',
                    },
                  ],
                },
              ]"
              placeholder='Record here the Marked for Greatness units for both armies (eg. "John the Primaris Captain and Bill the Necron Plasmacyte")'
              maxlength="5000"
              name="Marked-for-Greatness"
              data-name="Marked for Greatness"
              class="textarea w-input"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              value="Submit"
              data-wait="Please wait..."
              class="w-button"
            >
              Submit
            </a-button>
          </a-form-item>
        </a-form>
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
import { Team } from '~/store/types'
// What we export here will be avaliable in our template.
export default {
  transition: 'page',
  data() {
    const battlegrounds: any[] = []
    const factions: any[] = []
    const missions: any[] = []
    const pl: number = 25
    return {
      loading: false,
      error: null,
      post: null,
      pl: 25,
      battlegrounds,
      factions,
      missions,
      winner: '',
      selectedBattleground: '',
      selectedMission: '',
      selectedPlayer1: '',
      selectedPlayer2: '',
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  computed: mapState(['isLoading']),
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
    handleSubmit(e: Event) {
      e.preventDefault()
      this.form.validateFields(async (err: any, values: any) => {
        if (!err) {
          this.$message.loading(`Submitting battle report...`)
          try {
            await this.$store.dispatch('ACTION_submitBattleReport', {
              fire: this.$fire,
              report: values,
            })
            this.$message.success(`Battle Report Submitted.`)
            setTimeout(() => {
              // window.location.href = 'combatLog'
            }, 0)
          } catch (e) {
            console.error(e)
            this.$message.error(
              `Warp storms have caused this battle report to be lost!`
            )
            this.$store.commit('SET_isLoading', false)
          } finally {
            // Cleanup
          }
        }
      })
    },
    selectBattleground(planet: string) {
      this.selectedBattleground = planet
    },
    selectPlayer1(player1: Team) {
      this.selectedPlayer1 = this.factions.find(
        (element) => element.Slug === player1
      )
    },
    selectPlayer2(player2: Team) {
      this.selectedPlayer2 = this.factions.find(
        (element) => element.Slug === player2
      )
    },
    selectPL(pl: number) {
      this.pl = pl
    },
    selectWinner(winner: string) {
      this.winner = winner
    },
    selectMission(mission: string) {
      this.mission = mission
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
        constants.COLLECTIONS.TEAMS
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
          vm.factions.push(faction.data())
        })
      } catch (e) {
        alert(e)
      }

      const missionsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.MISSIONS
      )
      try {
        const snapshot = await missionsRef.get()
        const docs = snapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.missions = []
        docs.forEach((mission: any) => {
          vm.missions.push(mission.data().name)
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
