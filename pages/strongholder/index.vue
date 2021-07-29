<template>
  <div id="strongholderRoot" class="strongholderRoot">
    <div v-if="user" class="container">
      <div
        v-if="creatingStrongholder"
        style="display: flex; flex-direction: column; width: 100%"
      >
        <CreateStrongholder> </CreateStrongholder>
        <div style="display: flex; flex-direction: row">
          <a-button type="danger" @click="toggleCreating">
            <p>Cancel</p>
          </a-button>
        </div>
      </div>
      <div
        v-else-if="activeStronghold"
        style="display: flex; flex-direction: column; width: 100%"
      >
        <ViewStronghold :stronghold="activeStronghold"></ViewStronghold>
        <div style="display: flex; flex-direction: row">
          <a-button
            type="danger"
            @click="
              () => {
                selectStronghold(null)
              }
            "
          >
            <p>Back</p>
          </a-button>
        </div>
      </div>
      <div v-else>
        <h2>Welcome {{ user.displayName }}</h2>
        <a-button class="armyCard newArmy" @click="toggleCreating">
          <a-icon type="plus-circle" />
          <p>Add New Army</p>
        </a-button>
        <RecycleScroller
          v-slot="{ item }"
          class="scroller"
          :items="strongholdsList"
          :item-size="32"
          key-field="Army Name"
        >
          <a-button
            class="armyCard newArmy"
            @click="
              () => {
                selectStronghold(item)
              }
            "
          >
            <p>{{ item['Army Name'] }}</p>
          </a-button>
        </RecycleScroller>
      </div>
    </div>
    <div v-else class="container login">
      <sign-in></sign-in>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { RecycleScroller } from 'vue-virtual-scroller'
import SignIn from '~/components/SignIn.vue'
import ViewStronghold from '~/components/strongholder/ViewStronghold.vue'
export default {
  components: {
    SignIn,
    RecycleScroller,
    ViewStronghold,
  },
  layout: 'strongholder',
  data() {
    return {}
  },
  computed: mapState([
    'user',
    'creatingStrongholder',
    'strongholdsList',
    'activeStronghold',
  ]),
  methods: {
    toggleCreating() {
      this.$store.commit('TOGGLE_creatingStrongholder')
    },
    selectStronghold(stronghold) {
      console.log(stronghold)
      this.$store.commit('SET_activeStronghold', stronghold)
    },
    signOut() {
      // this.$fireAuth.signOut()
      this.$fire.auth.signOut()
    },
  },
}
</script>
