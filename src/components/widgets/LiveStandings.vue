<script setup lang="ts">
import { onMounted } from 'vue'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { useStandingsStore } from '@/stores/standings'
import { isUsingMockData } from '@/lib/api'

const standingsStore = useStandingsStore()

onMounted(() => {
  standingsStore.fetchStandings()
})
</script>

<template>
  <div class="h-full flex flex-col p-5 group/standings relative">
    <div class="bento-header justify-between flex-row items-center mb-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="bento-tag">League</span>
          <span v-if="!isUsingMockData()" class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[7px] font-black text-red-500 uppercase tracking-widest animate-pulse mb-1.5">
            <span class="w-1 h-1 rounded-full bg-red-500"></span>
            Live
          </span>
          <span v-else class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[7px] font-black text-amber-500 uppercase tracking-widest mb-1.5">
            Preview Mode
          </span>
        </div>
        <h2 class="bento-title uppercase">Live Standings</h2>
      </div>
      <div class="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center border border-border">
        <span class="text-xs">📊</span>
      </div>
    </div>

    <div v-if="standingsStore.error && !isUsingMockData()" class="flex-1 flex flex-col items-center justify-center text-center p-4">
      <div class="text-2xl mb-2">⚠️</div>
      <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
        {{ standingsStore.error }}
      </p>
      <button 
        @click="standingsStore.fetchStandings()" 
        class="mt-4 text-[9px] font-black uppercase tracking-widest text-primary hover:underline"
      >
        Try Reconnecting
      </button>
    </div>

    <div v-else class="flex-1 overflow-y-auto custom-scrollbar">
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent border-none">
            <TableHead class="h-8 w-6 text-[8px] font-black uppercase text-muted-foreground/50 text-center">#</TableHead>
            <TableHead class="h-8 text-[8px] font-black uppercase text-muted-foreground/50">Club</TableHead>
            <TableHead class="h-8 text-right text-[8px] font-black uppercase text-muted-foreground/50">GD</TableHead>
            <TableHead class="h-8 text-right text-[8px] font-black uppercase text-muted-foreground/50">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow 
            v-for="teamStanding in standingsStore.getStandings" 
            :key="teamStanding.team.id"
            class="group/row hover:bg-muted/50 border-none transition-colors"
          >
            <TableCell class="py-2 text-center">
              <span class="text-[10px] font-black" :class="teamStanding.rank <= 4 ? 'text-primary' : 'text-muted-foreground/50'">
                {{ teamStanding.rank }}
              </span>
            </TableCell>
            <TableCell class="py-2">
              <div class="flex items-center gap-2">
                <img :src="teamStanding.team.logo" class="w-4 h-4 object-contain opacity-80 group-hover/row:opacity-100" />
                <span class="text-[10px] font-bold text-foreground truncate max-w-[80px]">
                  {{ teamStanding.team.name }}
                </span>
              </div>
            </TableCell>
            <TableCell class="py-2 text-right font-medium text-[9px] text-muted-foreground/60">
              {{ teamStanding.goalsDiff }}
            </TableCell>
            <TableCell class="py-2 text-right">
              <span class="text-[10px] font-black text-foreground">
                {{ teamStanding.points }}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--muted-foreground);
}
</style>
