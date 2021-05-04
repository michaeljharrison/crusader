<template>
  <div class="container">
    <div class="bigcontainer light">
      <h1 class="h1">{{ crusade && crusade.Name.replaceAll('-', ' ') }}</h1>
      <h2 class="h2">{{ crusade && crusade.Faction.replaceAll('-', ' ') }}</h2>
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item label="Battles">
              <a-input
                id="battles"
                v-decorator="[
                  'battles',
                  {
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
                placeholder="0"
                name="battles"
                data-name="battles"
                class="w-input"
                type="number"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Won">
              <a-input
                id="won"
                v-decorator="[
                  'won',
                  {
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
                placeholder="0"
                name="won"
                data-name="won"
                class="w-input"
                type="number"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="Supply">
              <a-input
                id="supply"
                v-decorator="[
                  'supply',
                  {
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
                placeholder="0"
                name="supply"
                data-name="supply"
                class="w-input"
                type="number"
            /></a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Used">
              <a-input
                id="supplyUsed"
                v-decorator="[
                  'supplyUsed',
                  {
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
                placeholder="0"
                name="supplyUsed"
                data-name="supplyUsed"
                class="w-input"
                type="number"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="Req.">
              <a-input
                id="req"
                v-decorator="[
                  'req',
                  {
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
                placeholder="0"
                name="req"
                data-name="req"
                class="w-input"
                type="number"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Used">
              <a-input
                id="reqUsed"
                v-decorator="[
                  'reqUsed',
                  {
                    rules: [
                      { required: true, message: 'Please input your note!' },
                    ],
                  },
                ]"
                placeholder="0"
                name="reqUsed"
                data-name="reqUsed"
                class="w-input"
                type="number"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :columns="columnsOOB"
        :data-source="crusade && crusade[constants.COLLECTIONS.ORDER_OF_BATTLE]"
        :loading="loading"
      >
        <NuxtLink
          slot="Name"
          slot-scope="Name, record"
          :to="'/combatLog/' + record.Slug"
          >{{ Name || 'UNAMED BATTLE' }}</NuxtLink
        >
        <span slot="Date" slot-scope="Date, record">{{
          record['Created On']
        }}</span>
      </a-table>
      <a-button type="primary" block @click="showDrawer"> New </a-button>
      <NewUnit
        :visible="drawerVisible"
        :close="onClose"
        :crusade="crusade"
      ></NewUnit>
    </div>
  </div>
</template>

<script lang="ts">
import constants from '~/store/constants'
import NewUnit from '~/components/NewUnit.vue'
import { Crusade, Unit } from '~/store/types'

const columnsOOB = [
  {
    title: 'Unit',
    key: 'Unit',
    dataIndex: 'Unit',
    scopedSlots: { customRender: 'Unit' },
    // defaultSortOrder: 'descend',
    sorter: (a: Unit, b: Unit) => a.Name > b.Name,
  },
  {
    title: 'Type',
    key: 'Type',
    dataIndex: 'Type',
    scopedSlots: { customRender: 'Type' },
    // defaultSortOrder: 'descend',
    sorter: (a: Unit, b: Unit) => a.Type > b.Type,
  },
  {
    title: 'Division',
    key: 'Division',
    dataIndex: 'Division',
    scopedSlots: { customRender: 'Division' },
    // defaultSortOrder: 'descend',
    sorter: (a: Unit, b: Unit) => a.Division > b.Division,
  },
  {
    title: 'PL',
    key: 'Power',
    dataIndex: 'Power',
    sorter: (a: Unit, b: Unit) => a.Power > b.Power,
  },
  {
    title: 'CP',
    key: 'CP',
    dataIndex: 'CP',
    sorter: (a: Unit, b: Unit) => a.CP > b.CP,
  },
]

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

export default {
  components: {
    NewUnit,
  },
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
      constants,
      crusade,
      loading,
      drawerVisible: false,
      hasErrors,
      columnsOOB,
      form: this.$form.createForm(this, { name: 'my_crusade' }),
    }
  },
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
    async handleSubmit() {
      return true
    },
    showDrawer() {
      console.log('a')
      this.drawerVisible = true
    },
    onClose() {
      this.drawerVisible = false
    },
  },
}
</script>

<style lang="scss">
.ant-table-wrapper {
  padding: 0px;
}
.container {
  background-color: white !important;
  background-image: radial-gradient(
    circle farthest-corner at 50% 100%,
    #7b857c,
    #b2c1b4 21%,
    #fff
  );
}
</style>
