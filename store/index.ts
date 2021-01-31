import constants from './constants'
import { BattleReport, Faction } from './types'
type vuexState = {
  isLoading: boolean
}

export const state: any = (): vuexState => ({
  isLoading: false,
})

export const mutations = {
  SET_isLoading(state: vuexState, isLoading: boolean) {
    state.isLoading = isLoading
  },
}

export const actions = {
  async ACTION_submitBattleReport(
    { commit }: any,
    options: { report: BattleReport; fire: any }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    // Do some stuff
    console.log(options)
    const { report, fire } = options
    const collectionRef = fire.firestore.collection(
      constants.COLLECTIONS.BATTLEREPORTS
    )
    const factionsRef = fire.firestore.collection(
      constants.COLLECTIONS.FACTIONS
    )
    try {
      // Create Battle Report.
      await collectionRef.add({
        createdOn: new Date(),
        ...report,
      })

      // Get both player objects.
      const player1Ref: any = await factionsRef.doc(report.player1)
      const player2Ref: any = await factionsRef.doc(report.player2)
      const player1Data: any = await player1Ref.get()
      const player2Data: any = await player2Ref.get()

      const p1WZPoints: any = player1Data.data().warzonePoints
      const p2WZPoints: any = player2Data.data().warzonePoints

      let winnerRef: any
      let winnerData: any
      if (report.winner === report.player1) {
        winnerRef = player1Ref
        winnerData = player1Data
        p1WZPoints[report.planet] += 3
        p2WZPoints[report.planet] += 1
      } else {
        winnerRef = player2Ref
        winnerData = player2Data
        p1WZPoints[report.planet] += 1
        p2WZPoints[report.planet] += 3
      }

      // Update played.

      await player1Ref.update({
        played:
          (player1Data.data().played && player1Data.data().played + 1) || 1,
        warzonePoints: p1WZPoints,
      })
      await player2Ref.update({
        played:
          (player2Data.data().played && player2Data.data().played + 1) || 1,
        warzonePoints: p2WZPoints,
      })

      // Update Winner.
      await winnerRef.update({
        won: (winnerData.data().won && winnerData.data().won + 1) || 1,
      })
    } catch (e) {
      alert(e)
      return
    }
    commit('SET_isLoading', false)
  },
}
