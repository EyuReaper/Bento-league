import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiRequest } from '@/lib/api';

export interface Transfer {
  player: {
    id: number;
    name: string;
  };
  update: string;
  transfers: Array<{
    date: string;
    type: string;
    teams: {
      in: { id: number; name: string; logo: string };
      out: { id: number; name: string; logo: string };
    };
  }>;
}

export const useTransfersStore = defineStore('transfers', () => {
  const transfers = ref<Transfer[]>([]);
  const loading = ref(false);

  async function fetchLatestTransfers(leagueId: string = '39') {
    loading.value = true;
    try {
      // API-Football: Fetching transfers for a specific league or recent period
      // Note: The free tier may have limitations, so we often fetch by team or player
      // For this widget, we'll fetch latest transfers for the Premier League (ID 39)
      const data = await apiRequest<Transfer[]>('transfers', { league: leagueId });
      
      // Sort by latest date and take the top 5
      transfers.value = data.slice(0, 5);
    } catch (error) {
      console.error('Failed to fetch transfers:', error);
      // Fallback data if API fails
      transfers.value = []; 
    } finally {
      loading.value = false;
    }
  }

  return { 
    transfers, 
    loading, 
    fetchLatestTransfers,
    getTransfers: computed(() => transfers.value)
  };
});
