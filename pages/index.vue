<template>
  <div class="container">
    <div class="carouselContainer">
      <div class="sliderblock">
        <div
          data-delay="10000"
          data-animation="slide"
          data-autoplay="1"
          data-easing="ease-in-out"
          data-duration="500"
          data-infinite="1"
          class="slider w-slider"
          role="region"
          aria-label="carousel"
        >
          <a-carousel autoplay class="w-slider-mask">
            <img v-for="(item, key) in images" :key="key" :src="item" />
          </a-carousel>
        </div>
      </div>
    </div>
    <div class="sectionmain">
      <div class="div-block">
        <img
          src="https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffd013fc61ef58a0f613cc2_Webclip.png"
          loading="lazy"
          alt=""
          class="icon-big"
        />
        <h1 class="h1">The Telemon Campaign</h1>
        <h1 class="h2">a warhammer 40,000 crusade</h1>
        <p class="paragraph">
          As war rages across the galaxy, a
          <strong>strange, powerful energy signal </strong>is detected by
          Imperium astropaths in the <strong>Telemon </strong>system. Telemon is
          dangerously close to a number of Imperial outposts, and a threat from
          that system is an unacceptable risk. A small Astra Militarum fleet is
          sent to investigate the signal, discover the source, and destroy any
          threats they might find. Upon entering the system, contact is
          immediately lost. Hours later, a single message is received via
          long-range communications...<br />
        </p>
        <p class="paragraph">
          Shortly after the signal is received, the mysterious energy reading
          vanishes. The Eternal Fire appears to have succeeded. Not wasting any
          time, the Imperium deploys additional assets to the Telemon system.<br /><br />However,
          Mankind are not the only ones to have detected the signal. In a nearby
          system, an ancient Necron tomb awakens, inexplicably drawn to the
          mysterious anomoly. Likewise, on the planet Kjelstan, a dormant
          Genestealer Cult awakens from their slumber, sensing an opportunity to
          spread their infection to those who seek the energy source.<br /><br />Whether
          they are Xenos or Man, any faction close enough to detect the signal
          is sure to investigate. And as is always the case in the 41st
          Millenium, that can mean only war.<br />
        </p>
        <div class="line"></div>
        <div class="stack">
          <div class="half">
            <h2 class="h2">Transmissions & Recordings</h2>
            <a-timeline>
              <LoreFragment
                v-for="(item, key) in loreFragments"
                :key="key"
                :fragment="item"
              ></LoreFragment>
            </a-timeline>
          </div>
          <div class="half 2">
            <h2 class="h2">Combat Reports</h2>
            <a-timeline>
              <BattleReport
                v-for="(item, key) in battleReports"
                :key="key"
                :fragment="item"
              ></BattleReport> </a-timeline
            >3
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import constants from '~/store/constants'
import LoreFragment from '~/components/LoreFragment.vue'
import { BattleReport, LoreFragment as Lore } from '~/store/types'

export default Vue.extend({
  transition: 'page',
  data() {
    const loreFragments: Lore[] = []
    const battleReports: BattleReport[] = []
    const images: any[] = []
    return {
      loading: false,
      images,
      error: null,
      post: null,
      loreFragments,
      battleReports,
    }
  },
  components: { LoreFragment },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  // This allows us to use our global state within this page.
  // computed: mapState(['isLoading', 'currentProof']),
  // Our methods will go here...
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  mounted() {
    this.fetchImages()
  },
  methods: {
    async fetchImages() {
      const vm = this
      const storageRef = this.$fire.storage.ref('home/carousel')
      const imgList = await storageRef.listAll()
      imgList.items.forEach(async (imgRef) => {
        try {
          const url = await imgRef.getDownloadURL()
          vm.images.push(url)
        } catch (e) {
          alert(e.message)
        }
      })
    },
    async fetchData() {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const loreRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.LORE
      )
      const battleReportsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.BATTLEREPORTS
      )
      const vm = this
      try {
        const snapshot = await loreRef.get()
        const brSnapshot = await battleReportsRef.get()
        const docs = snapshot.docs
        const brDocs = brSnapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.loreFragments = []
        vm.battleReports = []
        docs.forEach((lore: any) => {
          vm.loreFragments.push(lore.data())
        })
        brDocs.forEach((br: any) => {
          vm.battleReports.push(br.data())
        })
      } catch (e) {
        alert(e)
      }
      // make sure this request is the last one we did, discard otherwise
      if (vm.$route.params.id !== fetchedId) return
      this.loading = false
    },
  },
})
</script>

<style>
.h2 {
  margin-bottom: 10px;
}
.stack {
  display: flex;
  flex-direction: row;
}
.half {
  width: 50%;
  flex: 1;
}
.half.right {
  margin-left: 10px;
}
.container {
  flex-direction: column;
}
.carouselContainer {
  width: 100%;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
