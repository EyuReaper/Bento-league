import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiRequest } from '@/lib/api';

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export const useLeagueStore = defineStore('league', () => {
  const currentLeagueId = ref('39'); // Default: Premier League
  const currentSeason = ref('2025');
  const leagueInfo = ref<League | null>(null);
  const countryInfo = ref<Country | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchLeagueInfo() {
    loading.value = true;
    error.value = null;
    try {
      const data = await apiRequest<any[]>('leagues', { id: currentLeagueId.value });
      if (data && data.length > 0) {
        leagueInfo.value = data[0].league;
        countryInfo.value = data[0].country;
      } else {
        error.value = 'League information not found';
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch league info';
      console.error('Failed to fetch league info:', err);
    } finally {
      loading.value = false;
    }
  }

  return { 
    currentLeagueId, 
    currentSeason,
    leagueInfo,
    countryInfo,
    loading,
    error,
    fetchLeagueInfo,
    getLogo: computed(() => leagueInfo.value?.logo || ''),
    getName: computed(() => leagueInfo.value?.name || ''),
    getCountry: computed(() => countryInfo.value?.name || ''),
    getError: computed(() => error.value)
  };
});
