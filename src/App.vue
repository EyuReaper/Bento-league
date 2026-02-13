<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useLayoutStore } from './stores/layout' // Corrected import path

// Initialize the layout store
const layoutStore = useLayoutStore()

// Computed property to get widgets from the store
const widgets = computed(() => layoutStore.getWidgets)

// Map widget component names to their actual async components
const componentMap: Record<string, any> = {
  MatchHero: defineAsyncComponent(() => import('./components/widgets/MatchHero.vue')),
  NewsTicker: defineAsyncComponent(() => import('./components/widgets/NewsTicker.vue')),
  LiveStandings: defineAsyncComponent(() => import('./components/widgets/LiveStandings.vue')),
  H2HComparison: defineAsyncComponent(() => import('./components/widgets/H2HComparison.vue')),
  PlayerOfTheWeek: defineAsyncComponent(() => import('./components/widgets/PlayerOfTheWeek.vue')),
  NewsSource: defineAsyncComponent(() => import('./components/widgets/NewsSource.vue')),
  CurrentMatchNextGame: defineAsyncComponent(() => import('./components/widgets/CurrentMatchNextGame.vue')),
  TransferMarket: defineAsyncComponent(() => import('./components/widgets/TransferMarket.vue')),
  LeagueLogo: defineAsyncComponent(() => import('./components/widgets/LeagueLogo.vue')),
  GraphicalSeasonView: defineAsyncComponent(() => import('./components/widgets/GraphicalSeasonView.vue')),
  AdPlacement: defineAsyncComponent(() => import('./components/widgets/AdPlacement.vue'))
}
</script>

<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8 bg-stadium-900/40 backdrop-blur-xl text-white font-sans">
    <header class="mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-white-100 mb-2">
        ⚽ Bento League
      </h1>
      <p class="text-slate-100 text-sm">Your premium football dashboard</p>
    </header>

    <div class="bento-grid">
      <div
        v-for="widget in widgets"
        :key="widget.id"
        :style="{
          gridColumn: `span ${widget.cols}`,
          gridRow: `span ${widget.rows}`
        }"
        class="bento-item flex items-center justify-center text-lg p-4"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :delay="widget.order * 100"
      >
        <component :is="componentMap[widget.component]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-grid {
  display: grid;
  /* Desktop: 12-column grid for fine-grained control */
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.bento-item {
  /* Default aspect ratio for 1x1 or single unit cells on desktop */
  aspect-ratio: 1 / 1;
}

/* Tablet / Medium screens (e.g., max-width 1024px) */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr); /* Tablet: 4-column grid */
    gap: 0.75rem; /* Slightly smaller gap */
  }
  .bento-item {
    /* For tablets, items default to full width (span 4 of 4) */
    grid-column: span 4 !important;
    aspect-ratio: 16 / 9; /* More rectangular for items that take full width */
  }
}

/* Mobile / Small screens (e.g., max-width 640px) */
@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr; /* Mobile: single column */
    gap: 0.5rem; /* Smallest gap */
  }
  .bento-item {
    /* For mobile, items are always full width (span 1 of 1) */
    grid-column: span 1 !important;
    grid-row: auto !important; /* Let content define height for vertical scroll */
    aspect-ratio: 16 / 9; /* Maintain a consistent aspect ratio for full-width items */
  }
}
</style>
