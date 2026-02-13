<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

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
  <Card class="h-full flex flex-col justify-between bg-stadium-900 rounded-lg p-4">
    <CardHeader class="flex flex-row justify-between items-start pb-4">
      <div class="live-indicator flex items-center">
        <span class="inline-block w-2 h-2 rounded-full bg-electric-emerald animate-pulse mr-1"></span>
        <span class="text-white">{{ matchStatus }}</span>
      </div>
      <span class="text-electric-emerald font-bold text-lg">{{ matchTime }}</span>
    </CardHeader>

    <CardContent class="flex-1 flex items-center justify-between gap-8 py-0">
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
    </CardContent>

    <CardFooter class="flex flex-col items-center pt-4">
      <div class="mt-4 text-center text-sm text-slate-200">
        Premier League - Etihad Stadium
      </div>
      <div class="mt-4 text-center">
        <Button>View Details</Button>
      </div>
    </CardFooter>
  </Card>
</template>
