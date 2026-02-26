<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const homeTeam = ref({
  name: 'Man City',
  short: 'MCI',
  logo: '🔵',
  score: 2,
  color: '#6CABDD'
})

const awayTeam = ref({
  name: 'Liverpool',
  short: 'LIV',
  logo: '🔴',
  score: 2,
  color: '#C8102E'
})

const matchStatus = ref('LIVE')
const matchTime = ref("67'")
const competition = ref('Premier League')
const venue = ref('Etihad Stadium')
</script>

<template>
  <div class="h-full flex flex-col p-8 group/hero">
    <div class="flex justify-between items-center mb-10">
      <div class="flex flex-col">
        <span class="bento-tag">Premier League</span>
        <h2 class="bento-title uppercase">Matchday 24</h2>
      </div>
      <div class="live-indicator">
        <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
        <span>Live 67'</span>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-between gap-4">
      <div class="flex-1 flex flex-col items-center gap-6">
        <div class="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center text-5xl shadow-sm border border-border group-hover/hero:scale-110 group-hover/hero:rotate-3 transition-all duration-500">
          🔵
        </div>
        <div class="text-[11px] font-black uppercase tracking-widest opacity-60">Man City</div>
      </div>

      <div class="text-6xl md:text-7xl font-black tracking-tighter tabular-nums text-foreground italic px-4">
        2-2
      </div>

      <div class="flex-1 flex flex-col items-center gap-6">
        <div class="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center text-5xl shadow-sm border border-border group-hover/hero:scale-110 group-hover/hero:-rotate-3 transition-all duration-500">
          🔴
        </div>
        <div class="text-[11px] font-black uppercase tracking-widest opacity-60">Liverpool</div>
      </div>
    </div>

    <div class="mt-10 flex items-center justify-between">
      <div class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40 italic">Etihad Stadium</div>
      <button class="px-6 py-3 rounded-2xl bg-foreground text-background text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">Match Center</button>
    </div>
  </div>
</template>
