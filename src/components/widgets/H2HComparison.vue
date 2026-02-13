<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

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
  <Card class="h-full flex flex-col bg-stadium-900 rounded-lg p-4">
    <CardHeader class="pb-4">
      <CardTitle class="text-sm font-bold uppercase tracking-wider text-slate-100 mb-1">
        Head to Head
      </CardTitle>
      <CardDescription class="text-xs text-slate-400">
        Last {{ totalMatches }} meetings
      </CardDescription>
    </CardHeader>

    <CardContent class="flex-1 flex flex-col justify-between py-0">
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
          <Progress
            :model-value="getPercentage(team1.wins)"
            class="h-2 [&::-webkit-progress-bar]:bg-slate-700 [&::-webkit-progress-value]:bg-electric-emerald"
          />
        </div>

        <div>
          <div class="flex justify-between text-xs text-slate-200 mb-1">
            <span>Goals Scored</span>
            <span>{{ team1.goals }} vs {{ team2.goals }}</span>
          </div>
          <div class="flex gap-2">
            <Progress
              :model-value="(team1.goals / (team1.goals + team2.goals)) * 100"
              class="flex-1 h-2 [&::-webkit-progress-bar]:bg-slate-700 [&::-webkit-progress-value]:bg-electric-emerald"
            />
            <Progress
              :model-value="(team2.goals / (team1.goals + team2.goals)) * 100"
              class="flex-1 h-2 [&::-webkit-progress-bar]:bg-slate-700 [&::-webkit-progress-value]:bg-red-400"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
