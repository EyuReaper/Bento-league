<script setup lang="ts">
import { ref } from 'vue'

const nextMatch = ref({
  opponent: 'Real Madrid',
  logo: '⚪',
  competition: 'Champions League',
  date: 'TOMORROW',
  time: '20:00',
  venue: 'Santiago Bernabéu'
})
</script>

<template>
  <div class="h-full flex flex-col p-4 relative group/next overflow-hidden">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Next Match</h3>
      <span class="text-[9px] font-black text-muted-foreground/60 tabular-nums">IN 24H 12M</span>
    </div>

    <div class="flex-1 flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-2xl shadow-sm border border-border/50 group-hover/next:scale-110 group-hover/next:rotate-3 transition-transform duration-500">
        {{ nextMatch.logo }}
      </div>
      <div class="flex-1 min-w-0">
        <h2 class="text-sm font-black uppercase truncate tracking-tight text-foreground group-hover/next:text-primary transition-colors">
          vs {{ nextMatch.opponent }}
        </h2>
        <p class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{{ nextMatch.competition }}</p>
      </div>
    </div>

    <div class="mt-4 flex items-end justify-between">
      <div class="flex flex-col">
        <span class="text-[14px] font-black tabular-nums tracking-tighter text-foreground">{{ nextMatch.time }}</span>
        <span class="text-[8px] font-black text-muted-foreground/50 uppercase tracking-widest">{{ nextMatch.date }}</span>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-[8px] font-black text-foreground/80 uppercase tracking-tight text-right line-clamp-1 max-w-[80px]">{{ nextMatch.venue }}</span>
        <span class="text-[7px] font-bold text-muted-foreground/40 uppercase tracking-widest">Away</span>
      </div>
    </div>

    <!-- Background Glow -->
    <div class="absolute top-0 right-0 w-20 h-20 bg-primary/5 blur-2xl rounded-full -mr-10 -mt-10 group-hover/next:bg-primary/10 transition-colors"></div>
  </div>
</template>
