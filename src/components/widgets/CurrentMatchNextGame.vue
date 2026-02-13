<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <Card class="h-full flex flex-col justify-between bg-stadium-900 rounded-lg p-4 text-white">
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between">
        <CardTitle class="text-sm font-bold uppercase tracking-wider text-slate-100">
          Live
        </CardTitle>
        <span class="text-xs text-electric-emerald">67'</span>
      </div>
    </CardHeader>

    <CardContent class="flex-1 flex items-center justify-center p-0">
      <div class="flex flex-col items-center text-center">
        <div class="flex items-center space-x-4">
          <div class="flex flex-col items-center gap-1">
            <span class="text-3xl">🔵</span>
            <span class="text-sm font-medium text-white-100">Manchester City</span>
          </div>
          <div class="text-2xl font-bold text-white-100">
            2 - 2
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-3xl">🔴</span>
            <span class="text-sm font-medium text-white-100">Liverpool</span>
          </div>
        </div>
        <p class="text-xs text-slate-400 mt-2">Premier League - Etihad Stadium</p>
      </div>
    </CardContent>
  </Card>
</template>
