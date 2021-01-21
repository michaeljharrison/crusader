export const state: any = () => ({
  /*   isLoading: false,        // For loading spinners and buttons. */
})

export const mutations = {
  /*   SET_isLoading(state: State, isLoading: boolean) {
    state.isLoading = isLoading
  }, */
}

export const actions = {
  // Action to prove a file along with a note using Proofable.
  /*  async ACTION_startProving(
    { commit }: any,
    options: { note: String; base64File: String; fileName: String }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    const { note, base64File, fileName } = options
    // Our proof takes the form of an array of key values.
    const data = JSON.stringify({
      items: [
        { key: 'fileName', value: fileName },
        { key: 'note', value: note },
        { key: 'base64', value: base64File },
      ],
    })
    // Setup our REST call (POST)
    const config = {
      method: 'post',
      url: 'https://api.proofable.io/rest/prove',
      headers: {
        Authorization: `Bearer ${myApiToken}`,
        'Content-Type': 'application/json',
      },
      data,
    }
    // Make the call.
    const proof = await this.$axios(config)
    // Set our state to reflect in the UI.
    commit('SET_currentProof', proof.data.proof)
    commit('SET_isLoading', false)
  }, */
}
