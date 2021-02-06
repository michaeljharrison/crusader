<template>
  <div class="section-3 faction">
    <div class="div-team-container">
      <div class="div-team-left">
        <div class="div-team-header">
          <div class="div-team-name">
            <div class="div-block-18">
              <img
                loading="lazy"
                src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1a6b13eff64888ae039_Genestealer%20Cults.svg"
                alt
                class="image-5"
              />
              <h1 class="h3">{{ (faction && faction.name) || 'Loading...' }}</h1>
            </div>
            <NuxtLink class="button w-button" :to="'/factions/' + slug">SEE DETAILS</NuxtLink>
          </div>
          <h1 class="h2 fade">{{ (faction && faction.faction) || 'Loading...' }}</h1>
        </div>
        <div class="div-team-header">
          <p class="paragraph">{{ (faction && faction.summary) || 'Loading...' }}</p>
          <p
            v-if="faction.quote"
            class="paragraph qoute"
          >{{ (faction && faction.quote) || 'Loading...' }}</p>
        </div>
        <div class="table">
          <div class="tablerow">
            <div class="tablecell">
              <h1 class="h6">Played</h1>
            </div>
            <div class="tablecell">
              <h1 class="h6">Won</h1>
            </div>
          </div>
          <div class="tablerow tablerow-alt">
            <div class="tablecell">
              <h1 class="h6">{{ (faction && faction.played) || 'Loading...' }}</h1>
            </div>
            <div class="tablecell">
              <h1 class="h6">{{ (faction && faction.won) || 'Loading...' }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="div-team-right">
        <div class="div-team-image">
          <img
            loading="lazy"
            width="317"
            src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1c78244a55aa105ca7a_PXL_20210110_103304840.jpg"
            alt
            sizes="(max-width: 767px) 200px, (max-width: 991px) 300px, 400px"
            srcset="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1c78244a55aa105ca7a_PXL_20210110_103304840-p-1080.jpeg 1080w, https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1c78244a55aa105ca7a_PXL_20210110_103304840-p-1600.jpeg 1600w, https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1c78244a55aa105ca7a_PXL_20210110_103304840-p-2000.jpeg 2000w, https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1c78244a55aa105ca7a_PXL_20210110_103304840.jpg         2280w"
            class="img-team"
          />
          <h1 v-if="faction.leader" class="h5">Leader:</h1>
          <h1 v-if="faction.leader" class="h3">{{ (faction && faction.leader) || 'Loading...' }}</h1>
          <h1 v-if="faction.champion" class="h5">Champion:</h1>
          <h1 v-if="faction.champion" class="h3">{{ (faction && faction.champion) || 'Loading...' }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const slugify = require('slugify')

export default {
  props: ['faction'],
  data() {
    return { slug: slugify(this.faction.name) }
  },
}
</script>
