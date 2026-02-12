<script setup lang="ts">
import { ref } from 'vue'

const team1 = ref({
  name: 'Man City',
  logo: '🔵',
  wins: 45,
  goals: 12
})

const team2 = ref({
  name: 'Liverpool',
  logo: '🔴',
  wins: 38,
  goals: 10
})

const draws = ref(17)
const totalMatches = ref(100)

const getPercentage = (value: number) => {
  return (value / totalMatches.value) * 100
}
</script>

<template>
  <div class="bento-card h-full flex flex-col bg-stadium-900 rounded-lg p-4">
    <div class="mb-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-100 mb-1">Head to Head</h3>
      <p class="text-xs text-slate-400">Last {{ totalMatches }} meetings</p>
    </div>

    <div class="flex items-center justify-between gap-6 mb-6">
      <div class="text-center flex-1">
        <div class="text-3xl mb-2">{{ team1.logo }}</div>
        <p class="text-sm font-medium text-slate-100">{{ team1.name }}</p>
      </div>

      <div class="text-center">
        <div class="flex items-center gap-4 text-2xl font-bold">
          <span class="text-electric-emerald">{{ team1.wins }}</span>
          <span class="text-slate-400">-</span>
          <span class="text-slate-200">{{ draws }}</span>
          <span class="text-slate-400">-</span>
          <span class="text-red-400">{{ team2.wins }}</span>
        </div>
      </div>

      <div class="text-center flex-1">
        <div class="text-3xl mb-2">{{ team2.logo }}</div>
        <p class="text-sm font-medium text-slate-100">{{ team2.name }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <div class="flex justify-between text-xs text-slate-200 mb-1">
          <span>Win Rate</span>
          <span>{{ team1.wins }}% vs {{ team2.wins }}%</span>
        </div>
        <div class="flex gap-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            class="bg-electric-emerald transition-all duration-500"
            :style="{ width: getPercentage(team1.wins) + '%' }"
          ></div>
          <div
            class="bg-slate-400 transition-all duration-500"
            :style="{ width: getPercentage(draws) + '%' }"
          ></div>
          <div
            class="bg-red-400 transition-all duration-500"
            :style="{ width: getPercentage(team2.wins) + '%' }"
          ></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between text-xs text-slate-200 mb-1">
          <span>Goals Scored</span>
          <span>{{ team1.goals }} vs {{ team2.goals }}</span>
        </div>
        <div class="flex gap-2">
          <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-electric-emerald transition-all duration-500"
              :style="{ width: (team1.goals / (team1.goals + team2.goals)) * 100 + '%' }"
            ></div>
          </div>
          <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-red-400 transition-all duration-500"
              :style="{ width: (team2.goals / (team1.goals + team2.goals)) * 100 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
