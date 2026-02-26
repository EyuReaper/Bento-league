<script setup lang="ts">
import { ref } from 'vue'

const isPlaying = ref(true)
const station = ref('Bento Sports FM')
const show = ref('The Mid-Week Review')
</script>

<template>
  <div class="h-full flex flex-col p-4 relative group/radio overflow-hidden">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Live Broadcast</h3>
      <div v-if="isPlaying" class="flex gap-0.5 items-end h-3">
        <div class="w-0.5 bg-primary animate-[bounce_1s_infinite_0s]"></div>
        <div class="w-0.5 bg-primary animate-[bounce_1s_infinite_0.2s]"></div>
        <div class="w-0.5 bg-primary animate-[bounce_1s_infinite_0.4s]"></div>
        <div class="w-0.5 bg-primary animate-[bounce_1s_infinite_0.1s]"></div>
      </div>
    </div>

    <div class="flex-1 flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover/radio:scale-110 transition-transform duration-500">
        <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
      </div>
      <div class="flex-1 min-w-0">
        <h2 class="text-[11px] font-black uppercase truncate tracking-tight text-foreground group-hover/radio:text-primary transition-colors">
          {{ station }}
        </h2>
        <p class="text-[9px] font-bold text-muted-foreground/60 uppercase truncate tracking-widest">{{ show }}</p>
      </div>
    </div>

    <div class="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% { height: 4px; }
  50% { height: 12px; }
}
</style>
