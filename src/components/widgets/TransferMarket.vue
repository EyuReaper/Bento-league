<script setup lang="ts">
import { ref } from 'vue'

const transfers = ref([
  { id: 1, name: 'Kylian Mbappé', from: 'PSG', to: 'Real Madrid', price: 'Free', date: '2h ago', image: 'https://github.com/radix-vue.png' },
  { id: 2, name: 'Julian Alvarez', from: 'Man City', to: 'Atletico', price: '£75M', date: '5h ago', image: 'https://github.com/radix-vue.png' },
  { id: 3, name: 'Riccardo Calafiori', from: 'Bologna', to: 'Arsenal', price: '£42M', date: 'Yesterday', image: 'https://github.com/radix-vue.png' },
  { id: 4, name: 'Dominic Solanke', from: 'Bournemouth', to: 'Spurs', price: '£65M', date: '1d ago', image: 'https://github.com/radix-vue.png' },
  { id: 5, name: 'Dani Olmo', from: 'RB Leipzig', to: 'Barcelona', price: '£55M', date: '2d ago', image: 'https://github.com/radix-vue.png' }
])
</script>

<template>
  <div class="h-full flex flex-col p-5 relative group/transfer">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex flex-col">
        <h3 class="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">Live Updates</h3>
        <h2 class="text-xs font-bold text-foreground">Transfer Market</h2>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 tracking-tighter italic shadow-sm">Hot Deals</span>
      </div>
    </div>

    <!-- Transfer List -->
    <div class="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
      <div 
        v-for="deal in transfers" 
        :key="deal.id"
        class="group/row flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border/40 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300"
      >
        <div class="relative w-10 h-10 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
          <img :src="deal.image" :alt="deal.name" class="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-500" />
        </div>

        <div class="flex-1 min-w-0 flex flex-col gap-0.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-black truncate text-foreground group-hover/row:text-primary transition-colors uppercase tracking-tight">{{ deal.name }}</span>
            <span class="text-[10px] font-black text-primary tabular-nums">{{ deal.price }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-bold text-muted-foreground uppercase">{{ deal.from }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary/60"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span class="text-[9px] font-bold text-foreground uppercase tracking-wider">{{ deal.to }}</span>
          </div>
        </div>

        <div class="text-[8px] font-black text-muted-foreground/50 group-hover/row:text-muted-foreground transition-colors hidden md:block">
          {{ deal.date }}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 pt-4 border-t border-border/50">
      <button class="w-full h-10 rounded-xl bg-muted/40 hover:bg-muted/60 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2">
        More Transfers
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--muted-foreground);
}
</style>
