import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiRequest } from '@/lib/api';

export const useStandingsStore = defineStore('standings', () => {
  const standings = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchStandings(leagueId: string = '39', season: string = '2024') {
    loading.value = true;
    error.value = null;
    try {
      const data = await apiRequest<any[]>('standings', { league: leagueId, season: season });
      // API-Football returns standings inside a league object
      const leagueData: any = data[0];
      if (leagueData?.league?.standings?.[0]) {
        standings.value = leagueData.league.standings[0];
      } else {
        standings.value = [];
      }
    } catch (e: any) {
      error.value = "Live data temporarily unavailable";
      console.error('Failed to fetch standings:', e);
    } finally {
      loading.value = false;
    }
  }

  return { 
    standings, 
    loading, 
    error, 
    fetchStandings, 
    getStandings: computed(() => standings.value),
    isLoading: computed(() => loading.value),
    getError: computed(() => error.value)
  };
});
