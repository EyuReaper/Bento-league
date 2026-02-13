<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const player = {
  name: 'Erling Haaland',
  team: 'Manchester City',
  image: 'https://github.com/radix-vue.png' // Placeholder image
}
</script>

<template>
  <Card class="h-full flex flex-col items-center justify-center bg-stadium-900 rounded-lg p-4 text-white">
    <CardHeader class="flex flex-col items-center text-center">
      <Avatar class="h-24 w-24 mb-4">
        <AvatarImage :src="player.image" :alt="player.name" />
      </Avatar>
      <CardTitle class="font-bold text-lg">{{ player.name }}</CardTitle>
      <CardDescription class="text-sm">{{ player.team }}</CardDescription>
    </CardHeader>
    <CardContent class="text-center">
      <Button class="mt-4">View Profile</Button>
    </CardContent>
  </Card>
</template>
