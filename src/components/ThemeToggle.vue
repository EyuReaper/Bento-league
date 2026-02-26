<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'

const themeStore = useThemeStore()

const isDarkMode = computed(() => themeStore.theme === 'dark')

function toggle() {
  themeStore.toggleTheme()
}
</script>

<template>
  <button 
    @click="toggle" 
    class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/60 hover:border-primary/30 transition-all duration-300 group overflow-hidden"
    aria-label="Toggle Theme"
  >
    <div class="relative z-10 transition-transform duration-500 group-hover:scale-110">
      <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    </div>
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </button>
</template>
