<script setup lang="ts">
import { ref } from 'vue'

const sponsors = ref(['NIKE', 'ADIDAS', 'PUMA', 'ROLEX', 'EMIRATES', 'BARCLAYS', 'EA SPORTS'])
</script>

<template>
  <div class="h-full flex items-center justify-between px-8 py-2 relative group/sponsor overflow-hidden">
    <!-- Overlay Glow -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover/sponsor:opacity-100 transition-opacity duration-1000"></div>

    <div class="flex flex-col relative z-10 shrink-0">
      <h3 class="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/40">Official Partners</h3>
      <h2 class="text-[11px] font-black text-foreground italic group-hover/sponsor:text-primary transition-colors tracking-tighter">BENTO LEAGUE</h2>
    </div>

    <div class="flex-1 flex justify-around items-center px-12 relative z-10 opacity-30 group-hover/sponsor:opacity-100 transition-opacity duration-700">
      <div 
        v-for="brand in sponsors" 
        :key="brand"
        class="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-all hover:scale-110 cursor-default"
      >
        {{ brand }}
      </div>
    </div>

    <div class="shrink-0 flex items-center gap-3 relative z-10">
      <div class="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm shadow-inner group-hover/sponsor:scale-110 transition-transform">
        💎
      </div>
      <div class="flex flex-col items-end">
        <span class="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">Elite Tier</span>
        <span class="text-[10px] font-black text-foreground uppercase tracking-tighter">Sponsor Hub</span>
      </div>
    </div>
  </div>
</template>
