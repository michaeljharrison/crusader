<template>
  <div class="container">
    <div class="bigcontainer">
      <h1>New Crusade</h1>
      <div class="line"></div>
      <a-form :layout="formLayout">
        <a-form-item
          label="Form Layout"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
        </a-form-item>
        <a-form-item
          label="Field A"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input placeholder="input placeholder" />
        </a-form-item>
        <a-form-item
          label="Field B"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input placeholder="input placeholder" />
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary"> Submit </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import constants from '~/store/constants'
import { BattleReport, Faction, Team, Crusade } from '~/store/types'
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
      formLayout: 'horizontal',
    }
  },
  components: {},
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {}
    },
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
