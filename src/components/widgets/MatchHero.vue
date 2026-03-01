<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useFixturesStore } from '@/stores/fixtures'

const fixturesStore = useFixturesStore()

onMounted(() => {
  fixturesStore.fetchHeroMatch()
})

const match = computed(() => fixturesStore.heroMatch)
const isLoading = computed(() => fixturesStore.loading)

// Extract round number from "Regular Season - 24" -> "Matchday 24"
const matchDay = computed(() => {
  if (!match.value?.league?.round) return 'Matchday'
  return match.value.league.round.replace('Regular Season - ', 'Matchday ')
})
</script>

<template>
  <div class="flex flex-col h-full p-8 group/hero relative overflow-hidden">
    <!-- Loading State -->
    <div v-if="isLoading && !match" class="absolute inset-0 bg-muted/20 backdrop-blur-sm flex items-center justify-center z-10">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-if="match">
      <div class="flex items-center justify-between mb-10">
        <div class="flex flex-col">
          <span class="bento-tag">{{ match.league.name }}</span>
          <h2 class="uppercase bento-title">{{ matchDay }}</h2>
        </div>
        <div class="live-indicator" v-if="match.fixture.status.short !== 'FT'">
          <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span>{{ match.fixture.status.elapsed }}'</span>
        </div>
        <div v-else class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
          Finished
        </div>
      </div>

      <div class="flex items-center justify-between flex-1 gap-4">
        <div class="flex flex-col items-center flex-1 gap-6">
          <div class="flex items-center justify-center w-20 h-20 transition-all duration-500 border shadow-sm rounded-3xl bg-muted border-border group-hover/hero:scale-110 group-hover/hero:rotate-3 p-4">
            <img :src="match.teams.home.logo" :alt="match.teams.home.name" class="w-full h-full object-contain" />
          </div>
          <div class="text-[11px] font-black uppercase tracking-widest opacity-60 text-center truncate max-w-[100px]">
            {{ match.teams.home.name }}
          </div>
        </div>

        <div class="px-4 text-5xl italic font-black tracking-tighter md:text-6xl tabular-nums text-foreground">
          {{ match.goals.home }} - {{ match.goals.away }}
        </div>

        <div class="flex flex-col items-center flex-1 gap-6">
          <div class="flex items-center justify-center w-20 h-20 transition-all duration-500 border shadow-sm rounded-3xl bg-muted border-border group-hover/hero:scale-110 group-hover/hero:-rotate-3 p-4">
            <img :src="match.teams.away.logo" :alt="match.teams.away.name" class="w-full h-full object-contain" />
          </div>
          <div class="text-[11px] font-black uppercase tracking-widest opacity-60 text-center truncate max-w-[100px]">
            {{ match.teams.away.name }}
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mt-10">
        <div class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 italic">
          {{ match.fixture.venue.name }}
        </div>
        <button class="px-6 py-3 text-xs font-black tracking-widest uppercase transition-all shadow-xl rounded-2xl bg-foreground text-background hover:bg-primary hover:text-white active:scale-95">
          Match Center
        </button>
      </div>
    </template>
    
    <!-- Empty State -->
    <div v-else-if="!isLoading" class="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
       <span class="text-4xl mb-2">⚽</span>
       <p class="text-xs font-black uppercase tracking-widest">No Live Matches</p>
    </div>
  </div>
</template>
