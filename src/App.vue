<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useLayoutStore } from './stores/layout' // Corrected import path
import ThemeToggle from './components/ThemeToggle.vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

// Initialize the layout store
const layoutStore = useLayoutStore()

// Breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')


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
  AdPlacement: defineAsyncComponent(() => import('./components/widgets/AdPlacement.vue')),
  Predictions: defineAsyncComponent(() => import('./components/widgets/Predictions.vue')),
  InjuryReport: defineAsyncComponent(() => import('./components/widgets/InjuryReport.vue'))
}

// Mouse Tracking for Card Glow
const handleMouseMove = (e: MouseEvent) => {
  for (const card of document.querySelectorAll('.bento-card')) {
    const rect = (card as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
    (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
  }
}
</script>

<template>
  <main 
    class="min-h-screen bg-vibrant-mesh p-4 sm:p-8 lg:p-12 text-foreground font-sans overflow-x-hidden selection:bg-primary/30 relative"
    @mousemove="handleMouseMove"
  >
    <!-- Background Noise Overlay -->
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    <header class="max-w-[1600px] mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 py-6">
      <div class="space-y-1">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 bg-primary rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-primary/30 group cursor-pointer transition-all hover:scale-110">
            <span class="text-3xl group-hover:rotate-12 transition-transform">⚽</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none drop-shadow-sm">
            Bento League
          </h1>
        </div>
        <p class="text-[10px] font-black uppercase tracking-[0.4em] ml-18 text-primary/60 opacity-80">Premium Data Dashboard</p>
      </div>
      
      <div class="flex items-center gap-2 bg-card/60 backdrop-blur-xl p-2 rounded-3xl border border-border shadow-2xl">
        <div class="flex items-center gap-8 px-6 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          <a href="#" class="hover:text-primary transition-colors">Matchday</a>
          <a href="#" class="hover:text-primary transition-colors">Standings</a>
          <a href="#" class="hover:text-primary transition-colors">Insight</a>
        </div>
        <ThemeToggle />
      </div>
    </header>

    <div class="max-w-[1600px] mx-auto">
      <div class="bento-grid">
        <div
          v-for="widget in widgets"
          :key="widget.id"
          :style="{
            gridArea: isMobile ? 'auto' : widget.gridArea
          }"
          class="bento-item bento-card group/item"
          v-motion
          :initial="{ opacity: 0, scale: 0.9, y: 30 }"
          :enter="{ opacity: 1, scale: 1, y: 0 }"
          :delay="widget.order * 60"
          :duration="700"
        >
          <component :is="componentMap[widget.component]" class="w-full h-full" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(140px, auto);
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .bento-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

.ml-18 {
  margin-left: 4.5rem;
}
</style>



