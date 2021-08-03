<template>
  <div sclass="text-center">
    <h1>
      Welcome <span v-if="currentUser">{{ currentUser.displayName }}</span>
    </h1>
  </div>
</template>

<script>
// import SignIn from '~/components/SignIn.vue'

export default {
  components: {
    // SignIn,
  },
  computed: {
    currentUser() {
      return this.$store.state.user
    },
  },
  methods: {
    signOut() {
      console.log('signOut')
      // this.$fireAuth.signOut()
      this.$fire.auth.signOut()
    },
  },
}
</script>

<style></style>
