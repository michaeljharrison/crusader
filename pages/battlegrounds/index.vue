<template>
  <div class="container">
    <div class="bigcontainer">
      <div class="sectionmain">
        <h1 class="h1">Battlegrounds of the Telemon System</h1>
      </div>
      <div class="sectionmain">
        <img
          src="https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb706c0e826a72079b9a4f_Telemon%20System%20Map.svg"
          loading="lazy"
          alt=""
          class="image-3"
        />
        <div class="div-block-12">
          <h1 class="h3">The Telemon System</h1>
          <p class="paragraph">
            The Telemon system was, until recently, completely unremarkable.
            It's four planets offer no strategic advantage in warfare, and the
            only resources of any value have been harvested long ago. Although
            one planet holds a small T'au population, the system itself is
            relatively unclaimed from a military perspective.
          </p>
          <div
            v-for="(item, key) in battlegrounds"
            :key="key"
            class="battleground"
          >
            <h1 class="h5">{{ item.name }}</h1>
            <p class="paragraph">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="sectionmain-vert">
        <div class="div-planetcontainers">
          <div class="collection-list-wrapper-3 w-dyn-list">
            <div role="list" class="w-dyn-items w-row">
              <div
                v-for="(item, key) in battlegrounds"
                :key="key"
                role="listitem"
                class="collection-item-4 w-dyn-item w-col w-col-3"
              >
                <img
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime.png"
                  alt=""
                  sizes="300px"
                  srcset="
                    https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime-p-500.png  500w,
                    https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime-p-800.png  800w,
                    https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffe4795a900cf4eba63db5c_Telemon%20Prime.png       1000w
                  "
                  class="image-planet"
                />
                <h1 class="h2">{{ item.name }}</h1>
                <h1 class="h5">Controlled by:</h1>
                <h1 class="h5 grey w-condition-invisible">Contested</h1>
                <h1 style="color: hsla(304, 100%, 35.82%, 1)" class="h5">
                  The Tamrekh Dynasty
                </h1>
                <div class="div-extract">
                  <h1 class="h6">Combat Effect</h1>
                  <div class="paragraph i">
                    {{ item.rulesFluff }}
                  </div>
                  <div class="line"></div>
                  <div class="paragraph">
                    {{ item.rules }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sectionmain-vert">
        <h1 class="h2">war zone points</h1>
        <div class="table div-block-14">
          <div class="tablerow">
            <div class="tablecell-battles"><h1 class="h6">Team</h1></div>
            <div class="tablecell-battles">
              <h1 class="h6">Telemon Prime</h1>
            </div>
            <div class="tablecell-battles"><h1 class="h6">Kjelstan</h1></div>
            <div class="tablecell-battles"><h1 class="h6">Orna'kir</h1></div>
            <div class="tablecell-battles"><h1 class="h6">doridia</h1></div>
          </div>
          <div class="collection-list-table w-dyn-list">
            <div role="list" class="w-dyn-items">
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffcc1a6b13eff64888ae039_Genestealer%20Cults.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1
                    style="color: hsla(186, 100%, 38.49%, 1)"
                    class="h6 winner"
                  >
                    Cult of the Lightning Eaters
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffd70dcfa5473b42b27c179_Chaos.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1
                    style="color: hsla(275, 100%, 76.12%, 1)"
                    class="h6 winner"
                  >
                    Heralds of the Writhing Night
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">1</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">1</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/600102020c27edfa0dd29f4d_Mortarian%27s%20Anvil.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1
                    style="color: hsla(102, 100%, 29.49%, 1)"
                    class="h6 winner"
                  >
                    Mortarian's Anvil - 5th Sepsis Cohort
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">1</h1></div>
                <div class="tablecell-battles"><h1 class="h6">1</h1></div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffd70dcfa5473b42b27c179_Chaos.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1
                    style="color: hsla(86, 100%, 72.77%, 1)"
                    class="h6 winner"
                  >
                    Nurgle Uprising
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffb785b7a74dff6530f8b19_Tempest%20Legion.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1 style="color: hsla(271, 100%, 50%, 1)" class="h6 winner">
                    Tempest Legion 2nd Company
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/60068d17808235152eb078db_Eldar.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1 style="color: hsla(29, 100%, 50%, 1)" class="h6 winner">
                    The Coronas Eldar
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffac0e0d1eabc5ba1b501a7_Adeptus%20Mechanicus.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1 style="color: hsla(0, 100%, 36.16%, 1)" class="h6 winner">
                    The Omnissiah's Explorator
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">1</h1></div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">4</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffed4e64cc919c0b93a508f_Drukhari.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1
                    style="color: hsla(171, 100%, 30.16%, 1)"
                    class="h6 winner"
                  >
                    The Reavers Banquet
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">1</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
              </div>
              <div role="listitem" class="collection-item-table w-dyn-item">
                <div class="tablecell-battles alignleft">
                  <img
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/5ffabe3b5e2c100f43b302cc/5ffabefec715f8832e4eb18a_Necron.svg"
                    alt=""
                    class="icon-battletable"
                  />
                  <h1
                    style="color: hsla(304, 100%, 35.82%, 1)"
                    class="h6 winner"
                  >
                    The Tamrekh Dynasty
                  </h1>
                </div>
                <div class="tablecell-battles"><h1 class="h6">4</h1></div>
                <div class="tablecell-battles"><h1 class="h6">0</h1></div>
                <div class="tablecell-battles"><h1 class="h6">2</h1></div>
                <div class="tablecell-battles"><h1 class="h6">3</h1></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import constants from '~/store/constants'
import { Battleground } from '~/store/types'
export default {
  transition: 'page',
  data() {
    const battlegrounds: Battleground[] = []
    return {
      loading: false,
      error: null,
      post: null,
      battlegrounds,
    }
  },
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
  methods: {
    async fetchData() {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      const battlegroundsRef = this.$fire.firestore.collection(
        constants.COLLECTIONS.BATTLEGROUNDS
      )
      const vm = this
      try {
        const snapshot = await battlegroundsRef.get()
        const docs = snapshot.docs
        if (!docs) {
          alert('Document does not exist.')
          return
        }
        vm.battlegrounds = []
        docs.forEach((battleground: any) => {
          console.log(battleground.data())
          vm.battlegrounds.push(battleground.data())
        })
      } catch (e) {
        alert(e)
      }
      // make sure this request is the last one we did, discard otherwise
      if (vm.$route.params.id !== fetchedId) return
      this.loading = false
    },
  },
}
</script>
