<script setup lang="ts">
import { ref } from 'vue'

const homeWin = ref(42)
const draw = ref(28)
const awayWin = ref(30)
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

    <div class="flex-1 flex flex-col justify-center gap-6">
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

    <div class="mt-8 text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest text-center italic">
      Based on 1.2M simulated outcomes
    </div>
  </div>
</template>
