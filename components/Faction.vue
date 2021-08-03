<template>
  <div class="section-3">
    <div class="div-team-container">
      <div class="div-team-left">
        <div class="div-team-header">
          <div class="div-team-name">
            <div class="div-block-18">
              <TeamIcon :team-slug="team.Slug" />
              <h1 class="h1" :style="color">
                {{ (team && team.Name) || 'Loading...' }}
              </h1>
            </div>
            <NuxtLink class="button w-button" :to="'/crusader/teams/' + slug"
              >SEE DETAILS</NuxtLink
            >
          </div>
          <h1 class="h3 fade">
            {{ (team && factionString) || 'Loading...' }}
          </h1>
        </div>
        <div class="div-team-header">
          <p class="paragraph">
            {{ (team && team.Flavour) || 'Loading...' }}
          </p>
          <p v-if="team.FlavourQoute" class="paragraph qoute">
            {{ (team && team.FlavourQoute) || 'Loading...' }}
          </p>
        </div>
        <div class="table">
          <div class="tablerow">
            <div class="tablecell"><h1 class="h6">Played</h1></div>
            <div class="tablecell"><h1 class="h6">Won</h1></div>
          </div>
          <div class="tablerow tablerow-alt">
            <div class="tablecell">
              <h1 class="h6">
                {{ (team && team['Battles Played']) || 'Loading...' }}
              </h1>
            </div>
            <div class="tablecell">
              <h1 class="h6">
                {{ (team && team['Battles Won']) || 'Loading...' }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="div-team-right">
        <div class="div-team-image">
          <img
            loading="lazy"
            width="317"
            :src="team.FeaturePhoto"
            alt=""
            sizes="(max-width: 767px) 200px, (max-width: 991px) 300px, 400px"
            :srcset="team.Gallery"
            class="img-team"
          />
          <h1 v-if="team.Leader" class="h5">Leader:</h1>
          <h1 v-if="team.Leader" class="h3">
            {{ (team && team.Leader) || 'Loading...' }}
          </h1>
          <h1 v-if="team" class="h5">Champion:</h1>
          <h1 v-if="team['Crusade Champion']" class="h3">
            {{ (team && team['Crusade Champion']) || 'Loading...' }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Team } from '~/store/types'
import TeamIcon from '~/components/TeamIcon.vue'
const slugify = require('slugify')

export default {
  components: {
    TeamIcon,
  },
  props: ['faction'],
  data() {
    const team: Team = this.faction
    const color: String = `color: ${team.TeamColor}`
    const factionString: String = team.Faction.replaceAll('-', ' ')
    return { slug: team.Slug, team, factionString, color }
  },
}
</script>
