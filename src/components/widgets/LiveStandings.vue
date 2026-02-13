<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'

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
  <Card class="h-full flex flex-col bg-stadium-900 rounded-lg p-4">
    <CardHeader class="pb-4">
      <div class="flex items-center justify-between">
        <CardTitle class="text-sm font-bold uppercase tracking-wider text-slate-100">
          Premier League
        </CardTitle>
        <span class="text-xs text-electric-emerald">Live</span>
      </div>
    </CardHeader>

    <CardContent class="flex-1 overflow-y-auto px-0 py-0">
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[30px]">#</TableHead>
            <TableHead class="min-w-[150px]">Team</TableHead>
            <TableHead class="text-right">P</TableHead>
            <TableHead class="text-right">GD</TableHead>
            <TableHead class="text-right">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="team in standings" :key="team.position">
            <TableCell class="font-medium text-slate-400">{{ team.position }}</TableCell>
            <TableCell class="flex items-center gap-2">
              <span class="text-xl">{{ team.logo }}</span>
              <p class="text-sm font-medium text-white truncate">{{ team.name }}</p>
            </TableCell>
            <TableCell class="text-right">{{ team.played }}</TableCell>
            <TableCell class="text-right">{{ team.goalDiff > 0 ? '+' : '' }}{{ team.goalDiff }}</TableCell>
            <TableCell class="text-right font-bold text-white">{{ team.points }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>

    <CardFooter class="pt-4 flex justify-center">
      <button class="text-xs text-electric-emerald hover:text-electric-emerald/80 transition-colors">
        View Full Table →
      </button>
    </CardFooter>
  </Card>
</template>
