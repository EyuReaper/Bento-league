<script setup lang="ts">
import { ref } from 'vue'

const injuries = ref([
  { player: 'Kevin De Bruyne', team: 'Man City', status: 'Doubtful', date: 'Mar 15', icon: '🤕' },
  { player: 'Alisson Becker', team: 'Liverpool', status: 'Out', date: 'Apr 02', icon: '🚑' },
  { player: 'Martin Ødegaard', team: 'Arsenal', status: 'Out', date: 'Mar 20', icon: '🏥' }
])
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

    <div class="flex-1 space-y-3">
      <div 
        v-for="item in injuries" 
        :key="item.player"
        class="flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors group/item"
      >
        <div class="text-2xl">{{ item.icon }}</div>
        <div class="flex-1 min-w-0">
          <div class="text-[11px] font-black uppercase tracking-tight truncate">{{ item.player }}</div>
          <div class="text-[9px] font-bold text-muted-foreground uppercase opacity-60">{{ item.team }}</div>
        </div>
        <div class="flex flex-col items-end shrink-0">
          <span 
            class="text-[8px] font-black uppercase px-2 py-0.5 rounded-full"
            :class="item.status === 'Out' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'"
          >
            {{ item.status }}
          </span>
          <span class="text-[8px] font-black text-muted-foreground/40 mt-1 uppercase">{{ item.date }}</span>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-border flex justify-center">
      <button class="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">
        Full Injury List
      </button>
    </div>
  </div>
</template>
