<template>
  <div id="createStrongholderRoot" class="createStrongholderRoot">
    <div v-if="user" class="container">
      <a-alert v-if="hasEdited" message="Warning" type="warning" show-icon>
        <div slot="description" class="alertDescription">
          <p>You have unsaved changes on your stronghold!</p>
          <a-button type="primary" @click="saveChanges">Save</a-button>
        </div>
      </a-alert>
      <h4>
        <i
          >{{ stronghold['Sub Faction'] }} of
          {{ stronghold['Realm of Origin'] }}</i
        >
      </h4>
      <h2>{{ stronghold['Army Name'] }}</h2>
      <div class="armyDetails">
        <div class="row">
          <p class="label">
            <b>Size: </b>
          </p>
          <a-select
            :default-value="stronghold['Starting Size']"
            @change="
              (e) => {
                setStrongholdValue(e, 'Starting Size')
              }
            "
          >
            <a-select-option
              v-for="(item, key) in startingSizes"
              :key="key"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <h3>Quests</h3>
          <div class="row">
            <p class="label">
              <b>Current Quest </b>
            </p>
            <a-input
              class="value"
              :default-value="stronghold['Current Quest']"
              placeholder="Enter your first quest"
              @change="
                (e) => {
                  setStrongholdValue(e.target.value, 'Current Quest')
                }
              "
            ></a-input>
          </div>
          <div class="row">
            <p class="label">
              <b>Reward </b>
            </p>
            <a-input
              class="value"
              placeholder="Reward?"
              :default-value="stronghold['Reward']"
              @change="
                (e) => {
                  setStrongholdValue(e.target.value, 'Reward')
                }
              "
            ></a-input>
          </div>
          <div class="row">
            <p class="label">
              <b>Progress </b>
            </p>
            <a-input
              class="value"
              placeholder="Progress?"
              :default-value="stronghold['Progress']"
              @change="
                (e) => {
                  setStrongholdValue(e.target.value, 'Progress')
                }
              "
            ></a-input>
          </div>
        </div>
        <div class="section">
          <h3>Achievements</h3>
          <div class="row">
            <p class="label">
              <b>Battles Fought </b>
            </p>
            <a-input-number
              class="value"
              :default-value="stronghold['Battles Fought']"
              placeholder="0"
              @change="
                (e) => {
                  setStrongholdValue(e, 'Battles Fought')
                }
              "
            ></a-input-number>
          </div>
          <div class="row">
            <p class="label">
              <b>Battles Won </b>
            </p>
            <a-input-number
              class="value"
              placeholder="0"
              :default-value="stronghold['Battles Won']"
              @change="
                (e) => {
                  setStrongholdValue(e, 'Battles Won')
                }
              "
            ></a-input-number>
          </div>
          <div class="row">
            <p class="label">
              <b>Quests Completed</b>
            </p>
            <a-input-number
              class="value"
              placeholder="0"
              :default-value="stronghold['Quests Completed']"
              @change="
                (e) => {
                  setStrongholdValue(e, 'Quests Completed')
                }
              "
            ></a-input-number>
          </div>
          <div class="row">
            <p class="label">
              <b>Heroes Slain</b>
            </p>
            <a-input-number
              class="value"
              placeholder="0"
              :default-value="stronghold['Heroes Slain']"
              @change="
                (e) => {
                  setStrongholdValue(e, 'Heroes Slain')
                }
              "
            ></a-input-number>
          </div>
        </div>
        <div class="section">
          <h3>Stronghold</h3>
          <div class="row">
            <p class="label">
              <b>Name </b>
            </p>
            <a-input
              class="value"
              placeholder="Stronghold Name"
              :default-value="stronghold['Stronghold Name']"
              @change="
                (e) => {
                  setStrongholdValue(e.target.value, 'Stronghold Name')
                }
              "
            ></a-input>
          </div>
          <div class="row">
            <p class="label">
              <b>Type </b>
            </p>
            <a-select
              class="value"
              :default-value="stronghold['Type']"
              @change="
                (e) => {
                  setStrongholdValue(e, 'Type')
                }
              "
            >
              <a-select-option
                v-for="(item, key) in strongholdTypes"
                :key="key"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
          <div class="row">
            <p class="label">
              <b>Barracks</b>
            </p>
            <a-input-number
              class="value"
              placeholder="0"
              :default-value="stronghold['Barracks']"
              @change="
                (e) => {
                  setStrongholdValue(e, 'Barracks')
                }
              "
            ></a-input-number>
          </div>
          <div class="row">
            <p class="label">
              <b>Heroes Slain</b>
            </p>
            <a-input-number
              class="value"
              placeholder="0"
              :default-value="stronghold['Heroes Slain']"
              @change="
                (e) => {
                  setStrongholdValue(e, 'Heroes Slain')
                }
              "
            ></a-input-number>
          </div>
        </div>
        <div class="section">
          <Territories :stronghold="currentStronghold" />
        </div>
        <div class="section">
          <OrderOfBattle :stronghold="currentStronghold" />
        </div>
      </div>
      <div class="data">
        <h3>Stronghold Data:</h3>
        <VueJsonPretty :data="stronghold" show-length> </VueJsonPretty>
      </div>
    </div>
    <div v-else class="container login">
      <sign-in></sign-in>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import CONSTANTS from '@/store/constants/crusader'
import Territories from '@/components/strongholder/Territories.vue'
import OrderOfBattle from '@/components/strongholder/OrderOfBattle.vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  components: {
    Territories,
    OrderOfBattle,
    VueJsonPretty,
  },
  props: ['stronghold'],
  data() {
    return {
      currentStronghold: { ...this.stronghold },
      startingSizes: CONSTANTS.STARTING_SIZES,
      strongholdTypes: CONSTANTS.STRONGHOLD_TYPES,
      hasEdited: false,
    }
  },
  computed: mapState(['user']),
  methods: {
    setStrongholdValue(value: string, field: string) {
      this.currentStronghold[field] = value
      this.hasEdited = true
    },
    async saveChanges() {
      console.log(this.currentStronghold)
      try {
        await this.$store.dispatch('ACTION_saveStronghold', {
          stronghold: this.currentStronghold,
        })
        this.$message.success(`Stronghold Changes Saved!`)
        this.hasEdited = false
      } catch (e) {
        console.error(e)
        this.$message.error(
          `Your changes have been lost in between the realms! Sorry!`
        )
        this.$store.commit('SET_isLoading', false)
      }
    },
  },
}
</script>

<style lang="scss">
.armyDetails {
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 450px;
    .label {
      width: 150px;
    }
    .value {
      width: 275px;
    }
  }
}
</style>
