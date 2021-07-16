<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }"
  >
    <h2>Please Log In</h2>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebaseui/dist/firebaseui.css'
// import firebaseui from 'firebaseui'

export default {
  mounted() {
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    const config = {
      signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // this.$fireAuthObj.GoogleAuthProvider.PROVIDER_ID
        this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/',
      // tosUrl: '/tos',
      // privacyPolicyUrl: '/privacy',
      callbacks: {
        signInSuccessWithAuthResult() {
          console.log('signInSuccessWithAuthResult')
        },
        uiShown() {
          console.log('uiShown')
        },
      },
    }

    ui.start('#firebaseui-auth-container', config)
  },
}
</script>
