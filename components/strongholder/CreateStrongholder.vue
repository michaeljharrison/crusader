<template>
  <div id="createStrongholderRoot" class="createStrongholderRoot">
    <div v-if="user" class="container">
      <a-form
        id="wf-form-create-strongholder"
        name="wf-form-create-strongholder"
        data-name="Strongholder"
        _lpchecked="1"
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 24 }"
        @submit="handleSubmit"
      >
        <h3>Army Details</h3>
        <a-form-item>
          <a-input
            id="Army Name"
            v-decorator="[
              'Army Name',
              {
                rules: [],
              },
            ]"
            placeholder="Army Name"
            maxlength="500"
            name="ArmyName"
            data-name="Army Name"
            class="textarea w-input"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-select
            v-decorator="[
              'Faction',
              {
                rules: [{ required: true, message: 'Please select a faction' }],
              },
            ]"
            placeholder="Faction"
            @change="selectFaction"
          >
            <a-select-option
              v-for="(item, key) in factionList"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select
            v-decorator="[
              'Sub Faction',
              {
                rules: [
                  { required: true, message: 'Please select a sub faction' },
                ],
              },
            ]"
            placeholder="Sub Faction"
          >
            <a-select-option
              v-for="(item, key) in subfactionList"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select
            v-decorator="[
              'Realm of Origin',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select a Realm of Origin',
                  },
                ],
              },
            ]"
            placeholder="Realm of Origin"
          >
            <a-select-option
              v-for="(item, key) in realmList"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select
            v-decorator="[
              'Starting Size',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select a Starting Size',
                  },
                ],
              },
            ]"
            placeholder="Starting Size"
          >
            <a-select-option
              v-for="(item, key) in startingSizes"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <h3>Stronghold</h3>
        <a-form-item>
          <a-input
            id="Stronghold Name"
            v-decorator="[
              'Stronghold Name',
              {
                rules: [],
              },
            ]"
            placeholder="Stronghold Name"
            maxlength="500"
            name="Stronghold Name"
            data-name="Stronghold Name"
            class="textarea w-input"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-select
            v-decorator="[
              'Type',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select a Stronghold Type',
                  },
                ],
              },
            ]"
            placeholder="Type"
          >
            <a-select-option
              v-for="(item, key) in strongholdTypes"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-input
            id="Population"
            v-decorator="[
              'Population',
              {
                rules: [],
              },
            ]"
            placeholder="Population"
            maxlength="500"
            name="Population"
            data-name="Population"
            class="textarea w-input"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            id="Barracks Built"
            v-decorator="[
              'Barracks Built',
              {
                rules: [],
              },
            ]"
            placeholder="Barracks Built"
            maxlength="500"
            name="Barracks Built"
            data-name="Barracks Built"
            class="textarea w-input"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            id="Outposts Established"
            v-decorator="[
              'Outposts Established',
              {
                rules: [],
              },
            ]"
            placeholder="Outposts Established"
            maxlength="500"
            name="Outposts Established"
            data-name="Outposts Established"
            class="textarea w-input"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            id="Region"
            v-decorator="[
              'Region',
              {
                rules: [],
              },
            ]"
            placeholder="Region"
            maxlength="500"
            name="Region"
            data-name="Region"
            class="textarea w-input"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit"> Create </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-else class="container login">
      <sign-in></sign-in>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import CONSTANTS from '@/store/constants/crusader'
export default {
  components: {},
  layout: 'strongholder',
  data() {
    const faction: string = 'Unknown'
    return {
      faction,
      factionList: CONSTANTS.FACTIONS,
      subfactionList: CONSTANTS.SUB_FACTIONS.ORDER,
      realmList: CONSTANTS.REALMS,
      startingSizes: CONSTANTS.STARTING_SIZES,
      strongholdTypes: CONSTANTS.STRONGHOLD_TYPES,
      formLayout: 'vertical',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  computed: mapState(['user', 'strongholder']),
  methods: {
    selectFaction(faction: string) {
      this.faction = faction
      this.subfactionList = CONSTANTS.SUB_FACTIONS[faction.toUpperCase()]
    },
    handleSubmit(e: Event) {
      e.preventDefault()
      this.form.validateFields(async (err: any, values: any) => {
        if (!err) {
          this.$message.loading(`Creating new Stronghold...`)
          try {
            await this.$store.dispatch('ACTION_createNewStronghold', {
              fire: this.$fire,
              sh: values,
            })
            this.$message.success(`Stronghold Created!`)
            setTimeout(() => {
              // window.location.href = 'combatLog'
            }, 0)
          } catch (e) {
            console.error(e)
            this.$message.error(
              `Warp storms have caused this stronghold to be lost!`
            )
            this.$store.commit('SET_isLoading', false)
          } finally {
            // Cleanup
          }
        }
      })
    },
  },
}
</script>
