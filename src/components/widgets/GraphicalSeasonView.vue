<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStandingsStore } from '@/stores/standings'
import { useLeagueStore } from '@/stores/league'

const standingsStore = useStandingsStore()
const leagueStore = useLeagueStore()

onMounted(() => {
  if (standingsStore.standings.length === 0) {
    standingsStore.fetchStandings(leagueStore.currentLeagueId, leagueStore.currentSeason)
  }
})
<script>

// Derive top team's stats for the season view
const topTeam = computed(() => standingsStore.getStandings[0] || null)

const seasonProgress = computed(() => {
  if (!topTeam.value) return 0
  const played = topTeam.value.all?.played || 0
  return Math.round((played / 38) * 100)
})

const form = computed(() => {
  if (!topTeam.value) return []
  return (topTeam.value.form || '').split('')
})

const stats = computed(() => {
  if (!topTeam.value) return []
  return [
    { label: 'Win Rate', value: `${Math.round(((topTeam.value.all?.win || 0) / (topTeam.value.all?.played || 1)) * 100)}%` },
    { label: 'GD', value: topTeam.value.goalsDiff || '0' },
    { label: 'Points', value: topTeam.value.points || '0' }
  ]
})
</script>

<template>
  <div class="relative flex flex-col h-full p-5 overflow-hidden group/season">
    <div class="flex items-center justify-between mb-6">
      <div class="flex flex-col">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Campaign</h3>
        <h2 class="text-xs font-bold text-foreground">Season Progress</h2>
      </div>
      <div v-if="seasonProgress > 0" class="text-[10px] font-black text-primary tabular-nums bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
        {{ seasonProgress }}% COMPLETE
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="relative w-full h-3 mb-8 overflow-hidden rounded-full shadow-inner bg-muted/50">
      <div 
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
        :style="{ width: `${seasonProgress}%` }"
      >
        <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[pulse_3s_linear_infinite]"></div>
      </div>
    </div>

    <!-- Form Guide -->
    <div class="flex flex-col justify-center flex-1">
      <div class="flex items-center justify-between mb-4">
        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recent Form</span>
        <div class="flex gap-1.5" v-if="form.length > 0">
          <div 
            v-for="(res, i) in form" 
            :key="i"
            class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-all duration-300 hover:scale-110 cursor-default"
            :class="{
              'bg-primary text-primary-foreground shadow-lg shadow-primary/20': res === 'W',
              'bg-muted-foreground/20 text-muted-foreground': res === 'D',
              'bg-red-500 text-white shadow-lg shadow-red-500/20': res === 'L'
            }"
          >
            {{ res }}
          </div>
        </div>
        <div v-else class="text-[10px] font-black text-muted-foreground/40 italic">N/A</div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col">
          <span class="text-sm font-black text-foreground">{{ stat.value }}</span>
          <span class="text-[8px] font-black uppercase tracking-tighter text-muted-foreground truncate">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Decoration -->
    <div class="absolute w-32 h-32 transition-colors rounded-full pointer-events-none -bottom-6 -right-6 bg-primary/5 blur-3xl group-hover/season:bg-primary/10"></div>
  </div>
</template>
