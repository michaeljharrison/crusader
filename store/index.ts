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
    const teamsRef = fire.firestore.collection(
      constants.COLLECTIONS.TEAMS
    )
    try {
      // Create Battle Report.
      await collectionRef.add({
        createdOn: new Date(),
        ...report,
      })

      // Get both player objects.
      const player1Ref: any = await getFaction(report['Team 1'].toLowerCase().replace(/ /g, '-',).replace(/'/g, ''), teamsRef)
      const player2Ref: any = await getFaction(report['Team 2'].toLowerCase().replace(/ /g, '-').replace(/'/g, ''), teamsRef)
      console.log(player1Ref);
      console.log(player2Ref);
      const player1Data: any = await player1Ref.get();
      const player2Data: any = await player2Ref.get();
      console.log(player1Data);
      console.log(player2Data);
      const p1 = player1Data.data();
      const p2 = player2Data.data();

      // console.log(player1Data);
      const p1WZPoints: any = p1.warzonePoints || {}
      const p2WZPoints: any = p2.warzonePoints || {}

      let winnerRef: any
      let winnerData: any
      if (report['Winning Team'] === report['Team 1']) {
        // PLAYER 1 WINS
        winnerRef = player1Ref
        winnerData = p1
        if (p1WZPoints[report.Battleground] >= 0) {
          p1WZPoints[report.Battleground] += 3
        } else {
          p1WZPoints[report.Battleground] = 3
        }
        if (p2WZPoints[report.Battleground] >= 0) {
          p2WZPoints[report.Battleground] += 1
        } else {
          p2WZPoints[report.Battleground] = 1
        }
      } else {
        // PLAYER 2 WINS
        winnerRef = player2Ref
        winnerData = p2
        if (p1WZPoints[report.Battleground] >= 0) {
          p1WZPoints[report.Battleground] += 1
        } else {
          p1WZPoints[report.Battleground] = 1
        }
        if (p2WZPoints[report.Battleground] >= 0) {
          p2WZPoints[report.Battleground] += 3
        } else {
          p2WZPoints[report.Battleground] = 3
        }
      }

      // Update played.

      await player1Ref.update({
        played:
          (p1.played && p1.played + 1) || 1,
        warzonePoints: p1WZPoints,
      })
      await player2Ref.update({
        played:
          (p2.played && p2.played + 1) || 1,
        warzonePoints: p2WZPoints,
      })

      // Update Winner.
      await winnerRef.update({
        won: (winnerData.won && winnerData.won + 1) || 1,
      })
      console.log('FIN!');
    } catch (e) {
      console.log(e);
      alert(e)
      return
    }
    commit('SET_isLoading', false)
  },
}

const getFaction: any = async (name: string, collectionRef: any) => {
  console.log(`Finding faction ${name}`);
  let ref: any = await collectionRef.doc(name)
  let doc: any = await ref.get();
  if (!doc.exists) {
    // Try lower case.
    console.log('Cant find doc, trying lower case');
    doc = await collectionRef.doc(name.toLowerCase())
  }
  if (!doc.exists) {
    // Try upper case.
    console.log('Cant find doc, trying upper case');
    doc = await collectionRef.doc(name.toUpperCase())
  }
  return ref
}
