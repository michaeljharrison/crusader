<template>
  <div class="section-3">
    <div class="div-team-container">
      <div class="div-team-left">
        <div class="div-team-header">
          <div class="div-team-name">
            <div class="div-block-18">
              <img
                loading="lazy"
                src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1a6b13eff64888ae039_Genestealer%20Cults.svg"
                alt=""
                class="image-5"
              />
              <h1 class="h1">
                {{ (team && team.Name) || 'Loading...' }}
              </h1>
            </div>
            <NuxtLink class="button w-button" :to="'/teams/' + slug"
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
import { Team } from '~/store/types';
const slugify = require('slugify')

export default {
  props: ['faction'],
  data() {

    const team: Team = this.faction;
    const factionString: String = team.Faction.replace('-',' ');
    return { slug: team.Slug, team, factionString }
  },
}
</script>
