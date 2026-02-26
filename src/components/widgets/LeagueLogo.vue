<template>
  <div class="h-full flex flex-col items-center justify-center p-4 relative group/logo cursor-pointer overflow-hidden">
    <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700"></div>
    
    <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 p-0.5 shadow-lg shadow-primary/20 group-hover/logo:scale-110 group-hover/logo:rotate-[360deg] transition-all duration-1000 ease-in-out">
      <div class="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl shadow-inner">
        🦁
      </div>
    </div>
    
    <div class="mt-3 text-center">
      <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-foreground group-hover/logo:text-primary transition-colors">Premier</h3>
      <p class="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest">League</p>
    </div>

    <!-- Shine effect -->
    <div class="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover/logo:left-[150%] transition-all duration-1000"></div>
  </div>
</template>
