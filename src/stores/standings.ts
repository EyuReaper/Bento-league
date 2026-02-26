import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStandingsStore = defineStore('standings', () => {
  const standings = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY; 
  const API_URL = import.meta.env.VITE_API_FOOTBALL_URL; 

  async function fetchStandings(leagueId: string = '39', season: string = '2025') {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/standings?league=${leagueId}&season=${season}`, {
        headers: {
          'x-apisports-key': API_KEY,
        }
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.response?.[0]?.league?.standings?.[0]) {
        standings.value = data.response[0].league.standings[0];
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
