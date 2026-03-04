<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useInjuriesStore } from '@/stores/injuries'
import { useLeagueStore } from '@/stores/league'

const injuriesStore = useInjuriesStore()
const leagueStore = useLeagueStore()

let pollingInterval: any = null

const refreshData = () => {
  injuriesStore.fetchInjuries(leagueStore.currentLeagueId, leagueStore.currentSeason)
}

onMounted(() => {
  refreshData()
  // Poll every 10 minutes
  pollingInterval = setInterval(refreshData, 600000)
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
</script>

<template>
  <div class="h-full flex flex-col p-6 group/injury">
    <div class="bento-header justify-between flex-row items-center mb-6">
      <div class="flex flex-col">
        <span class="bento-tag">Medical Room</span>
        <h2 class="bento-title uppercase italic">Injury Report</h2>
      </div>
      <div class="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center border border-border">
        <span class="text-xs">🩹</span>
      </div>
    </div>

    <div class="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
      <div 
        v-for="item in injuriesStore.injuries" 
        :key="item.player.id"
        class="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors group/item"
      >
        <div class="text-2xl">{{ item.type === 'Missing Fixture' ? '🚑' : '🏥' }}</div>
        <div class="flex-1 min-w-0">
          <div class="text-[11px] font-black uppercase tracking-tight truncate">{{ item.player.name }}</div>
          <div class="text-[9px] font-bold text-muted-foreground uppercase opacity-60">{{ item.team.name }}</div>
        </div>
        <div class="flex flex-col items-end shrink-0">
          <span 
            class="text-[8px] font-black uppercase px-2 py-0.5 rounded-full"
            :class="item.type === 'Missing Fixture' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'"
          >
            {{ item.type }}
          </span>
          <span class="text-[8px] font-black text-muted-foreground/40 mt-1 uppercase truncate max-w-[60px]">{{ item.reason }}</span>
        </div>
      </div>
      
      <div v-if="injuriesStore.injuries.length === 0" class="flex-1 flex items-center justify-center py-8">
         <p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">No records found</p>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-border flex justify-center">
      <button class="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">
        Full Injury List
      </button>
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
</style>
