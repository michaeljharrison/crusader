<template>
  <div class="TeamIcon">
    <AdMech v-if="team === CONSTANTS.TEAMS.THEOMNISSIAHSEXPLORATOR || team === CONSTANTS.TEAMS.MECHANICUS"/>
    <BloodAngels v-if="team === CONSTANTS.TEAMS.BLOODANGELS"/>
    <Chaos v-if="team === CONSTANTS.TEAMS.HEARDSOFTHEWRITHINGNIGHT || team === CONSTANTS.TEAMS.CHAOS"/>
    <DarkAngels v-if="team === CONSTANTS.TEAMS.DARKANGELS"/>
    <Drukhari v-if="team === CONSTANTS.TEAMS.THEGAVINIUSKABAL"/>
    <Eldar v-if="team === CONSTANTS.TEAMS.THEUNKNOWNCRAFTWORLD"/>
    <GenestealerCults v-if="team === CONSTANTS.TEAMS.CULTOFTHELIGHTNINGEATERS"/>
    <MortariansAnvil v-if="team === CONSTANTS.TEAMS.DEATHGUARD"/>
    <Necron v-if="team === CONSTANTS.TEAMS.NECRON || team === CONSTANTS.TEAMS.TAMREKHDYNASTY || team === CONSTANTS.TEAMS.NARTEKHDYNASTY"/>
    <Orcs v-if="team === CONSTANTS.TEAMS.THEGREATGREENWAAH"/>
    <TempestLegion v-if="team === CONSTANTS.TEAMS.TEMPESTLEGION"/>
  </div>
</template>

<script lang="ts">
import AdMech from '~/assets/icons/Adeptus Mechanicus.svg?inline';
import Astartes from '~/assets/icons/Astartes.svg?inline';
import BloodAngels from '~/assets/icons/Blood Angels.svg?inline';
import Chaos from '~/assets/icons/Chaos.svg?inline';
import Custodes from '~/assets/icons/Custodes.svg?inline';
import DarkAngels from '~/assets/icons/Dark Angels.svg?inline';
import DeathGuard from '~/assets/icons/Death Guard.svg?inline';
import Drukhari from '~/assets/icons/Drukhari.svg?inline';
import Eldar from '~/assets/icons/Eldar.svg?inline';
import GenestealerCults from '~/assets/icons/Genestealer Cults.svg?inline';
import MortariansAnvil from '~/assets/icons/Mortarian\'s Anvil.svg?inline';
import Necron from '~/assets/icons/Necron.svg?inline';
import Orks from '~/assets/icons/Orks.svg?inline';
import TempestLegion from '~/assets/icons/Tempest Legion.svg?inline';
import Ultramarines from '~/assets/icons/Ultramarines.svg?inline';
import CONSTANTS from '~/store/constants';
const teamSlug: string = null;
export default {
  props: ['teamSlug'],
  components: {
    AdMech, Astartes, BloodAngels, Chaos, Custodes, DarkAngels, DeathGuard, Drukhari, Eldar, GenestealerCults, MortariansAnvil,Necron,Orks,TempestLegion,Ultramarines
  },
  data() {
    const team: string = this.teamSlug
    return {
      team,
      CONSTANTS
    }
  }
}
</script>