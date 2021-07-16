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
          <div class="user">
            {{ item['Army Name'] }}
          </div>
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
export default {
  components: {
    SignIn,
    RecycleScroller,
  },
  layout: 'strongholder',
  data() {
    return {}
  },
  computed: mapState(['user', 'creatingStrongholder', 'strongholdsList']),
  methods: {
    toggleCreating() {
      this.$store.commit('TOGGLE_creatingStrongholder')
    },
    signOut() {
      // this.$fireAuth.signOut()
      this.$fire.auth.signOut()
    },
  },
}
</script>
