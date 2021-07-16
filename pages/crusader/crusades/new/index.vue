<template>
  <div class="bigcontainer light">
    <h1 class="h1">Begin your Crusade</h1>
    <div class="line"></div>
    <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
      <a-form-item
        label="Player Name"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'Player',
            {
              rules: [{ required: true, message: 'Who is your general?' }],
            },
          ]"
          placeholder="Bam Everyman"
        />
      </a-form-item>
      <a-form-item
        label="Faction Name"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'Name',
            {
              rules: [
                {
                  required: true,
                  message: 'What name flies on your banner?',
                },
                {
                  validator: factionNameValidator,
                },
              ],
            },
          ]"
          placeholder="Mighty Ducks"
        />
      </a-form-item>
      <a-form-item
        label="Faction"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          v-decorator="[
            'Faction',
            {
              rules: [{ required: true, message: 'Whom do you fight for?' }],
            },
          ]"
          style="width: 120px"
          placeholder="Choose your Loyalty"
        >
          <a-select-option
            v-for="(item, key) in factionOptions"
            :key="key"
            :value="item.slug"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import constants from '~/store/constants'
import { BattleReport, Faction, Team, Crusade } from '~/store/types'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

export default {
  components: {},
  props: ['faction'],
  async asyncData({ params }) {
    const name = params.name
    return { name }
  },
  data() {
    const name: String = this.name
    const loading: boolean = true
    const crusade: Crusade | null = null
    const factionOptions: String[] = []
    return {
      name,
      crusade,
      loading,
      formLayout: 'horizontal',
      factionOptions,
      hasErrors,
      form: this.$form.createForm(this, { name: 'new_crusade' }),
    }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'vertical'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {}
    },
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err: any, values: any) => {
        if (!err) {
          this.$message.loading(`Creating new faction...`)
          try {
            await this.$store.dispatch('ACTION_createNewFaction', {
              fire: this.$fire,
              faction: values,
            })
            this.$message.success(`Crusade Created!`)
            setTimeout(() => {
              // window.location.href = 'combatLog'
            }, 0)
          } catch (e) {
            console.error(e)
            this.$message.error(
              `Warp storms have caused this crusade to be lost!`
            )
            this.$store.commit('SET_isLoading', false)
          } finally {
            // Cleanup
          }
        }
      })
    },
    async factionNameValidator(rule, value, callback) {
      try {
        if (!value) return true
        value = _.lowerCase(value).replaceAll(' ', '-')

        // Check if faction name already exists.
        const crusadesRef = this.$fire.firestore.collection(
          constants.COLLECTIONS.TEAMS
        )
        const ref = await crusadesRef.doc(value)
        if (!ref) {
          console.log('Could not load existing faction names.')
          throw new Error('Failed to commune with machine spirits.')
        }
        const snapshot = await ref.get()
        if (snapshot.exists) throw new Error('Faction Name is already taken.')

        return true
      } catch (err) {
        callback(err)
      }
    },
    async fetchData() {
      const vm = this
      this.error = this.post = null
      vm.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const crusadesRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.CONSTANTS
      )

      try {
        const ref = await crusadesRef.doc(
          constants.CONSTANTS_DOCUMENTS.FACTION_OPTIONS
        )
        if (!ref) {
          console.log('No Faction options exist.')
          return
        }
        const snapshot = await ref.get()
        const factionsData = await snapshot.data()
        const factions = []
        factionsData.options.forEach((element) => {
          factions.push({
            slug: element,
            label: _.startCase(element.split('-')),
          })
        })
        console.log(factions)
        vm.factionOptions = factions
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
