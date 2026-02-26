<script setup lang="ts">
import { ref } from 'vue'

const seasonProgress = ref(65)
const form = ref(['W', 'W', 'D', 'W', 'L', 'W', 'W'])
const stats = ref([
  { label: 'Win Rate', value: '72%' },
  { label: 'Clean Sheets', value: '12' },
  { label: 'Avg Goals', value: '2.4' }
])
</script>

<template>
  <div class="h-full flex flex-col p-5 relative group/season overflow-hidden">
    <div class="flex items-center justify-between mb-6">
      <div class="flex flex-col">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Campaign</h3>
        <h2 class="text-xs font-bold text-foreground">Season Progress</h2>
      </div>
      <div class="text-[10px] font-black text-primary tabular-nums bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
        {{ seasonProgress }}% COMPLETE
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="relative h-3 w-full bg-muted/50 rounded-full mb-8 overflow-hidden shadow-inner">
      <div 
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
        :style="{ width: `${seasonProgress}%` }"
      >
        <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[pulse_3s_linear_infinite]"></div>
      </div>
    </div>

    <!-- Form Guide -->
    <div class="flex-1 flex flex-col justify-center">
      <div class="flex items-center justify-between mb-4">
        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recent Form</span>
        <div class="flex gap-1.5">
          <div 
            v-for="(res, i) in form" 
            :key="i"
            class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-all duration-300 hover:scale-110 cursor-default"
            :class="{
              'bg-primary text-primary-foreground shadow-lg shadow-primary/20': res === 'W',
              'bg-muted-foreground/20 text-muted-foreground': res === 'D',
              'bg-red-500 text-white shadow-lg shadow-red-500/20': res === 'L'
            }"
          >
            {{ res }}
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col">
          <span class="text-sm font-black text-foreground">{{ stat.value }}</span>
          <span class="text-[8px] font-black uppercase tracking-tighter text-muted-foreground truncate">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Decoration -->
    <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none group-hover/season:bg-primary/10 transition-colors"></div>
  </div>
</template>
