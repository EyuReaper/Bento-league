import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiRequest } from '@/lib/api';

export const useInjuriesStore = defineStore('injuries', () => {
  const injuries = ref<any[]>([]);
  const loading = ref(false);

  async function fetchInjuries(leagueId: string = '39', season: string = '2025') {
    loading.value = true;
    try {
      const data = await apiRequest<any[]>('injuries', { league: leagueId, season: season });
      injuries.value = data.slice(0, 5);
    } catch (error) {
      console.error('Failed to fetch injuries:', error);
    } finally {
      loading.value = false;
    }
  }

  return { injuries, loading, fetchInjuries };
});
