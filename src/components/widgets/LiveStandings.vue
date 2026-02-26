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

const standingsStore = useStandingsStore()

onMounted(() => {
  standingsStore.fetchStandings()
})
</script>

<template>
  <div class="h-full flex flex-col p-5 group/standings">
    <div class="bento-header justify-between flex-row items-center mb-4">
      <div class="flex flex-col">
        <span class="bento-tag">League</span>
        <h2 class="bento-title uppercase">Live Standings</h2>
      </div>
      <div class="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center border border-border">
        <span class="text-xs">📊</span>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto custom-scrollbar">
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
