<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePlayersStore } from '@/stores/players'

const playersStore = usePlayersStore()

onMounted(() => {
  if (playersStore.totw.length === 0) {
    playersStore.fetchTopPlayers()
  }
})

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
  <div class="h-full flex flex-col p-6 group/totw overflow-hidden">
    <div class="bento-header justify-between flex-row items-center mb-4">
      <div class="flex flex-col">
        <span class="bento-tag">Analysis</span>
        <h2 class="bento-title uppercase italic">Team of the Week</h2>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-black text-primary px-2 py-1 bg-primary/10 rounded-lg border border-primary/20">4-3-3</span>
      </div>
    </div>

    <!-- The Pitch -->
    <div class="flex-1 relative rounded-3xl bg-emerald-600/20 border-2 border-emerald-500/30 overflow-hidden shadow-inner">
      <!-- Pitch Grass Pattern -->
      <div class="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,#000_40px,#000_80px)]"></div>
      
      <!-- Pitch Markings -->
      <div class="absolute inset-4 border-2 border-white/20 rounded-lg pointer-events-none"></div>
      <div class="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-16 border-b-2 border-x-2 border-white/20 rounded-b-xl"></div>
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-16 border-t-2 border-x-2 border-white/20 rounded-t-xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/20 rounded-full"></div>
      <div class="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20"></div>

      <!-- Players -->
      <div 
        v-for="player in players" 
        :key="player.id"
        class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group/player cursor-pointer"
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

    <div class="mt-4 flex items-center justify-between opacity-40">
      <span class="text-[8px] font-black uppercase tracking-widest italic">Live Selection</span>
      <span class="text-[8px] font-black uppercase tracking-widest">Pitches by Bento</span>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations for player entry could go here */
</style>
