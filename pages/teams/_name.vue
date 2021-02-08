<template>
  <div class="bigcontainer">
    <div class="div-block-27">
    </div>
    <img
      loading="lazy"
      :src="team && team.FeaturePhoto"
      alt=""
      class="teamlogo"
    />
    <h1 class="h1 center">{{ team && team.Name }}</h1>
    <h1 class="h2 fade">{{ team && team.Faction }}</h1>
    <p class="paragraph">
      {{ team && team.Flavour }}
    </p>
    <div class="line"></div>
    <div class="two-column">
      <div class="column-left">
        <img
          loading="lazy"
          :src="team && team.LeaderPortrait"
          alt=""
          class="heroportraitcircle large"
        />
        <h1 class="h3 center">Leader</h1>
        <h1 class="h2">{{ team && team.Leader }}</h1>
      </div>
      <div class="column-right">
        <img
          loading="lazy"
          src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/60154e95cb5821352bab295f_Portrait.png"
          alt=""
          class="heroportraitcircle large"
        />
        <h1 class="h3 center">Champion</h1>
        <h1 class="h2">{{ team && team['Crusade Champion']}}</h1>
      </div>
    </div>
    <div class="break"></div>
    <p class="paragraph qoute">
      {{ team && team.FlavourQuote}}
    </p>
    <div class="faction-section">
      
    </div>
    <div class="faction-section">
      <h1 class="h3">Images</h1>
      <div id="Image-Gallery" class="w-dyn-list">
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="(team && team.Gallery.split(';') || [])">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <img
              loading="lazy"
              :src="item"
              alt=""
              class="heroportraitcircle large"
            />
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import constants from '~/store/constants'
import { Team } from '~/store/types'
export default {
  props: ['faction'],
  async asyncData({ params }) {
    const name = params.name
    return { name }
  },
  data() {
    const name: String = this.name;
    const team: Team | null = null;
    return {
      name,
      team,
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
        console.log(this.name);
        const ref = await factionsRef.doc(`${this.name}`);
        if (!ref) {
          alert('Document does not exist.')
          return
        }
        const snapshot = await ref.get();
        const data = await snapshot.data();
        console.log(data);
        console.log(data.Gallery.split('; '))
        vm.team = data;
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
