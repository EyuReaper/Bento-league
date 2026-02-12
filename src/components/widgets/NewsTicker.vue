<script setup lang="ts">
import { ref } from 'vue'

const news = ref([
  { id: 1, text: 'Transfer News: Arsenal signs midfielder from Real Madrid', icon: '⚡' },
  { id: 2, text: 'Injury Update: Key striker out for 3 weeks', icon: '🚑' },
  { id: 3, text: 'Breaking: Manager extends contract until 2027', icon: '📝' }
])

const currentIndex = ref(0)

setInterval(() => {
  currentIndex.value = (currentIndex.value + 1) % news.value.length
}, 4000)
</script>

<template>
  <div class="bento-card h-full flex flex-col bg-stadium-900 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-3">
      <div class="w-2 h-2 rounded-full bg-electric-emerald"></div>
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-100">Latest News</h3>
    </div>

    <div class="flex-1 flex items-center overflow-hidden">
      <transition name="slide-fade" mode="out-in">
        <div :key="news[currentIndex].id" class="flex items-start gap-3">
          <span class="text-2xl flex-shrink-0">{{ news[currentIndex].icon }}</span>
          <p class="text-sm text-slate-100 line-clamp-3">{{ news[currentIndex].text }}</p>
        </div>
      </transition>
    </div>

    <div class="flex gap-1 mt-3">
      <div
        v-for="(item, idx) in news"
        :key="item.id"
        class="h-1 flex-1 rounded-full transition-all duration-300"
        :class="idx === currentIndex ? 'bg-electric-emerald' : 'bg-slate-500'"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
