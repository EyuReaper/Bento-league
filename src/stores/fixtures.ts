import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiRequest } from '@/lib/api';

export const useFixturesStore = defineStore('fixtures', () => {
    const heroMatch = ref<any>(null);
    const nextMatch = ref<any>(null);
    const loading = ref(false);

    async function fetchHeroMatch(leagueId: string = '39', season: string = '2025') {
        loading.value = true;
        try {
            const data = await apiRequest<any[]>('fixtures', { league: leagueId, season: season, live: 'all' });
            heroMatch.value = data[0] || null;
        } catch (error) {
            console.error('Failed to fetch match:', error);
        } finally {
            loading.value = false;
        }
    }

    async function fetchNextMatch(leagueId: string = '39', season: string = '2025') {
        loading.value = true;
        try {
            const data = await apiRequest<any[]>('fixtures', { league: leagueId, season: season, next: '1' });
            nextMatch.value = data[0] || null;
        } catch (error) {
            console.error('Failed to fetch next match:', error);
        } finally {
            loading.value = false;
        }
    }
    
    return { heroMatch, nextMatch, loading, fetchHeroMatch, fetchNextMatch };
});
