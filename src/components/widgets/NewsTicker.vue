<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const news = ref([
  { id: 1, text: 'Arsenal finalize agreement for Real Madrid midfielder', category: 'TRANSFER', icon: '⚡' },
  { id: 2, text: 'Injury Blow: Haaland sidelined for crucial UCL clash', category: 'INJURY', icon: '🚑' },
  { id: 3, text: 'Official: Guardiola extends City stay until 2027', category: 'BREAKING', icon: '📝' },
  { id: 4, text: 'Mbappé double secures narrow win for Los Blancos', category: 'MATCH DAY', icon: '⚽' }
])

const currentIndex = ref(0)
let timer: any = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % news.value.length
}

onMounted(() => {
  timer = setInterval(next, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const currentItem = computed(() => news.value[currentIndex.value])
</script>

<template>
  <div class="h-full flex flex-col p-5 relative overflow-hidden group/ticker">
    <!-- Background Glow -->
    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full group-hover/ticker:bg-primary/15 transition-colors duration-700"></div>

    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">News Feed</h3>
      </div>
      <div class="flex gap-1">
        <button 
          v-for="(_, idx) in news" 
          :key="idx"
          @click="currentIndex = idx"
          class="h-1 rounded-full transition-all duration-500 ease-out"
          :class="idx === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40'"
        ></button>
      </div>
    </div>

    <div class="flex-1 relative">
      <transition name="slide-up" mode="out-in">
        <div :key="currentIndex" class="flex flex-col gap-3">
          <div class="inline-flex">
            <span class="text-[9px] font-black px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 tracking-wider">
              {{ currentItem.category }}
            </span>
          </div>
          <div class="flex items-start gap-4">
            <span class="text-3xl filter drop-shadow-sm group-hover/ticker:scale-110 transition-transform duration-500">
              {{ currentItem.icon }}
            </span>
            <p class="text-lg font-bold leading-tight tracking-tight text-foreground/90 group-hover/ticker:text-foreground transition-colors">
              {{ currentItem.text }}
            </p>
          </div>
        </div>
      </transition>
    </div>

    <div class="mt-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground/60">
      <span class="uppercase tracking-widest">Source: Sky Sports</span>
      <span class="tabular-nums">{{ currentIndex + 1 }} / {{ news.length }}</span>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
