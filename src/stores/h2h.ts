import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiRequest } from '@/lib/api';

export const useH2HStore = defineStore('h2h', () => {
  const h2h = ref<any[]>([]);
  const loading = ref(false);

  async function fetchH2H(team1Id: number, team2Id: number) {
    loading.value = true;
    try {
      const data = await apiRequest<any[]>('fixtures/headtohead', { h2h: `${team1Id}-${team2Id}` });
      h2h.value = data;
    } catch (error) {
      console.error('Failed to fetch H2H:', error);
    } finally {
      loading.value = false;
    }
  }

  return { h2h, loading, fetchH2H };
});
