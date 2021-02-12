<template>
  <div class="bigcontainer">
    <h1 class="h1">{{ br && br.Name }}</h1>
    <div class="div-block-16">
      <h1 class="h2">{{ br && br['Team 1'].replaceAll('-', ' ') }}</h1>
      <h1 class="h2 vs">vs</h1>
      <h1 class="h2">{{ br && br['Team 2'].replaceAll('-', ' ') }}</h1>
    </div>
    <a-radio-group :value="edit" @change="handleEditchange">
      <a-radio-button value="false"> View </a-radio-button>
      <a-radio-button value="true"> Edit </a-radio-button>
    </a-radio-group>
    <div class="line"></div>
    <div v-if="edit === 'false'" class="div-block-20">
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
    <div v-else class="div-block-20">NOT YET IMPLEMENTED!</div>
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
    return {
      name,
      br,
      edit: 'false',
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
  methods: {
    handleEditchange(e) {
      this.edit = e.target.value
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
        console.log(this.name)
        const ref = await brRef.doc(`${this.name}`)
        if (!ref) {
          alert('Document does not exist.')
          return
        }
        const snapshot = await ref.get()
        const data = await snapshot.data()
        console.log(data)
        vm.br = data
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
