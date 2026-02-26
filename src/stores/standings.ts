import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStandingsStore = defineStore('standings', () => {
  const standings = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY || 'YOUR_API_KEY_HERE'; // Replace with your actual API key
  const API_URL = import.meta.env.VITE_API_FOOTBALL_URL || 'YOUR_API_ENDPOINT_HERE'; // Replace with your API endpoint

  async function fetchStandings(leagueId: string = '39', season: string = '2023') { // Default to Premier League 2023 for example
    loading.value = true;
    error.value = null;
    try {
      // In a real application, you'd construct the URL with leagueId and season
      // For now, using a placeholder. Example: `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`
      const response = await fetch(`${API_URL}/standings?league=${leagueId}&season=${season}`, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io' // Adjust host if using a different API
        }
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.response && data.response.length > 0) {
        standings.value = data.response[0].league.standings[0];
      } else {
        standings.value = [];
      }
    } catch (e: any) {
      error.value = e.message;
      console.error('Failed to fetch standings:', e);
    } finally {
      loading.value = false;
    }
  }

  const getStandings = computed(() => standings.value);
  const isLoading = computed(() => loading.value);
  const getError = computed(() => error.value);

  return { standings, loading, error, fetchStandings, getStandings, isLoading, getError };
});
