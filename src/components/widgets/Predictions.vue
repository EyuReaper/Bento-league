<script setup lang="ts">
import { computed, watch } from 'vue'
import { useFixturesStore } from '@/stores/fixtures'
import { usePredictionsStore } from '@/stores/predictions'

const fixturesStore = useFixturesStore()
const predictionsStore = usePredictionsStore()

const match = computed(() => fixturesStore.nextMatch)

watch(match, (newMatch) => {
  if (newMatch) {
    predictionsStore.fetchPredictions(newMatch.fixture.id)
  }
}, { immediate: true })

const homeWin = computed(() => parseInt(predictionsStore.prediction?.predictions?.percent?.home || '33%'))
const draw = computed(() => parseInt(predictionsStore.prediction?.predictions?.percent?.draw || '33%'))
const awayWin = computed(() => parseInt(predictionsStore.prediction?.predictions?.percent?.away || '33%'))
</script>

<template>
  <div class="h-full flex flex-col p-6 group/pred">
    <div class="bento-header justify-between flex-row items-center mb-6">
      <div class="flex flex-col">
        <span class="bento-tag">AI Insight</span>
        <h2 class="bento-title uppercase italic">Win Probability</h2>
      </div>
      <div class="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center border border-border">
        <span class="text-xs">🤖</span>
      </div>
    </div>

    <div v-if="predictionsStore.prediction" class="flex-1 flex flex-col justify-center gap-6">
      <div class="space-y-3">
        <div class="flex justify-between items-end">
          <span class="text-[10px] font-black uppercase tracking-widest opacity-60">Home Win</span>
          <span class="text-xl font-black tabular-nums">{{ homeWin }}%</span>
        </div>
        <div class="h-3 w-full bg-muted rounded-full overflow-hidden border border-border shadow-inner">
          <div class="h-full bg-primary transition-all duration-1000 ease-out" :style="{ width: homeWin + '%' }"></div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between items-end">
          <span class="text-[10px] font-black uppercase tracking-widest opacity-60">Draw</span>
          <span class="text-xl font-black tabular-nums">{{ draw }}%</span>
        </div>
        <div class="h-3 w-full bg-muted rounded-full overflow-hidden border border-border shadow-inner">
          <div class="h-full bg-slate-400 transition-all duration-1000 ease-out" :style="{ width: draw + '%' }"></div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between items-end">
          <span class="text-[10px] font-black uppercase tracking-widest opacity-60">Away Win</span>
          <span class="text-xl font-black tabular-nums">{{ awayWin }}%</span>
        </div>
        <div class="h-3 w-full bg-muted rounded-full overflow-hidden border border-border shadow-inner">
          <div class="h-full bg-red-500 transition-all duration-1000 ease-out" :style="{ width: awayWin + '%' }"></div>
        </div>
      </div>
    </div>
    
    <div v-else class="flex-1 flex items-center justify-center">
       <p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Analyzing probabilities...</p>
    </div>

    <div class="mt-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest text-center italic">
      Based on {{ predictionsStore.prediction ? 'Live AI analysis' : 'Historical data' }}
    </div>
  </div>
</template>
