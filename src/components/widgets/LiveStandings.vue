<script setup lang="ts">
import { ref } from 'vue'

interface Team {
  position: number
  name: string
  logo: string
  points: number
  played: number
  goalDiff: number
}

const standings = ref<Team[]>([
  { position: 1, name: 'Arsenal', logo: '🔴', points: 65, played: 28, goalDiff: 42 },
  { position: 2, name: 'Man City', logo: '🔵', points: 63, played: 27, goalDiff: 38 },
  { position: 3, name: 'Liverpool', logo: '🔴', points: 62, played: 28, goalDiff: 35 },
  { position: 4, name: 'Aston Villa', logo: '🟣', points: 55, played: 28, goalDiff: 22 },
  { position: 5, name: 'Tottenham', logo: '⚪', points: 53, played: 27, goalDiff: 18 }
])
</script>

<template>
  <div class="bento-card h-full flex flex-col bg-stadium-900 rounded-lg p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-100">Premier League</h3>
      <span class="text-xs text-electric-emerald">Live</span>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div
        v-for="team in standings"
        :key="team.position"
        class="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0 hover:bg-slate-700/30 transition-colors"
      >
        <span class="text-xs font-bold text-slate-400 w-6">{{ team.position }}</span>
        <span class="text-xl">{{ team.logo }}</span>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">{{ team.name }}</p>
          <p class="text-xs text-slate-400">{{ team.played }} played</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold text-white">{{ team.points }}</p>
          <p class="text-xs text-slate-400">{{ team.goalDiff > 0 ? '+' : '' }}{{ team.goalDiff }}</p>
        </div>
      </div>
    </div>

    <div class="mt-4 text-center">
      <button class="text-xs text-electric-emerald hover:text-electric-emerald/80 transition-colors">
        View Full Table →
      </button>
    </div>
  </div>
</template>
