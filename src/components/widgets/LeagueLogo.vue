<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useLeagueStore } from '@/stores/league'

const leagueStore = useLeagueStore()
const hasImageError = ref(false)

onMounted(async () => {
  await leagueStore.fetchLeagueInfo()
})

const isLoading = computed(() => leagueStore.loading)
const leagueLogo = computed(() => leagueStore.getLogo)
const leagueName = computed(() => leagueStore.getName)
const countryName = computed(() => leagueStore.getCountry)
const season = computed(() => leagueStore.currentSeason)

// Reset error state when logo change
watch(leagueLogo, () => {
  hasImageError.value = false
})
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center p-8 group/league relative overflow-hidden">
    <!-- Background Gradient Glow -->
    <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover/league:opacity-100 transition-opacity duration-700"></div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-card/40 backdrop-blur-sm z-10">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center gap-6">
      <!-- Logo Container -->
      <div class="w-28 h-28 md:w-32 md:h-32 bg-white/5 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/10 shadow-2xl transition-all duration-700 group-hover/league:scale-110 group-hover/league:-rotate-3 group-hover/league:shadow-primary/20 flex items-center justify-center">
        <!-- Show Image if exists and no error, else show Emoji/Initial -->
        <img 
          v-if="leagueLogo && !hasImageError"
          :src="leagueLogo" 
          :alt="leagueName" 
          @error="hasImageError = true"
          class="w-full h-full object-contain filter drop-shadow-xl" 
        />
        <span v-else class="text-5xl group-hover/league:animate-bounce">🏆</span>
      </div>

      <div class="text-center space-y-1">
        <div class="flex items-center justify-center gap-2">
          <span class="w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/50"></span>
          <h2 class="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-foreground group-hover/league:text-primary transition-colors">
            {{ leagueName || 'League' }}
          </h2>
        </div>
        <div class="flex items-center justify-center gap-3">
          <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{{ countryName || 'Loading...' }}</span>
          <span class="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
          <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">{{ season }}</span>
        </div>
      </div>
    </div>

    <!-- Background Decorative Elements -->
    <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full group-hover/league:bg-primary/20 transition-all duration-1000"></div>
    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 blur-[80px] rounded-full group-hover/league:bg-primary/15 transition-all duration-1000"></div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.group-hover\/league\:scale-110 {
  animation: float 4s ease-in-out infinite;
}
</style>
