<template>
  <div class="bigcontainer">
    <h1 class="h1">{{ br && br.Name }}</h1>
    <div class="div-block-16">
      <h1 class="h2">{{ br && br['Team 1'].replaceAll('-', ' ') }}</h1>
      <h1 class="h2 vs">vs</h1>
      <h1 class="h2">{{ br && br['Team 2'].replaceAll('-', ' ') }}</h1>
    </div>
    <div class="line"></div>
    <div v-if="!edit" class="div-block-20">
      <div>
        <div>
          <h1 class="h2">Winner:&nbsp;</h1>
          <h1 class="h2">
            {{ br && br['Winning Team'].replaceAll('-', ' ') }}
          </h1>
        </div>
        <p class="paragraph">
          {{ br && br['Battle Report'] }}
        </p>
        <div class="battle-report-images w-dyn-list">
          <script
            type="text/x-wf-template"
            id="wf-template-d463d55c-66c6-0834-5280-59e159994749"
          >
            %3Cdiv%20role%3D%22listitem%22%20class%3D%22w-dyn-item%20w-dyn-repeater-item%20w-col%20w-col-3%22%3E%3Ca%20href%3D%22%23%22%20class%3D%22w-inline-block%20w-dyn-bind-empty%20w-lightbox%22%3E%3Cimg%20loading%3D%22lazy%22%20src%3D%22%22%20alt%3D%22%22%20class%3D%22w-dyn-bind-empty%22%2F%3E%3Cscript%20type%3D%22application%2Fjson%22%20class%3D%22w-json%22%3E%7B%0A%20%20%22items%22%3A%20%5B%5D%0A%7D%3C%2Fscript%3E%3C%2Fa%3E%3C%2Fdiv%3E
          </script>
          <div role="list" class="w-dyn-items w-row w-dyn-hide"></div>
          <div class="emptystate w-dyn-empty">
            <div class="text-block-2">No Pictographs Recorded.</div>
          </div>
        </div>
      </div>
      <div class="div-block-21">
        <h1 class="h2">{{ br && br.Battleground.replaceAll('-', ' ') }}</h1>
        <h1 class="h3 center">{{ br && br.Mission.replaceAll('-', ' ') }}</h1>
        <h1 class="h6">{{ br && br.Date }}</h1>
        <img
          loading="lazy"
          src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime.png"
          alt=""
          sizes="(max-width: 479px) 100vw, 500px"
          srcset="
            https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime-p-500.png  500w,
            https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime-p-800.png  800w,
            https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime.png       1000w
          "
          class="image-9"
        />
      </div>
    </div>
    <div class="div-block-20" v-show="edit">
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
            <label for="Name" class="field-label">Name</label>
            <a-input
              id="Name"
              v-decorator="[
                'Name',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please name this battle report.',
                    },
                  ],
                },
              ]"
              placeholder="The battle of..."
              maxlength="5000"
              name="Name"
              data-name="Name"
              class="textarea w-input"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <label for="disabled" class="field-label">Disabled</label>
            <a-checkbox
              default-checked
              v-decorator="[
                'Disabled',
                {
                  rules: [],
                },
              ]"
            >
            </a-checkbox>
          </a-form-item>
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
                :value="item"
              >
                {{ item }}
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
                :value="item"
              >
                {{ item }}
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
                disabled
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
              disabled
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
              <a-select-option :key="selectedPlayer1" :value="selectedPlayer1">
                {{ selectedPlayer1 }}
              </a-select-option>
              <a-select-option :key="selectedPlayer2" :value="selectedPlayer2">
                {{ selectedPlayer2 }}
              </a-select-option>
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
import { BattleReport } from '~/store/types'
export default {
  async asyncData({ params }) {
    const name = params.name
    return { name }
  },
  data() {
    const name: String = this.name
    const br: BattleReport | null = null
    const battlegrounds: any[] = []
    const factions: any[] = []
    const missions: any[] = []
    const pl: number = 25
    return {
      name,
      br,
      edit: true,
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
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  mounted() {},
  methods: {
    handleSubmit(e: Event) {
      e.preventDefault()
      this.form.validateFields(async (err: any, values: any) => {
        if (!err) {
          values.Slug = this.name
          this.$message.loading(`Updating battle report...`)
          try {
            await this.$store.dispatch('ACTION_updateBattleReport', {
              fire: this.$fire,
              report: values,
            })
            this.$message.success(`Battle Report Updated.`)
          } catch (e) {
            console.error(e)
            this.$message.error(
              `Warp storms have caused your updates to be lost!`
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
    selectMission(mission: string) {
      this.mission = mission
    },
    handleEditchange(e) {
      this.edit = e.target.value
      this.form.setFieldsValue({
        ...this.br,
      })
    },
    async fetchData() {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const brRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.BATTLEREPORTS
      )

      const vm = this
      try {
        const ref = await brRef.doc(`${this.name}`)
        if (!ref) {
          alert('Document does not exist.')
          return
        }
        const snapshot = await ref.get()
        const data = await snapshot.data()
        vm.form.setFieldsValue({
          ...vm.br,
        })
        vm.br = data
        this.form.setFieldsValue({
          ...this.br,
        })

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

        const bgRef = this.$fire.firestore.collection(
          constants.COLLECTIONS.BATTLEGROUNDS
        )
        try {
          const snapshot = await bgRef.get()
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
            vm.factions.push(faction.data().Name)
          })
        } catch (e) {
          alert(e)
        }
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
