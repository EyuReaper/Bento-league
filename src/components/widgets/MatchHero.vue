<script setup lang="ts">
import { ref } from 'vue'

const homeTeam = ref({
  name: 'Manchester City',
  logo: '🔵',
  score: 2
})

const awayTeam = ref({
  name: 'Liverpool',
  logo: '🔴',
  score: 2
})

const matchStatus = ref('LIVE')
const matchTime = ref("67'")
</script>

<template>
  <div class="bento-card h-full flex flex-col justify-between bg-stadium-900 rounded-lg p-4">
    <div class="flex justify-between items-start mb-4">
      <div class="live-indicator flex items-center">
        <span class="inline-block w-2 h-2 rounded-full bg-electric-emerald animate-pulse mr-1"></span>
        <span class="text-white">{{ matchStatus }}</span>
      </div>
      <span class="text-electric-emerald font-bold text-lg">{{ matchTime }}</span>
    </div>

    <div class="flex-1 flex items-center justify-between gap-8">
      <div class="flex-1 text-center">
        <div class="text-6xl mb-3">{{ homeTeam.logo }}</div>
        <h3 class="text-xl font-bold text-white">{{ homeTeam.name }}</h3>
      </div>

      <div class="flex flex-col items-center">
        <div class="text-5xl font-bold text-white">
          {{ homeTeam.score }} - {{ awayTeam.score }}
        </div>
      </div>

      <div class="flex-1 text-center">
        <div class="text-6xl mb-3">{{ awayTeam.logo }}</div>
        <h3 class="text-xl font-bold text-white">{{ awayTeam.name }}</h3>
      </div>
    </div>

    <div class="mt-4 text-center text-sm text-slate-200">
      Premier League - Etihad Stadium
    </div>
  </div>
</template>
