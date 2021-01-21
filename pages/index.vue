<template>
  <div class="container">
    <div class="bigcontainer">
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
          <div id="w-slider-mask-0" class="w-slider-mask">
            <div
              class="slide w-slide"
              aria-label="1 of 3"
              role="group"
              aria-hidden="true"
              style="
                transform: translateX(-1308px);
                opacity: 1;
                transition: transform 500ms ease-in-out 0s;
              "
            >
              <img
                src="https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17a74df242f0f92f7_Carousel-1.png"
                loading="lazy"
                sizes="100vw"
                srcset="
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17a74df242f0f92f7_Carousel-1-p-500.png   500w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17a74df242f0f92f7_Carousel-1-p-800.png   800w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17a74df242f0f92f7_Carousel-1-p-1080.png 1080w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17a74df242f0f92f7_Carousel-1-p-1600.png 1600w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17a74df242f0f92f7_Carousel-1.png        1920w
                "
                alt=""
                aria-hidden="true"
              />
            </div>
            <div
              class="w-slide"
              aria-label="2 of 3"
              role="group"
              aria-hidden="true"
              style="
                transform: translateX(-1308px);
                opacity: 1;
                transition: transform 500ms ease-in-out 0s;
              "
            >
              <img
                src="https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa192999707767c168d_Carousel-2.png"
                loading="lazy"
                sizes="100vw"
                srcset="
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa192999707767c168d_Carousel-2-p-500.png   500w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa192999707767c168d_Carousel-2-p-800.png   800w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa192999707767c168d_Carousel-2-p-1080.png 1080w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa192999707767c168d_Carousel-2-p-1600.png 1600w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa192999707767c168d_Carousel-2.png        1920w
                "
                alt=""
                aria-hidden="true"
              />
            </div>
            <div
              class="w-slide"
              aria-label="3 of 3"
              role="group"
              style="
                transform: translateX(-1308px);
                opacity: 1;
                transition: transform 500ms ease-in-out 0s;
              "
            >
              <img
                src="https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17b781f45f141c0f9_Carousel-3.png"
                loading="lazy"
                sizes="100vw"
                srcset="
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17b781f45f141c0f9_Carousel-3-p-500.png   500w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17b781f45f141c0f9_Carousel-3-p-800.png   800w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17b781f45f141c0f9_Carousel-3-p-1080.png 1080w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17b781f45f141c0f9_Carousel-3-p-1600.png 1600w,
                  https://uploads-ssl.webflow.com/5ffaaef8d5a5677efda12f0e/5ffb7aa17b781f45f141c0f9_Carousel-3.png        1920w
                "
                alt=""
              />
            </div>
            <div
              aria-live="off"
              aria-atomic="true"
              class="w-slider-aria-label"
              data-wf-ignore=""
            >
              Slide 3 of 3.
            </div>
          </div>
          <div
            class="left-arrow w-slider-arrow-left"
            role="button"
            tabindex="0"
            aria-controls="w-slider-mask-0"
            aria-label="previous slide"
          >
            <div class="w-icon-slider-left"></div>
          </div>
          <div
            class="right-arrow w-slider-arrow-right"
            role="button"
            tabindex="0"
            aria-controls="w-slider-mask-0"
            aria-label="next slide"
          >
            <div class="w-icon-slider-right"></div>
          </div>
          <div class="slide-nav w-slider-nav w-round">
            <div
              class="w-slider-dot"
              data-wf-ignore=""
              aria-label="Show slide 1 of 3"
              aria-selected="false"
              role="button"
              tabindex="-1"
            ></div>
            <div
              class="w-slider-dot"
              data-wf-ignore=""
              aria-label="Show slide 2 of 3"
              aria-selected="false"
              role="button"
              tabindex="-1"
            ></div>
            <div
              class="w-slider-dot w-active"
              data-wf-ignore=""
              aria-label="Show slide 3 of 3"
              aria-selected="true"
              role="button"
              tabindex="0"
            ></div>
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
            Imperium astropaths in the <strong>Telemon </strong>system. Telemon
            is dangerously close to a number of Imperial outposts, and a threat
            from that system is an unacceptable risk. A small Astra Militarum
            fleet is sent to investigate the signal, discover the source, and
            destroy any threats they might find. Upon entering the system,
            contact is immediately lost. Hours later, a single message is
            received via long-range communications...<br />
          </p>
          <p class="paragraph">
            Shortly after the signal is received, the mysterious energy reading
            vanishes. The Eternal Fire appears to have succeeded. Not wasting
            any time, the Imperium deploys additional assets to the Telemon
            system.<br /><br />However, Mankind are not the only ones to have
            detected the signal. In a nearby system, an ancient Necron tomb
            awakens, inexplicably drawn to the mysterious anomoly. Likewise, on
            the planet Kjelstan, a dormant Genestealer Cult awakens from their
            slumber, sensing an opportunity to spread their infection to those
            who seek the energy source.<br /><br />Whether they are Xenos or
            Man, any faction close enough to detect the signal is sure to
            investigate. And as is always the case in the 41st Millenium, that
            can mean only war.<br />
          </p>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
