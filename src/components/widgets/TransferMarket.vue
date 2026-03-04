<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch } from 'vue'
import { useTransfersStore } from '@/stores/transfers'
import { useLeagueStore } from '@/stores/league'

const transfersStore = useTransfersStore()
const leagueStore = useLeagueStore()

let pollingInterval: any = null

const refreshData = () => {
  transfersStore.fetchLatestTransfers(leagueStore.currentLeagueId)
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
  () => leagueStore.currentLeagueId,
  () => {
    refreshData()
  }
)

const isLoading = computed(() => transfersStore.loading)
const transfers = computed(() => transfersStore.getTransfers)
</script>

<template>
  <div class="h-full flex flex-col p-6 group/transfer relative overflow-hidden">
    <div class="flex items-center justify-between mb-6">
      <div class="flex flex-col">
        <span class="bento-tag">Market</span>
        <h2 class="bento-title uppercase">Recent Transfers</h2>
      </div>
      <div class="w-10 h-10 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center text-xl shadow-inner">
        💱
      </div>
    </div>

    <div class="flex-1 space-y-4 relative overflow-y-auto custom-scrollbar pr-2">
      <!-- Loading State -->
      <div v-if="isLoading && transfers.length === 0" class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      <template v-if="transfers.length > 0">
        <div 
          v-for="transfer in transfers" 
          :key="transfer.player.id"
          class="flex flex-col gap-2 p-3 rounded-2xl border border-border/30 bg-muted/20 hover:bg-muted/40 hover:border-border/60 transition-all duration-300 group/row"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-black text-foreground group-hover/row:text-primary transition-colors">{{ transfer.player.name }}</span>
            <span class="text-[9px] font-black opacity-30 uppercase">{{ transfer.transfers[0].date }}</span>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- From Team -->
            <div class="flex items-center gap-2 bg-background/50 px-2 py-1 rounded-lg border border-border/20">
              <img :src="transfer.transfers[0].teams.out.logo" class="w-4 h-4 object-contain opacity-60" />
              <span class="text-[9px] font-bold text-muted-foreground truncate max-w-[60px]">{{ transfer.transfers[0].teams.out.name }}</span>
            </div>
            
            <span class="text-[10px] text-primary">→</span>
            
            <!-- To Team -->
            <div class="flex items-center gap-2 bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
              <img :src="transfer.transfers[0].teams.in.logo" class="w-4 h-4 object-contain" />
              <span class="text-[9px] font-black text-primary truncate max-w-[60px]">{{ transfer.transfers[0].teams.in.name }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Empty State / Fallback -->
      <div v-else-if="!isLoading" class="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-2">
         <span class="text-3xl">🏜️</span>
         <p class="text-[10px] font-black uppercase tracking-widest">No Recent Transfers Found</p>
      </div>
    </div>

    <!-- Background Decorative Element -->
    <div class="absolute -right-12 -bottom-12 w-32 h-32 bg-primary/5 blur-[60px] rounded-full"></div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}
</style>
