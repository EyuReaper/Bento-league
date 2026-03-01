<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNewsStore } from '@/stores/news'

const newsStore = useNewsStore()
const currentIndex = ref(0)
let timer: any = null

const next = () => {
  if (newsStore.news.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % newsStore.news.length
  }
}

onMounted(async () => {
  await newsStore.fetchNews()
  timer = setInterval(next, 8000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const currentItem = computed(() => newsStore.news[currentIndex.value] || null)
</script>

<template>
  <div class="relative flex flex-col h-full p-5 overflow-hidden group/ticker">
    <!-- Background Glow -->
    <div class="absolute w-40 h-40 transition-colors duration-700 rounded-full -bottom-10 -left-10 bg-primary/5 blur-3xl group-hover/ticker:bg-primary/15"></div>

    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">News Feed</h3>
      </div>
      <div class="flex gap-1" v-if="newsStore.news.length">
        <button 
          v-for="(_, idx) in newsStore.news" 
          :key="idx"
          @click="currentIndex = idx"
          class="h-1 transition-all duration-500 ease-out rounded-full"
          :class="idx === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40'"
        ></button>
      </div>
    </div>

    <div class="relative flex-1 min-h-0">
      <div v-if="newsStore.loading && !currentItem" class="absolute inset-0 flex items-center justify-center">
         <div class="w-6 h-6 border-2 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>

      <transition name="slide-up" mode="out-in">
        <div :key="currentIndex" v-if="currentItem" class="flex flex-col gap-3">
          <div class="inline-flex">
            <span class="text-[9px] font-black px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 tracking-wider truncate max-w-full">
              {{ currentItem.category }}
            </span>
          </div>
          <div class="flex items-start gap-5">
            <div class="relative flex-shrink-0 overflow-hidden transition-all duration-700 border-2 shadow-xl w-30 h-30 rounded-2xl border-border/50 group-hover/ticker:scale-105">
              <!-- Overlay Glow for Thumbnail -->
              <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              <img 
                v-if="currentItem.image" 
                :src="currentItem.image" 
                class="object-cover w-full h-full" 
                loading="lazy" 
              />
              <div v-else class="flex items-center justify-center w-full h-full text-4xl bg-muted">
                {{ currentItem.icon }}
              </div>
            </div>
            <div class="flex flex-col flex-1 gap-2">
              <p class="text-xl font-bold leading-tight tracking-tight transition-colors text-foreground/90 group-hover/ticker:text-foreground line-clamp-3">
                {{ currentItem.text }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="mt-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground/60" v-if="currentItem">
      <span class="uppercase tracking-widest truncate max-w-[150px]">Source: {{ currentItem.source }}</span>
      <span class="tabular-nums">{{ currentIndex + 1 }} / {{ newsStore.news.length }}</span>
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 768px) {
  .line-clamp-3 {
    -webkit-line-clamp: 3;
  }
}
</style>
