import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiRequest } from '@/lib/api';

export const usePlayersStore = defineStore('players', () => {
  const potw = ref<any>(null);
  const totw = ref<any[]>([]);
  const loading = ref(false);

  async function fetchTopPlayers(leagueId: string = '39', season: string = '2025') {
    loading.value = true;
    try {
      const data = await apiRequest<any[]>('players/topscorers', { league: leagueId, season: season });
      if (data.length > 0) {
        potw.value = data[0]; // Top scorer as POTW
        totw.value = data.slice(0, 11); // Top 11 as TOTW placeholder
      }
    } catch (error) {
      console.error('Failed to fetch players:', error);
    } finally {
      loading.value = false;
    }
  }

  return { potw, totw, loading, fetchTopPlayers };
});
