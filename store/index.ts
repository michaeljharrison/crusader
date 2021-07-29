import _ from 'lodash'
import { createLogger } from 'vuex'
import constants from './constants'
import {
  BattleReport,
  Crusade,
  Faction,
  Team,
  Unit,
  Strongholder,
} from './types'

export const plugins = [createLogger()]

type vuexState = {
  isLoading: boolean
  user: any
  creatingStrongholder: boolean
  newStrongholder: Strongholder | Object
  strongholdsList: Array<Strongholder>
  activeStronghold: Strongholder | null
}

export const state: any = (): vuexState => ({
  isLoading: false,
  user: false,
  creatingStrongholder: false,
  newStrongholder: {},
  strongholdsList: [],
  activeStronghold: null,
})

export const mutations = {
  SET_isLoading(state: vuexState, isLoading: boolean) {
    state.isLoading = isLoading
  },
  SET_strongholdsList(state: vuexState, newList: Array<Strongholder>) {
    state.strongholdsList = newList
  },
  ADD_strongholdsList(state: vuexState, newStronghold: Strongholder) {
    state.strongholdsList.push(newStronghold)
  },
  SET_activeStronghold(state: vuexState, stronghold: Strongholder | null) {
    state.activeStronghold = stronghold
  },
  TOGGLE_creatingStrongholder(state: vuexState) {
    state.creatingStrongholder = !state.creatingStrongholder
  },
  SET_authState: (state, { authUser, claims }) => {
    if (authUser) {
      state.user = {
        uid: authUser.uid,
        // email: authUser.email,
        displayName: authUser.displayName,
      }
    } else {
      state.user = false
    }
  },
  SET_updateStronghold: (state: vuexState, { activeIndex, stronghold }) => {
    console.log('Updating Stronghold!')
    state.strongholdsList[activeIndex] = stronghold
  },
}

export const actions = {
  ACTION_createNewStronghold(
    { commit, state }: any,
    options: { sh: Strongholder; fire: any }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    const { sh } = options
    // Store strongholder in local storage:
    console.log(state)
    if (state.strongholdsList) {
      commit('ADD_strongholdsList', sh)
    } else {
      commit('SET_strongholdsList', [sh])
    }

    /* 
    FIRESTORE USAGE
    const { sh, fire }    = options
    const collectionRef = fire.firestore.collection(
      constants.COLLECTIONS.STRONGHOLDER
    )
    try {
      // Create Battle Report.
      const now = new Date(Date.now())
      await collectionRef.add({
        'Created On': `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}`,
        ...sh,
      })

    } catch (e) {
      console.error(e)
      return
    } */
    commit('SET_isLoading', false)
  },
  ACTION_saveStronghold({ commit, state }: any, options: { stronghold: any }) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    const { stronghold } = options
    const activeIndex = _.findIndex(state.strongholdsList, {
      'Army Name': stronghold['Army Name'],
    })
    // Apply edits to selected stronghold.
    commit('SET_updateStronghold', { stronghold, activeIndex })
  },
  async ACTION_submitBattleReport(
    { commit }: any,
    options: { report: BattleReport; fire: any }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    // Do some stuff
    const { report, fire } = options
    const collectionRef = fire.firestore.collection(
      constants.COLLECTIONS.BATTLEREPORTS
    )
    const teamsRef = fire.firestore.collection(constants.COLLECTIONS.TEAMS)
    try {
      // Create Battle Report.
      const now = new Date(Date.now())
      await collectionRef.add({
        'Created On': `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}`,
        ...report,
        Disabled: true,
      })

      // Get both player objects.
      const player1Ref: any = await getFaction(
        report['Team 1'].toLowerCase().replace(/ /g, '-').replace(/'/g, ''),
        teamsRef
      )
      const player2Ref: any = await getFaction(
        report['Team 2'].toLowerCase().replace(/ /g, '-').replace(/'/g, ''),
        teamsRef
      )
      const player1Data: any = await player1Ref.get()
      const player2Data: any = await player2Ref.get()
      const p1: Team = player1Data.data()
      const p2: Team = player2Data.data()

      let winnerRef: any
      let winnerData: Team
      const bgSlug: string = await getBattleGround(report.Battleground)
      const dataField: string = `WZP-${bgSlug}`
      const wzpValue1 = parseInt(p1[dataField]) || 0
      const wzpValue2 = parseInt(p2[dataField]) || 0

      if (report['Winning Team'] === report['Team 1']) {
        // PLAYER 1 WINS
        winnerRef = player1Ref
        winnerData = p1
        p1[dataField] = wzpValue1 + 3
        p2[dataField] = wzpValue2 + 1
      } else if (report['Winning Team'] === report['Team 2']) {
        // PLAYER 2 WINS
        winnerRef = player2Ref
        winnerData = p2
        p1[dataField] = wzpValue1 + 1
        p2[dataField] = wzpValue2 + 3
      } else {
        p1[dataField] = wzpValue1 + 1
        p2[dataField] = wzpValue2 + 1
      }

      // Update Player 1.
      const update1: Object = {
        'Battles Played':
          (parseInt(p1['Battles Played']) &&
            parseInt(p1['Battles Played']) + 1) ||
          1,
      }
      update1[dataField] = p1[dataField]
      await player1Ref.update({
        ...update1,
      })

      // Update Player 2
      const update2: Object = {
        played:
          (parseInt(p2['Battles Played']) &&
            parseInt(p2['Battles Played']) + 1) ||
          1,
      }
      update2[dataField] = p2[dataField]

      await player2Ref.update({
        ...update2,
      })

      if (report['Winning Team'] === 'draw') {
      } else {
        // Update Winner.
        await winnerRef.update({
          won: (winnerData && parseInt(winnerData['Battles Won']) + 1) || 1,
        })
      }
    } catch (e) {
      console.error(e)
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
    const { report, fire } = options
    const reportsRef = fire.firestore.collection(
      constants.COLLECTIONS.BATTLEREPORTS
    )
    const teamsRef = fire.firestore.collection(constants.COLLECTIONS.TEAMS)
    try {
      // Get Battle Report.
      const brRef: any = await getBattleReport(report, reportsRef)
      await brRef.update({
        ...report,
      })
    } catch (e) {
      console.log(e)
      alert(e)
      return
    }
    commit('SET_isLoading', false)
  },
  async ACTION_likeBattleReport(
    { commit }: any,
    options: { report: BattleReport; newLikes: number; fire: any }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    const { report, fire, newLikes } = options
    const reportsRef = fire.firestore.collection(
      constants.COLLECTIONS.BATTLEREPORTS
    )
    try {
      const brRef: any = await getBattleReport(report, reportsRef)
      await brRef.update({
        Likes: newLikes,
      })
    } catch (e) {
      alert(e)
      return
    }
    commit('SET_isLoading', false)
  },
  async ACTION_createNewFaction(
    { commit }: any,
    options: { faction: any; fire: any }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    // Do some stuff
    const { faction, fire } = options
    const teamsRef = fire.firestore.collection(constants.COLLECTIONS.TEAMS)
    try {
      // Create Battle Report.
      const now = new Date(Date.now())
      faction.Name = _.lowerCase(faction.Name).replaceAll(' ', '-')
      const newCrusade: Crusade = {
        'Created On': `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}`,
        Battles: 0,
        Won: 0,
        Supply: 0,
        SupplyUsed: 0,
        Requisition: 0,
        RequisitionUsed: 0,
        OrderOfBattle: [],
        ...faction,
      }
      await teamsRef.doc(faction.Name).set(newCrusade)
    } catch (error) {
      console.error(error)
      return
    }
    commit('SET_isLoading', false)
  },
  async ACTION_createNewUnit(
    { commit }: any,
    options: { unit: Unit; fire: any; crusade: Crusade }
  ) {
    commit('SET_isLoading', true) // Start proving (lock UI)
    // Do some stuff
    const { crusade, fire, unit } = options
    const teamsRef = fire.firestore.collection(constants.COLLECTIONS.TEAMS)
    try {
      // Create The Unit
      const now = new Date(Date.now())
      const newUnit: Unit = {
        Created: `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}`,
        ...unit,
      }

      // First fetch the correct team.
      const teamRef = await teamsRef.doc(crusade.Name)
      const team = await teamRef.get()
      const teamData = await team.data()
      console.log(teamData)
      console.log(constants.COLLECTIONS.ORDER_OF_BATTLE)
      teamData[constants.COLLECTIONS.ORDER_OF_BATTLE].push(newUnit)
      await teamRef.set(teamData)
    } catch (error) {
      console.error(error)
      return
    }
    commit('SET_isLoading', false)
  },
}

const getFaction: any = async (name: string, collectionRef: any) => {
  const ref: any = await collectionRef.doc(name)
  let doc: any = await ref.get()
  if (!doc.exists) {
    // Try lower case.
    console.log('Cant find doc, trying lower case')
    doc = await collectionRef.doc(name.toLowerCase())
  }
  if (!doc.exists) {
    // Try upper case.
    console.log('Cant find doc, trying upper case')
    doc = await collectionRef.doc(name.toUpperCase())
  }
  return ref
}

const getBattleReport: any = async (
  report: BattleReport,
  collectionRef: any
) => {
  console.log(`Finding BR ${report}`)
  const ref: any = await collectionRef.doc(report.Slug)
  const doc: any = await ref.get()
  if (!doc.exists) {
    console.log(`Can't find report!`)
  }
  return ref
}

export const getBattleGround: any = async (bg: String) => {
  bg = bg.replace(/'/, '')
  const bgArray: string[] = bg.split(' ')
  for (let i = 0; i < bgArray.length; i++) {
    bgArray[i] = bgArray[i].charAt(0).toUpperCase() + bgArray[i].substring(1)
  }
  bg = bgArray.join('')
  return bg
}
