<template>
  <div class="container">
    <div class="bigcontainer">
      <h1>{{ crusade && crusade.Name }}</h1>
      <a-form
        :form="form"
        layout="inline"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="Note">
          <a-input
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }],
              },
            ]"
            disabled
          />
        </a-form-item>
        <a-form-item label="Gender">
          <a-select
            v-decorator="[
              'gender',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' },
                ],
              },
            ]"
            placeholder="Select a option and change input text above"
            @change="handleSelectChange"
          >
            <a-select-option value="male"> male </a-select-option>
            <a-select-option value="female"> female </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit"> Submit </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import constants from '~/store/constants'
import { BattleReport, Crusade, Faction, Team } from '~/store/types'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

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
      hasErrors,
      form: this.$form.createForm(this, { name: 'my_crusade' }),
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
        constants.COLLECTIONS.TEAMS
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
