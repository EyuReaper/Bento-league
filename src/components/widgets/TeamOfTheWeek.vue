<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { usePlayersStore } from '@/stores/players'
import { useLeagueStore } from '@/stores/league'

const playersStore = usePlayersStore()
const leagueStore = useLeagueStore()

let pollingInterval: any = null

const refreshData = () => {
  playersStore.fetchTopPlayers(leagueStore.currentLeagueId, leagueStore.currentSeason)
}

onMounted(() => {
  refreshData()
  // Poll every hour
  pollingInterval = setInterval(refreshData, 3600000)
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})

watch(
  [() => leagueStore.currentLeagueId, () => leagueStore.currentSeason],
  () => {
    refreshData()
  }
)


// Hardcoded positions for 4-3-3 formation
const positions = [
  'top-[15%] left-[50%]', // ST
  'top-[25%] left-[20%]', // RW
  'top-[25%] left-[80%]', // LW
  'top-[45%] left-[50%]', // CDM
  'top-[40%] left-[25%]', // CAM
  'top-[40%] left-[75%]', // CM
  'top-[70%] left-[15%]', // RB
  'top-[75%] left-[40%]', // CB
  'top-[75%] left-[60%]', // CB
  'top-[70%] left-[85%]', // LB
  'top-[88%] left-[50%]', // GK
]

const players = computed(() => {
  return playersStore.totw.map((p, i) => ({
    id: p.player.id,
    name: p.player.name.split(' ').pop(), // Last name only for UI
    pos: positions[i] || 'top-[50%] left-[50%]',
    role: ['ST', 'RW', 'LW', 'CDM', 'CAM', 'CM', 'RB', 'CB', 'CB', 'LB', 'GK'][i] || 'SUB'
  }))
})
</script>

<template>
  <div class="flex flex-col h-full p-6 overflow-hidden group/totw">
    <div class="flex-row items-center justify-between mb-4 bento-header">
      <div class="flex flex-col">
        <span class="bento-tag">Analysis</span>
        <h2 class="italic uppercase bento-title">Team of the Week</h2>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-black text-primary px-2 py-1 bg-primary/10 rounded-lg border border-primary/20">4-3-3</span>
      </div>
    </div>

    <!-- The Pitch -->
    <div class="relative flex-1 overflow-hidden border-2 shadow-inner rounded-3xl bg-emerald-600/20 border-emerald-500/30">
      <!-- Pitch Grass Pattern -->
      <div class="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,#000_40px,#000_80px)]"></div>
      
      <!-- Pitch Markings -->
      <div class="absolute border-2 rounded-lg pointer-events-none inset-4 border-white/20"></div>
      <div class="absolute w-32 h-16 -translate-x-1/2 border-b-2 top-4 left-1/2 border-x-2 border-white/20 rounded-b-xl"></div>
      <div class="absolute w-32 h-16 -translate-x-1/2 border-t-2 bottom-4 left-1/2 border-x-2 border-white/20 rounded-t-xl"></div>
      <div class="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full top-1/2 left-1/2 border-white/20"></div>
      <div class="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20"></div>

      <!-- Players -->
      <div 
        v-for="player in players" 
        :key="player.id"
        class="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/player"
        :class="player.pos"
      >
        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-black shadow-xl border-2 border-primary group-hover/player:scale-125 transition-transform">
          {{ player.role }}
        </div>
        <div class="px-2 py-0.5 bg-card/80 backdrop-blur-sm rounded-md border border-border shadow-sm">
          <span class="text-[8px] font-black uppercase tracking-tighter whitespace-nowrap">{{ player.name }}</span>
        </div>
      </div>
      
      <div v-if="players.length === 0" class="absolute inset-0 flex items-center justify-center">
         <p class="text-[10px] font-black uppercase tracking-widest text-white/40">Scouting Top Eleven...</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-4 opacity-40">
      <span class="text-[8px] font-black uppercase tracking-widest italic">Live Selection</span>
      <span class="text-[8px] font-black uppercase tracking-widest">Pitches by Bento</span>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations for player entry could go here */
</style>
