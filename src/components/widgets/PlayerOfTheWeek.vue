<script setup lang="ts">
import { ref } from 'vue'

const player = ref({
  name: 'Erling Haaland',
  short: 'Haaland',
  team: 'Man City',
  image: 'https://github.com/radix-vue.png', 
  stats: [
    { label: 'Goals', value: '32' },
    { label: 'Assists', value: '8' },
    { label: 'Rating', value: '8.4' }
  ]
})
</script>

<template>
  <div class="h-full flex flex-col p-8 group/potw">
    <div class="flex flex-col mb-10">
      <span class="bento-tag">Featured</span>
      <h2 class="bento-title uppercase italic">Player of the Week</h2>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center relative my-4">
      <div class="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-40 group-hover/potw:opacity-60 transition-all"></div>
      <div class="relative w-36 h-36 rounded-[2.5rem] overflow-hidden border-2 border-border bg-muted flex items-center justify-center text-6xl shadow-2xl group-hover/potw:scale-110 group-hover/potw:rotate-3 transition-all duration-700">
        <img v-if="player.image" :src="player.image" :alt="player.name" class="w-full h-full object-cover" />
        <span v-else>🧔‍♂️</span>
      </div>
      <div class="absolute -bottom-4 px-5 py-2 bg-foreground text-background rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
        ELITE ST
      </div>
    </div>

    <div class="text-center space-y-2 mb-10 mt-6">
      <h3 class="text-4xl font-black italic uppercase tracking-tighter leading-none">{{ player.name }}</h3>
      <p class="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-60">{{ player.team }}</p>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div v-for="stat in player.stats" :key="stat.label" class="flex flex-col items-center p-4 rounded-3xl bg-muted border border-border group-hover/potw:bg-primary group-hover/potw:text-white group-hover/potw:border-primary transition-all duration-500 shadow-sm">
        <span class="text-2xl font-black tracking-tighter tabular-nums">{{ stat.value }}</span>
        <span class="text-[8px] font-black uppercase tracking-widest opacity-60">{{ stat.label }}</span>
      </div>
    </div>
  </div>
</template>
