import constants from './constants'
import { BattleReport, Faction, Team } from './types'
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
      const player1Data: any = await player1Ref.get();
      const player2Data: any = await player2Ref.get();
      const p1: Team = player1Data.data();
      const p2: Team = player2Data.data();

      let winnerRef: any
      let winnerData: Team
      let bgSlug: string = await getBattleGround(report.Battleground);
      let dataField: string = `WZP-${bgSlug}`
      console.log(dataField);
      if (report['Winning Team'] === report['Team 1']) {
        // PLAYER 1 WINS
        winnerRef = player1Ref
        winnerData = p1
        if (p1[dataField] >= 0) {
          p1[dataField] += 3
        } else {
          p1[dataField] = 3
        }
        if (p2[dataField] >= 0) {
          p2[dataField] += 1
        } else {
          p2[dataField] = 1
        }
      } else {
        // PLAYER 2 WINS
        winnerRef = player2Ref
        winnerData = p2
        if (p1[dataField] >= 0) {
          p1[dataField] += 1
        } else {
          p1[dataField] = 1
        }
        if (p2[dataField] >= 0) {
          p2[dataField] += 3
        } else {
          p2[dataField] = 3
        }
      }

      // Update Player 1.
      const update1: Object = {
        played: (p1['Battles Played'] && p1['Battles Played'] + 1) || 1,
      }
      update1[dataField] = p1[dataField];
      await player1Ref.update({
        ...update1
      })

      // Update Player 2
      const update2: Object = {
        played: (p2['Battles Played'] && p2['Battles Played'] + 1) || 1,
      }
      update2[dataField] = p2[dataField];

      await player2Ref.update({
       ...update2
      })

      // Update Winner.
      await winnerRef.update({
        won: (winnerData && winnerData['Battles Won'] + 1) || 1,
      })
      console.log('FIN!');
    } catch (e) {
      console.log(e);
      alert(e)
      return
    }
    commit('SET_isLoading', false)
  },
  async ACTION_updateBattleReport(
    { commit }: any,
    options: { report: BattleReport; fire: any }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    // Do some stuff
    console.log(options)
    const { report, fire } = options
    const reportsRef = fire.firestore.collection(
      constants.COLLECTIONS.BATTLEREPORTS
    )
    const teamsRef = fire.firestore.collection(
      constants.COLLECTIONS.TEAMS
    )
    try {
      // Create Battle Report.
      const brRef: any = await getBattleReport(report, reportsRef);
      console.log(brRef);
      await brRef.update({
        ...report
      })
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

const getBattleReport: any = async ( report: BattleReport, collectionRef: any ) => {
  console.log(`Finding BR ${report}`);
  let ref: any = await collectionRef.doc(report.Slug);
  let doc: any = await ref.get();
  if(!doc.exists) {
    console.log(`Can't find report!`);
  }
  return ref
}

const getBattleGround: any = async ( bg: String,) => {
  console.log(`Finding BG ${bg}`);
  bg = bg.replace(/'/, '');
  const bgArray: string[] = bg.split(' ');
  console.log(bgArray);
  for (var i = 0; i < bgArray.length; i++) { 
    bgArray[i] = bgArray[i].charAt(0).toUpperCase() + bgArray[i].substring(1);
  }
  bg = bgArray.join('');
  return bg;
}
