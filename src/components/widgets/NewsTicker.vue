<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const news = ref([
  { id: 1, text: 'Transfer News: Arsenal signs midfielder from Real Madrid', icon: '⚡' },
  { id: 2, text: 'Injury Update: Key striker out for 3 weeks', icon: '🚑' },
  { id: 3, text: 'Breaking: Manager extends contract until 2027', icon: '📝' }
])

const currentIndex = ref(0)

const currentNewsItem = computed(() => {
  return news.value.length > 0 ? news.value[currentIndex.value] : undefined;
});

setInterval(() => {
  currentIndex.value = (currentIndex.value + 1) % news.value.length
}, 4000)
</script>

<template>
  <Card class="h-full flex flex-col bg-stadium-900 rounded-lg p-4">
    <CardHeader class="pb-3">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-electric-emerald"></div>
        <CardTitle class="text-sm font-bold uppercase tracking-wider text-slate-100">
          Latest News
        </CardTitle>
      </div>
    </CardHeader>

    <CardContent class="flex-1 flex items-center overflow-hidden py-0">
      <transition name="slide-fade" mode="out-in">
        <div v-if="currentNewsItem" :key="currentNewsItem.id" class="flex items-start gap-3">
          <span class="text-2xl flex-shrink-0">{{ currentNewsItem.icon }}</span>
          <p class="text-sm text-slate-100 line-clamp-3">{{ currentNewsItem.text }}</p>
        </div>
        <div v-else class="flex items-start gap-3">
          <p class="text-sm text-slate-100">No news available.</p>
        </div>
      </transition>
    </CardContent>

    <div class="flex gap-1 mt-3">
      <div
        v-for="(item, idx) in news"
        :key="item.id"
        class="h-1 flex-1 rounded-full transition-all duration-300"
        :class="idx === currentIndex ? 'bg-electric-emerald' : 'bg-slate-500'"
      ></div>
    </div>
  </Card>
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
