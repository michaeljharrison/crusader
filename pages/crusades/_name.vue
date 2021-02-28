<template>
  <div class="container">
    <div class="bigcontainer">
      <h1>
        {{ (crusade && crusade.Name) || 'New Crusade' }}
      </h1>
      <h3>
        {{ (crusade && crusade.Faction) || 'Choose Faction' }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import constants from '~/store/constants'
import { BattleReport, Faction, Team } from '~/store/types'
export default {
  props: ['faction'],
  async asyncData({ params }) {
    const name = params.name
    return { name }
  },
  data() {
    const name: String = this.name
    const loading: boolean = true
    const crusade: Crusade | null = null
    return {
      name,
      crusade,
      loading,
    }
  },
  components: {},
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const vm = this
      this.error = this.post = null
      vm.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const crusadesRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.CRUSADES
      )

      try {
        const ref = await crusadesRef.doc(`${this.name}`)
        if (!ref) {
          console.log('No Crusade Exists.')
          return
        }
        const snapshot = await ref.get()
        const data = await snapshot.data()
        console.log(data)
        vm.crusade = data
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
