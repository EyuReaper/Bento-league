<script setup lang="ts">
import { ref } from 'vue'

const team1 = ref({
  name: 'Man City',
  short: 'MCI',
  logo: '🔵',
  wins: 45,
  goals: 124,
  possession: 62
})

const team2 = ref({
  name: 'Liverpool',
  short: 'LIV',
  logo: '🔴',
  wins: 38,
  goals: 118,
  possession: 54
})

const draws = ref(17)
const totalMatches = ref(100)

const stats = [
  { label: 'Total Wins', t1: team1.value.wins, t2: team2.value.wins },
  { label: 'Goals Scored', t1: team1.value.goals, t2: team2.value.goals },
  { label: 'Avg Possession', t1: team1.value.possession, t2: team2.value.possession, suffix: '%' }
]
</script>

<template>
  <div class="h-full flex flex-col p-6 relative group/h2h overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8 relative z-10">
      <div class="flex flex-col">
        <h3 class="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">Statistical Analysis</h3>
        <h2 class="text-xs font-bold text-foreground italic">Head to Head</h2>
      </div>
      <div class="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest tabular-nums">
        {{ totalMatches }} MEETINGS
      </div>
    </div>

    <!-- Teams Faceoff -->
    <div class="flex items-center justify-between gap-4 mb-10 relative z-10">
      <!-- Team 1 -->
      <div class="flex-1 flex flex-col items-center gap-3">
        <div class="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center text-3xl shadow-sm border border-border/50 group-hover/h2h:scale-110 transition-transform duration-500">
          {{ team1.logo }}
        </div>
        <div class="text-center">
          <div class="text-[11px] font-black uppercase tracking-tight">{{ team1.name }}</div>
          <div class="text-[10px] font-black text-primary">{{ team1.wins }} WINS</div>
        </div>
      </div>

      <!-- VS -->
      <div class="flex flex-col items-center gap-1">
        <div class="text-xl font-black italic text-muted-foreground/20 group-hover/h2h:text-primary/20 transition-colors duration-700">VS</div>
        <div class="px-2 py-0.5 rounded bg-muted text-[8px] font-black text-muted-foreground uppercase tracking-widest">{{ draws }} DRAWS</div>
      </div>

      <!-- Team 2 -->
      <div class="flex-1 flex flex-col items-center gap-3">
        <div class="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center text-3xl shadow-sm border border-border/50 group-hover/h2h:scale-110 transition-transform duration-500">
          {{ team2.logo }}
        </div>
        <div class="text-center">
          <div class="text-[11px] font-black uppercase tracking-tight">{{ team2.name }}</div>
          <div class="text-[10px] font-black text-red-500">{{ team2.wins }} WINS</div>
        </div>
      </div>
    </div>

    <!-- Comparison Stats -->
    <div class="flex-1 space-y-6 relative z-10">
      <div v-for="stat in stats" :key="stat.label" class="space-y-2">
        <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
          <span>{{ stat.t1 }}{{ stat.suffix || '' }}</span>
          <span class="text-foreground/40">{{ stat.label }}</span>
          <span>{{ stat.t2 }}{{ stat.suffix || '' }}</span>
        </div>
        <div class="h-1.5 w-full flex gap-1 rounded-full overflow-hidden">
          <div 
            class="h-full bg-primary rounded-l-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
            :style="{ width: `${(stat.t1 / (stat.t1 + stat.t2)) * 100}%` }"
          ></div>
          <div 
            class="h-full bg-red-500 rounded-r-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(239,68,68,0.3)]" 
            :style="{ width: `${(stat.t2 / (stat.t1 + stat.t2)) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Background Decor -->
    <div class="absolute -right-10 top-1/2 -translate-y-1/2 text-[120px] font-black text-foreground/[0.02] pointer-events-none select-none tracking-tighter leading-none italic z-0">
      H2H
    </div>

    <div class="mt-8 pt-4 border-t border-border/50">
      <button class="w-full h-10 rounded-xl bg-primary/10 hover:bg-primary/20 text-[9px] font-black uppercase tracking-[0.2em] text-primary transition-all flex items-center justify-center gap-2">
        Compare History
      </button>
    </div>
  </div>
</template>
